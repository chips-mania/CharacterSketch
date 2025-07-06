// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface BatchExtractRequest {
  imageId: string;
  userId?: string;
}

interface Comment {
  id: string;
  content: string;
  author: string;
  created_at: string;
  image_id: string;
}

interface BatchExtractResponse {
  success: boolean;
  message: string;
  processedComments: number;
  error?: string;
}

async function getCommentsForImage(imageId: string): Promise<Comment[]> {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase environment variables not found')
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/comments?image_id=eq.${imageId}&order=created_at.asc`, {
    headers: {
      'Authorization': `Bearer ${supabaseServiceKey}`,
      'apikey': supabaseServiceKey,
    }
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch comments: ${response.status}`)
  }

  return await response.json()
}

async function extractKeywordsFromBatch(comments: Comment[]): Promise<any> {
  const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
  
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not found')
  }

  // 모든 댓글 내용을 하나로 합치기
  const allCommentsText = comments.map(comment => comment.content).join('\n\n')

  const systemPrompt = `
당신은 웹소설 캐릭터의 AI 이미지 생성을 위한 키워드 추출 전문가입니다.
여러 댓글을 분석하여 다음 카테고리별로 키워드를 추출해주세요:

1. appearance: 외모 관련 (얼굴, 체형, 헤어스타일, 눈, 코, 입 등)
2. personality: 성격/표정 관련 (차분한, 화난, 웃는, 진지한 등)
3. clothing: 의상/복장 관련 (옷, 신발, 모자 등)
4. accessories: 액세서리/소품 (안경, 반지, 목걸이, 지팡이 등)
5. background: 배경/환경 (숲, 도시, 방, 하늘 등)
6. style: 전체적인 스타일/분위기 (고전적, 현대적, 판타지, 미래적 등)

JSON 형태로 반환해주세요. 각 카테고리는 문자열 배열로 구성해주세요.
예시: {"appearance": ["긴 검은 머리", "푸른 눈"], "personality": ["차분한"], ...}
`;

  const userPrompt = `
다음 댓글들을 분석하여 캐릭터 이미지 생성 키워드를 추출해주세요:
"${allCommentsText}"
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 800
      })
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices[0].message.content
    
    return JSON.parse(content)
  } catch (error) {
    throw new Error(`OpenAI API error: ${error.message}`)
  }
}

async function saveBatchKeywordsToDatabase(
  imageId: string, 
  commentIds: string[], 
  keywords: any, 
  confidence: number, 
  userId?: string
) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase environment variables not found')
  }

  // 각 댓글 ID에 대해 키워드 저장
  const promises = commentIds.map(commentId => 
    fetch(`${supabaseUrl}/rest/v1/extracted_keywords`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Content-Type': 'application/json',
        'apikey': supabaseServiceKey,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        image_id: imageId,
        comment_id: commentId,
        keywords: keywords,
        confidence: confidence,
        user_id: userId
      })
    })
  )

  const responses = await Promise.all(promises)
  
  for (const response of responses) {
    if (!response.ok) {
      throw new Error(`Failed to save batch keywords: ${response.status}`)
    }
  }
}

Deno.serve(async (req) => {
  // CORS 처리
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { imageId, userId }: BatchExtractRequest = await req.json()
    
    if (!imageId) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'imageId is required' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    // 해당 이미지의 댓글들 가져오기
    const comments = await getCommentsForImage(imageId)
    
    // 댓글이 5개 미만이면 처리하지 않음
    if (comments.length < 5) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: `Not enough comments. Need at least 5, but got ${comments.length}`,
          processedComments: 0
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    // 5개씩 배치로 처리
    const batchSize = 5
    const batches = []
    
    for (let i = 0; i < comments.length; i += batchSize) {
      batches.push(comments.slice(i, i + batchSize))
    }

    let totalProcessed = 0

    for (const batch of batches) {
      try {
        // 배치 키워드 추출
        const keywords = await extractKeywordsFromBatch(batch)
        
        // 키워드 저장
        const commentIds = batch.map(comment => comment.id)
        await saveBatchKeywordsToDatabase(imageId, commentIds, keywords, 0.8, userId)
        
        totalProcessed += batch.length
      } catch (error) {
        console.error(`Failed to process batch: ${error.message}`)
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully processed ${totalProcessed} comments in batches`,
        processedComments: totalProcessed
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        processedComments: 0
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/batch-extract-keywords' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
