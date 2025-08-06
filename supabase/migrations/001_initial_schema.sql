/*
# Schema Inicial - Sistema de Gerenciamento Cultural Pluggar

1. Tabelas Criadas
  - `sections` - Seções culturais organizacionais (8 seções)
  - `culture_items` - Itens específicos de cultura (48 itens)
  - `meetings` - Reuniões de avaliação cultural
  - `meeting_evaluations` - Avaliações dos itens por reunião

2. Segurança
  - RLS habilitado em todas as tabelas
  - Políticas para usuários autenticados
  - Isolamento de dados por usuário

3. Funcionalidades
  - Sistema completo de checklist cultural
  - Persistência de avaliações
  - Cálculo automático de score
  - Campo de observações
*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create sections table
CREATE TABLE IF NOT EXISTS sections (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  icon TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create culture_items table
CREATE TABLE IF NOT EXISTS culture_items (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  section_id BIGINT NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create meetings table
CREATE TABLE IF NOT EXISTS meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  cultural_score INTEGER DEFAULT 0,
  observations TEXT DEFAULT '',
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create meeting_evaluations table
CREATE TABLE IF NOT EXISTS meeting_evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id UUID NOT NULL REFERENCES meetings(id) ON DELETE CASCADE,
  culture_item_id BIGINT NOT NULL REFERENCES culture_items(id) ON DELETE CASCADE,
  is_implemented BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(meeting_id, culture_item_id)
);

-- Enable RLS on all tables
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE culture_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_evaluations ENABLE ROW LEVEL SECURITY;

-- Policies for sections (public read)
CREATE POLICY "Sections are viewable by everyone"
  ON sections
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for culture_items (public read)
CREATE POLICY "Culture items are viewable by everyone"
  ON culture_items
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for meetings (user-specific)
CREATE POLICY "Users can view own meetings"
  ON meetings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own meetings"
  ON meetings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own meetings"
  ON meetings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own meetings"
  ON meetings
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for meeting_evaluations (user-specific through meetings)
CREATE POLICY "Users can view own meeting evaluations"
  ON meeting_evaluations
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM meetings 
      WHERE meetings.id = meeting_evaluations.meeting_id 
      AND meetings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own meeting evaluations"
  ON meeting_evaluations
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM meetings 
      WHERE meetings.id = meeting_evaluations.meeting_id 
      AND meetings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own meeting evaluations"
  ON meeting_evaluations
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM meetings 
      WHERE meetings.id = meeting_evaluations.meeting_id 
      AND meetings.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own meeting evaluations"
  ON meeting_evaluations
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM meetings 
      WHERE meetings.id = meeting_evaluations.meeting_id 
      AND meetings.user_id = auth.uid()
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_culture_items_section_id ON culture_items(section_id);
CREATE INDEX IF NOT EXISTS idx_meetings_user_id ON meetings(user_id);
CREATE INDEX IF NOT EXISTS idx_meetings_created_at ON meetings(created_at);
CREATE INDEX IF NOT EXISTS idx_meeting_evaluations_meeting_id ON meeting_evaluations(meeting_id);
CREATE INDEX IF NOT EXISTS idx_meeting_evaluations_culture_item_id ON meeting_evaluations(culture_item_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_meetings_updated_at
  BEFORE UPDATE ON meetings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meeting_evaluations_updated_at
  BEFORE UPDATE ON meeting_evaluations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();