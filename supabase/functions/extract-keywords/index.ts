// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ExtractKeywordsRequest {
  commentText: string;
  imageId: string;
  commentId: string;
  userId?: string;
}

interface ExtractKeywordsResponse {
  success: boolean;
  keywords: {
    appearance: string[];
    personality: string[];
    clothing: string[];
    accessories: string[];
    background: string[];
    style: string[];
  };
  confidence: number;
  error?: string;
}

async function extractKeywordsFromComment(commentText: string): Promise<ExtractKeywordsResponse> {
  const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
  
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not found')
  }

  const systemPrompt = `
당신은 웹소설 캐릭터의 AI 이미지 생성을 위한 키워드 추출 전문가입니다.
댓글 내용을 분석하여 다음 카테고리별로 키워드를 추출해주세요:

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
다음 댓글에서 캐릭터 이미지 생성 키워드를 추출해주세요:
"${commentText}"
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
        max_tokens: 500
      })
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices[0].message.content
    
    // JSON 파싱
    const keywords = JSON.parse(content)
    
    return {
      success: true,
      keywords: {
        appearance: keywords.appearance || [],
        personality: keywords.personality || [],
        clothing: keywords.clothing || [],
        accessories: keywords.accessories || [],
        background: keywords.background || [],
        style: keywords.style || []
      },
      confidence: 0.8
    }
  } catch (error) {
    // Deno 환경에서는 console.error 대신 다른 방식 사용
    return {
      success: false,
      keywords: {
        appearance: [],
        personality: [],
        clothing: [],
        accessories: [],
        background: [],
        style: []
      },
      confidence: 0,
      error: error.message
    }
  }
}

async function saveKeywordsToDatabase(
  imageId: string, 
  commentId: string, 
  keywords: any, 
  confidence: number, 
  userId?: string
) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase environment variables not found')
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/extracted_keywords`, {
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

  if (!response.ok) {
    throw new Error(`Failed to save keywords: ${response.status}`)
  }
}

Deno.serve(async (req) => {
  // CORS 처리
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { commentText, imageId, commentId, userId }: ExtractKeywordsRequest = await req.json()
    
    if (!commentText || !imageId || !commentId) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'commentText, imageId, and commentId are required' 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

    // 키워드 추출
    const result = await extractKeywordsFromComment(commentText)
    
    // 키워드를 Supabase에 저장
    if (result.success) {
      await saveKeywordsToDatabase(imageId, commentId, result.keywords, result.confidence, userId)
    }
    
    return new Response(
      JSON.stringify({ success: true, message: 'Keywords extracted and saved successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )
  } catch (error) {
    // Deno 환경에서는 console.error 대신 다른 방식 사용
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
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

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/extract-keywords' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
