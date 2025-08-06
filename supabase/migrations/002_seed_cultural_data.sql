/*
# Dados Culturais da Pluggar

1. Seções Culturais
  - 8 seções organizacionais principais
  - Ícones e ordenação específica

2. Itens Culturais
  - 48 itens específicos distribuídos pelas seções
  - Títulos e descrições detalhadas
  - Ordenação dentro de cada seção

3. Dados Baseados no Layout Original
  - Replica exatamente a estrutura apresentada
  - Mantém textos originais da Pluggar
*/

-- Insert sections data
INSERT INTO sections (id, title, icon, order_index) VALUES
  (1, 'Identidade Organizacional', '🎯', 1),
  (2, 'Não temos braço curto, fazemos o que tem que ser feito', '💪', 2),
  (3, 'Jogamos o jogo abertamente', '🗣️', 3),
  (4, 'Focamos no resultado', '🎯', 4),
  (5, 'Temos os mais altos padrões', '⭐', 5),
  (6, 'Somos uma tropa de elite', '🏆', 6),
  (7, 'Somos ambiciosos e temos tesão pela jornada', '🚀', 7),
  (8, 'Vendemos a verdade', '💎', 8)
ON CONFLICT (id) DO NOTHING;

-- Insert culture items data
INSERT INTO culture_items (id, title, description, section_id, order_index) VALUES
  -- Identidade Organizacional (Section 1)
  (1, 'Propósito claro', '"Impulsionar a prosperidade dos negócios e das pessoas" está sendo vivenciado ativamente', 1, 1),
  (2, 'Visão estratégica', 'Trabalhamos para consolidar posição como plataforma omnichannel nacional', 1, 2),
  (3, 'Missão aplicada', 'Entregamos plataforma que permite pensar além das operações diárias', 1, 3),
  
  -- Não temos braço curto (Section 2)
  (4, 'Responsabilidade total', 'Fazemos o que precisa ser feito, com responsabilidade e sem desculpas', 2, 1),
  (5, 'Priorização correta', 'Agimos pelo que é melhor para empresa, equipe e indivíduo (nesta ordem)', 2, 2),
  (6, 'Visão de longo prazo', 'Não sacrificamos longo prazo pelos resultados de curto prazo', 2, 3),
  (7, 'Ownership de fracassos', 'Evitamos omitir responsabilidades pelos nossos fracassos', 2, 4),
  (8, 'Proatividade', 'Não nos limitamos apenas pelo que somos responsáveis formalmente', 2, 5),
  
  -- Jogamos o jogo abertamente (Section 3)
  (9, 'Comunicação respeitosa', 'Falamos o que precisa ser dito, sem faltar com respeito', 3, 1),
  (10, 'Feedback oportuno', 'Damos feedback no momento necessário, independente de qual seja', 3, 2),
  (11, 'Escuta ativa', 'Praticamos escuta ativa - ouvimos e somos receptivos a opiniões diversas', 3, 3),
  (12, 'Coragem para falar', 'Evitamos deixar de falar algo por medo', 3, 4),
  (13, 'Receptividade a feedback', 'Não somos reativos ao receber feedbacks', 3, 5),
  (14, 'Feedback construtivo', 'Evitamos feedbacks que não são construtivos', 3, 6),
  
  -- Focamos no resultado (Section 4)
  (15, 'Conhecimento dos indicadores', 'Sabemos a situação dos principais indicadores da empresa o tempo todo', 4, 1),
  (16, 'Base para o futuro', 'Resultados atuais são base do sucesso futuro - precisamos garanti-los', 4, 2),
  (17, 'Inconformismo', 'Somos inconformados - resultado sempre pode ser melhorado', 4, 3),
  (18, 'Perseverança', 'Evitamos desistir do resultado antes do jogo acabar', 4, 4),
  (19, 'Acompanhamento de KPIs', 'Sempre acompanhamos indicadores principais da Pluggar', 4, 5),
  (20, 'Pedido de ajuda', 'Pedimos ajuda quando sabemos que não alcançaremos resultado', 4, 6),
  
  -- Temos os mais altos padrões (Section 5)
  (21, 'Champions League', 'Jogamos Champions League - pessoas de elite com altos padrões', 5, 1),
  (22, 'Zona de crescimento', 'Sempre na zona de crescimento, nunca zona de conforto', 5, 2),
  (23, 'Produtos excepcionais', 'Temos os melhores produtos do mundo com padrão absurdo', 5, 3),
  (24, 'Intolerância à mediocridade', 'Evitamos tolerar mediocridade', 5, 4),
  (25, 'Além do financeiro', 'Não nos contentamos só porque gerou resultado financeiro', 5, 5),
  (26, 'Momentos wow', 'Sempre proporcionamos momentos "wow" além das expectativas', 5, 6),
  
  -- Somos uma tropa de elite (Section 6)
  (27, 'Pessoas de elite', 'Pessoas de elite alinhadas com propósito e performance fora da curva', 6, 1),
  (28, 'Aprendizado contínuo', 'Estudamos e aprendemos além do necessário', 6, 2),
  (29, 'Time unido', 'Treinamos sempre, jogamos juntos e ganhamos juntos', 6, 3),
  (30, 'Crescimento com desafios', 'Aprendemos e crescemos com erros e desafios', 6, 4),
  (31, 'Comprometimento', 'Somos comprometidos - nossa palavra é sagrada', 6, 5),
  (32, 'Protagonismo dos melhores', 'Os melhores devem ser protagonistas', 6, 6),
  (33, 'Humildade para aprender', 'Evitamos achar que sabemos tudo - sempre abertos a aprender', 6, 7),
  (34, 'Compromissos claros', 'Não dizemos "vou tentar" - temos prazos claros', 6, 8),
  (35, 'Time acima do individual', 'Priorizamos time sobre resultado individual', 6, 9),
  
  -- Somos ambiciosos e temos tesão pela jornada (Section 7)
  (36, 'Felicidade gera produtividade', 'Pessoas mais felizes produzem mais e melhor', 7, 1),
  (37, 'Celebração coletiva', 'Vibramos e comemoramos cada conquista juntos', 7, 2),
  (38, 'Ambição para crescer', 'Ambição para ir longe, assumindo riscos e indo além', 7, 3),
  (39, 'Crescimento contínuo', 'Sempre existe montanha maior - sempre crescendo na jornada', 7, 4),
  (40, 'Jornada diária', 'Sucesso é jornada diária, não destino', 7, 5),
  (41, 'Comemorações em equipe', 'Comemoramos conquistas com o time', 7, 6),
  (42, 'Alinhamento com propósito', 'Evitamos pessoas desconectadas do propósito', 7, 7),
  
  -- Vendemos a verdade (Section 8)
  (43, 'Diferença real', 'Vendemos o que faz diferença real na vida do cliente', 8, 1),
  (44, 'Conhecimento do impacto', 'Sabemos o impacto que geramos em cada cliente', 8, 2),
  (45, 'Crença na transformação', 'Vendemos porque acreditamos na transformação que causamos', 8, 3),
  (46, 'Ética comercial', 'Evitamos vender a qualquer custo', 8, 4),
  (47, 'Foco no cliente', 'Vendemos o melhor para cliente, não por necessidade nossa', 8, 5),
  (48, 'Transparência total', 'Evitamos falsas expectativas ou mentiras', 8, 6)
ON CONFLICT (id) DO NOTHING;