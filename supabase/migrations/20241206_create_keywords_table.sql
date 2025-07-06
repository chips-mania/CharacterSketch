-- 키워드 저장 테이블 생성
CREATE TABLE IF NOT EXISTS extracted_keywords (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_id TEXT NOT NULL,
  comment_id TEXT NOT NULL,
  keywords JSONB NOT NULL,
  confidence FLOAT DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id)
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_extracted_keywords_image_id ON extracted_keywords(image_id);
CREATE INDEX IF NOT EXISTS idx_extracted_keywords_comment_id ON extracted_keywords(comment_id);
CREATE INDEX IF NOT EXISTS idx_extracted_keywords_created_at ON extracted_keywords(created_at);

-- RLS (Row Level Security) 설정
ALTER TABLE extracted_keywords ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽기/쓰기 가능하도록 정책 설정
CREATE POLICY "Allow all operations on extracted_keywords" ON extracted_keywords
  FOR ALL USING (true) WITH CHECK (true); 