# 🚀 Pluggar Cultura Manager

SaaS de gerenciamento de reuniões e avaliação de fit cultural para a Pluggar.

## 🎯 Funcionalidades

- ✅ **Autenticação segura** com Supabase Auth
- 📊 **Dashboard** com métricas de reuniões
- 📝 **Checklist cultural** com 48 itens organizados em 8 seções
- 💾 **Persistência total** no Supabase
- 🔄 **Edição** de reuniões já criadas
- 📈 **Score cultural** calculado automaticamente
- 📋 **Observações** editáveis por reunião

## 🏗️ Tecnologias

- **Frontend:** React 18 + Vite + Tailwind CSS
- **Backend:** Supabase (PostgreSQL + Auth + RLS)
- **Roteamento:** React Router DOM
- **Ícones:** Lucide React

## 🔒 Segurança Implementada

- ✅ **Row Level Security (RLS)** habilitado
- ✅ **Autenticação** obrigatória
- ✅ **Isolamento de dados** por usuário
- ✅ **Validação** de entrada no frontend e backend
- ✅ **Environment variables** para credenciais

## 🚀 Como usar no Bolt.new

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/adrianomarqui/pluggar-cultura-manager.git
   ```

2. **Configure o Supabase:**
   - Crie uma conta no [Supabase](https://supabase.com)
   - Crie um novo projeto
   - Execute as migrations na pasta `/supabase/migrations/`
   - Copie suas credenciais

3. **Configure variáveis de ambiente:**
   ```bash
   cp .env.example .env
   ```
   Edite o arquivo `.env` com suas credenciais do Supabase:
   ```
   VITE_SUPABASE_URL=sua_url_do_supabase
   VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
   ```

4. **Execute a aplicação:**
   ```bash
   npm install
   npm run dev
   ```

## 📊 Estrutura do Banco de Dados

### Tabelas Principais:
- `sections` - Seções culturais (8 seções)
- `culture_items` - Itens culturais (48 itens)
- `meetings` - Reuniões criadas pelos usuários
- `meeting_evaluations` - Avaliações dos itens por reunião

### Row Level Security:
Todas as tabelas possuem RLS habilitado, garantindo que usuários só acessem seus próprios dados.

## 🎨 Design System

### Cores:
- **Primary:** Cyan/Turquesa (#22d3ee)
- **Success:** Verde (#22c55e)
- **Danger:** Vermelho (#ef4444)

### Componentes:
- **Header** com gradiente primary
- **Cards** com shadow suave
- **Badges** coloridos para status
- **Botões** com hover states
- **Modal** para criação de reunião

## 📱 Funcionalidades Detalhadas

### 1. Dashboard
- Lista todas as reuniões do usuário
- Métricas: total, concluídas, score médio
- Busca por nome da reunião
- Ações: editar, excluir

### 2. Visualização de Reunião
- Checklist com 8 seções culturais
- 48 itens avaliáveis (VIVEMOS/NÃO VIVEMOS)
- Campo de observações editável
- Score cultural calculado em tempo real
- Resumo visual com métricas

### 3. Autenticação
- Login/cadastro com email e senha
- Logout seguro
- Validação de formulários
- Estados de loading

## 🔧 Desenvolvimento

### Comandos disponíveis:
```bash
npm run dev      # Desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview da build
```

## 📋 Seções Culturais

1. **🎯 Identidade Organizacional** - Propósito, visão e missão
2. **💪 Não temos braço curto** - Responsabilidade e proatividade
3. **🗣️ Jogamos o jogo abertamente** - Comunicação e feedback
4. **🎯 Focamos no resultado** - Performance e KPIs
5. **⭐ Temos os mais altos padrões** - Excelência e qualidade
6. **🏆 Somos uma tropa de elite** - Trabalho em equipe
7. **🚀 Somos ambiciosos** - Ambição e crescimento
8. **💎 Vendemos a verdade** - Ética e transparência

## ⚠️ IMPORTANTE: Configuração de Segurança

**NUNCA** faça commit do arquivo `.env` com suas credenciais reais. O arquivo está no `.gitignore` por segurança.

## 🚀 Deploy

Este projeto está pronto para deploy em:
- **Vercel** (recomendado para React)
- **Netlify**
- **Railway**
- **Render**

Configure as variáveis de ambiente na plataforma escolhida.

## 📄 Licença

Este projeto foi desenvolvido para a Pluggar e segue os padrões de segurança corporativa.

---

**Desenvolvido com ❤️ usando React + Supabase + Tailwind CSS**