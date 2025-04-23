# Da Costa Music Website

Este é o repositório oficial do website Da Costa Music, uma agência de música e gerenciamento de talentos representando uma nova era da música eletrônica africana.

## Tecnologias Utilizadas

- **Next.js 15**: Framework React para renderização do lado do servidor e geração de sites estáticos
- **TypeScript**: Superset tipado de JavaScript
- **Tailwind CSS**: Framework CSS utilitário
- **Supabase**: Backend como serviço para banco de dados, autenticação e armazenamento
- **Framer Motion**: Biblioteca para animações
- **Lucide React**: Biblioteca de ícones
- **shadcn/ui**: Componentes de UI reutilizáveis

## Estrutura do Projeto

\`\`\`
da-costa-music/
├── app/                  # Rotas e páginas (App Router)
│   ├── admin/            # Área administrativa
│   ├── api/              # Rotas de API
│   ├── artists/          # Páginas de artistas
│   ├── blog/             # Blog
│   ├── events/           # Eventos
│   ├── login/            # Página de login
│   ├── register/         # Página de registro
│   ├── shop/             # Loja
│   └── b3b/              # Página do conceito B3B
├── components/           # Componentes React
│   ├── admin/            # Componentes da área administrativa
│   ├── calendar/         # Componentes de calendário
│   ├── ui/               # Componentes de UI reutilizáveis
├── lib/                  # Utilitários e configurações
│   ├── supabase/         # Configuração do Supabase
│   └── utils.ts          # Funções utilitárias
├── public/               # Arquivos estáticos
│   ├── images/           # Imagens
│   └── videos/           # Vídeos
└── middleware.ts         # Middleware para autenticação
\`\`\`

## Funcionalidades

- **Página Inicial**: Apresentação da agência e artistas
- **Perfis de Artistas**: Páginas dedicadas para cada artista
- **Blog**: Artigos e notícias
- **Loja**: Produtos e merchandising
- **Eventos**: Calendário e detalhes de eventos
- **Conceito B3B**: Página dedicada ao conceito B3B
- **Área Administrativa**: Gerenciamento de conteúdo
  - Artistas
  - Eventos
  - Álbuns
  - Faixas
  - Live Sets

## Configuração do Projeto

### Pré-requisitos

- Node.js 18.x ou superior
- npm ou pnpm
- Conta no Supabase

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_chave_de_servico_do_supabase
\`\`\`

### Instalação

1. Clone o repositório:
\`\`\`bash
git clone https://github.com/seu-usuario/dacosta-music.com.git
cd dacosta-music.com
\`\`\`

2. Instale as dependências:
\`\`\`bash
npm install
# ou
pnpm install
\`\`\`

3. Execute o servidor de desenvolvimento:
\`\`\`bash
npm run dev
# ou
pnpm dev
\`\`\`

4. Acesse `http://localhost:3000` no seu navegador.

## Migração para cPanel

### Preparação para Produção

1. **Crie um arquivo de variáveis de ambiente para produção**:
   
   Crie um arquivo `.env.production` na raiz do projeto com todas as variáveis de ambiente necessárias:

   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
   SUPABASE_SERVICE_ROLE_KEY=sua_chave_de_servico_do_supabase
   SUPABASE_JWT_SECRET=seu_jwt_secret_do_supabase
   SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
   \`\`\`

2. **Construa o projeto para produção**:

   \`\`\`bash
   npm run build
   # ou
   pnpm build
   \`\`\`

3. **Verifique se a build foi bem-sucedida**:
   
   Certifique-se de que não há erros durante o processo de build.

### Exportação do Projeto

1. **Crie um arquivo ZIP com os arquivos necessários**:

   \`\`\`bash
   zip -r dacosta-music-production.zip .next/ public/ package.json package-lock.json next.config.js .env.production
   \`\`\`

   Se você estiver usando pnpm:

   \`\`\`bash
   zip -r dacosta-music-production.zip .next/ public/ package.json pnpm-lock.yaml next.config.js .env.production
   \`\`\`

### Configuração no cPanel

1. **Verifique se o seu servidor cPanel suporta Node.js**:
   
   Certifique-se de que o seu servidor cPanel tem suporte a Node.js. Você pode verificar isso na seção "Setup Node.js App" ou "Node.js Selector" no cPanel.

2. **Configure uma aplicação Node.js**:

   - Acesse o cPanel
   - Encontre a seção "Setup Node.js App" ou "Node.js Selector"
   - Clique em "Create Application"
   - Selecione o domínio ou subdomínio onde deseja hospedar o site
   - Selecione a versão do Node.js (recomendado: 18.x ou superior)
   - Configure o diretório da aplicação (geralmente algo como `public_html/dacosta-music`)
   - Configure o ponto de entrada da aplicação como `node_modules/.bin/next start`
   - Defina as variáveis de ambiente necessárias
   - Salve as configurações

3. **Faça upload do arquivo ZIP**:

   - Acesse o Gerenciador de Arquivos no cPanel
   - Navegue até o diretório da aplicação que você configurou
   - Faça upload do arquivo ZIP
   - Extraia o arquivo ZIP no diretório

4. **Instale as dependências**:

   - Acesse o Terminal no cPanel ou use SSH para acessar o servidor
   - Navegue até o diretório da aplicação
   - Execute o comando:

     \`\`\`bash
     npm install --production
     # ou
     pnpm install --production
     \`\`\`

5. **Inicie a aplicação**:

   - No painel de controle da aplicação Node.js no cPanel, clique em "Start Application"
   - Verifique os logs para garantir que a aplicação iniciou corretamente

### Configuração de Domínio e SSL

1. **Configure o domínio**:

   - No cPanel, acesse a seção "Domains" ou "Subdomains"
   - Configure o domínio ou subdomínio para apontar para o diretório da aplicação

2. **Configure o SSL**:

   - No cPanel, acesse a seção "SSL/TLS" ou "Let's Encrypt SSL"
   - Gere um certificado SSL para o seu domínio
   - Instale e configure o certificado

### Verificações Pós-Migração

1. **Teste todas as funcionalidades do site**:
   
   - Navegação
   - Autenticação
   - Área administrativa
   - Upload de arquivos
   - Formulários de contato

2. **Verifique a responsividade**:
   
   Teste o site em diferentes dispositivos e tamanhos de tela.

3. **Configure backups**:
   
   Configure backups regulares do site e do banco de dados no cPanel.

4. **Monitore o desempenho**:
   
   Use ferramentas como Google PageSpeed Insights para verificar o desempenho do site.

## Manutenção

### Atualizações

Para atualizar o site após fazer alterações:

1. Faça as alterações no código
2. Execute `npm run build` ou `pnpm build`
3. Crie um novo arquivo ZIP com os arquivos atualizados
4. Faça upload e extraia o arquivo no servidor
5. Reinicie a aplicação Node.js no cPanel

### Backups

Recomenda-se configurar backups regulares:

1. No cPanel, acesse a seção "Backup" ou "Backup Wizard"
2. Configure backups completos ou parciais
3. Defina a frequência dos backups
4. Escolha um local para armazenar os backups

## Suporte

Para suporte técnico ou dúvidas sobre o site, entre em contato com:

- Email: suporte@dacosta-music.com
- Telefone: +XX XXX XXX XXX

## Licença

Este projeto é propriedade exclusiva da Da Costa Music. Todos os direitos reservados.
