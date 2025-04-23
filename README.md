# Da Costa Music - Website

![Da Costa Music Logo](/public/images/logo-white.png)

## Visão Geral

Da Costa Music é um site para uma agência de gestão de música e talentos focada em música eletrônica africana. O site apresenta os artistas representados pela agência, suas músicas, eventos, e outras informações relevantes, além de uma área administrativa completa para gerenciamento de conteúdo.

## Tecnologias Utilizadas

- **Next.js 14**: Framework React com renderização do lado do servidor
- **React 18**: Biblioteca JavaScript para construção de interfaces
- **TypeScript**: Superset tipado de JavaScript
- **Tailwind CSS**: Framework CSS utilitário
- **Framer Motion**: Biblioteca para animações
- **Shadcn/UI**: Componentes de UI reutilizáveis
- **Lucide React**: Biblioteca de ícones
- **Supabase**: Banco de dados PostgreSQL, autenticação e armazenamento
- **React Hook Form**: Gerenciamento de formulários
- **Zod**: Validação de esquemas
- **Date-fns**: Manipulação de datas

## Estrutura do Projeto

\`\`\`
da-costa-music/
├── app/                  # Rotas e páginas da aplicação
│   ├── admin/            # Área administrativa
│   │   ├── albums/       # Gerenciamento de álbuns
│   │   ├── artists/      # Gerenciamento de artistas
│   │   ├── events/       # Gerenciamento de eventos
│   │   ├── live-sets/    # Gerenciamento de live sets
│   │   ├── profile/      # Perfil do usuário
│   │   ├── settings/     # Configurações
│   │   ├── tracks/       # Gerenciamento de faixas
│   │   └── page.tsx      # Dashboard administrativo
│   ├── api/              # Rotas de API
│   │   ├── artists/      # API de artistas
│   │   └── events/       # API de eventos
│   ├── artists/          # Páginas de artistas
│   │   └── [slug]/       # Página de artista individual
│   ├── b3b/              # Página do conceito B3B
│   ├── blog/             # Blog e artigos
│   │   └── [slug]/       # Página de artigo individual
│   ├── events/           # Páginas de eventos
│   │   └── [id]/         # Página de evento individual
│   ├── login/            # Página de login
│   ├── register/         # Página de registro
│   ├── shop/             # Loja online
│   │   └── cart/         # Carrinho de compras
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Página inicial
├── components/           # Componentes reutilizáveis
│   ├── admin/            # Componentes da área administrativa
│   │   ├── admin-header.tsx     # Cabeçalho administrativo
│   │   ├── admin-sidebar.tsx    # Barra lateral administrativa
│   │   ├── album-form.tsx       # Formulário de álbum
│   │   ├── artist-form.tsx      # Formulário de artista
│   │   ├── audio-upload.tsx     # Upload de áudio
│   │   ├── event-form.tsx       # Formulário de evento
│   │   ├── file-upload.tsx      # Upload de arquivos
│   │   ├── live-set-form.tsx    # Formulário de live set
│   │   ├── search-filter.tsx    # Filtro de pesquisa
│   │   └── track-form.tsx       # Formulário de faixa
│   ├── calendar/         # Componentes de calendário
│   │   └── event-calendar.tsx   # Calendário de eventos
│   ├── ui/               # Componentes de UI (shadcn)
│   ├── about-section.tsx # Seção "Sobre"
│   ├── blog-section.tsx  # Seção de blog
│   ├── contact-section.tsx # Seção de contato
│   ├── footer.tsx        # Rodapé
│   ├── hero-section.tsx  # Seção de hero
│   ├── marquee-text.tsx  # Texto em movimento
│   ├── music-player.tsx  # Player de música
│   ├── music-section.tsx # Seção de música
│   ├── navbar.tsx        # Barra de navegação
│   └── roster-section.tsx # Seção de artistas
├── lib/                  # Utilitários e configurações
│   ├── supabase/         # Configuração do Supabase
│   │   ├── client.ts     # Cliente Supabase para o lado do cliente
│   │   └── server.ts     # Cliente Supabase para o lado do servidor
│   ├── database.types.ts # Tipos do banco de dados
│   └── utils.ts          # Funções utilitárias
├── middleware.ts         # Middleware para autenticação
├── public/               # Arquivos estáticos
│   ├── images/           # Imagens
│   └── videos/           # Vídeos
└── ...
\`\`\`

## Funcionalidades Implementadas

### Área Pública

1. **Página Inicial**:
   - Hero section com vídeo de fundo
   - Seções sobre a agência, artistas, música, blog e contato
   - Texto em movimento (marquee) com informações relevantes

2. **Artistas**:
   - Perfis detalhados para cada artista (Caiiro, Da Capo, Enoo Napa)
   - Biografias, discografias, estatísticas e galerias
   - Reprodução de faixas e visualização de live sets

3. **Conceito B3B**:
   - Página dedicada ao conceito B3B (Back-to-Back-to-Back)
   - Informações sobre eventos e experiências
   - Detalhes sobre os artistas participantes

4. **Blog**:
   - Artigos e notícias sobre os artistas e a indústria
   - Categorização e paginação
   - Compartilhamento em redes sociais

5. **Loja**:
   - Produtos relacionados aos artistas
   - Carrinho de compras funcional (front-end)
   - Filtros e pesquisa de produtos

6. **Música**:
   - Player de música com playlists
   - Controles de reprodução (play, pause, próximo, anterior)
   - Controle de volume e mudo

7. **Eventos**:
   - Listagem de eventos
   - Calendário interativo
   - Detalhes de eventos individuais

8. **Contato**:
   - Formulário de contato
   - Informações de contato da agência
   - Links para redes sociais

### Área Administrativa

1. **Autenticação**:
   - Sistema de login/registro
   - Proteção de rotas administrativas
   - Gerenciamento de perfil e senha

2. **Dashboard**:
   - Visão geral de estatísticas
   - Acesso rápido a funcionalidades principais
   - Listagem de eventos próximos

3. **Gerenciamento de Artistas**:
   - Criação, edição e exclusão de artistas
   - Upload de imagens (logo e foto)
   - Gerenciamento de informações biográficas e estatísticas

4. **Gerenciamento de Eventos**:
   - Criação, edição e exclusão de eventos
   - Associação de artistas a eventos
   - Configuração de datas, locais e links para ingressos

5. **Gerenciamento de Álbuns**:
   - Criação, edição e exclusão de álbuns
   - Upload de capas
   - Associação de álbuns a artistas

6. **Gerenciamento de Faixas**:
   - Criação, edição e exclusão de faixas
   - Upload e reprodução de arquivos de áudio
   - Associação de faixas a álbuns e artistas

7. **Gerenciamento de Live Sets**:
   - Criação, edição e exclusão de live sets
   - Upload e reprodução de arquivos de áudio
   - Associação de live sets a artistas e eventos

## Banco de Dados

O projeto utiliza o Supabase como banco de dados PostgreSQL, com as seguintes tabelas principais:

- **artists**: Armazena informações sobre os artistas
- **events**: Armazena informações sobre eventos
- **albums**: Armazena informações sobre álbuns
- **tracks**: Armazena informações sobre faixas musicais
- **live_sets**: Armazena informações sobre live sets
- **profiles**: Armazena informações sobre usuários
- **event_artists**: Tabela de junção para relacionar eventos e artistas

## Experiência do Usuário (UX)

O site foi projetado com foco na experiência do usuário, seguindo os seguintes princípios:

1. **Design Responsivo**: O site se adapta a diferentes tamanhos de tela, proporcionando uma experiência consistente em dispositivos móveis, tablets e desktops.

2. **Navegação Intuitiva**: A estrutura de navegação é clara e consistente, permitindo que os usuários encontrem facilmente o conteúdo desejado.

3. **Feedback Visual**: Animações sutis e transições proporcionam feedback visual para as ações do usuário, melhorando a interatividade.

4. **Acessibilidade**: O site segue práticas de acessibilidade, como contraste adequado, textos alternativos para imagens e navegação por teclado.

5. **Performance**: Otimização de imagens e carregamento assíncrono para garantir tempos de carregamento rápidos.

6. **Consistência Visual**: Paleta de cores, tipografia e elementos de interface consistentes em todo o site.

## Implementações Futuras

1. **Sistema de Pagamento**:
   - Integrar gateway de pagamento (Stripe, PayPal)
   - Implementar checkout seguro
   - Gerenciamento de pedidos e histórico de compras

2. **Streaming de Áudio Avançado**:
   - Melhorar o player de música atual
   - Adicionar funcionalidade de streaming em tempo real
   - Implementar sistema de playlists personalizadas

3. **Newsletter**:
   - Implementar sistema de inscrição em newsletter
   - Integrar com serviço de email marketing
   - Automação de envio de conteúdo

4. **Comentários e Interação**:
   - Adicionar sistema de comentários em blog e eventos
   - Implementar funcionalidades sociais
   - Sistema de avaliação de produtos

5. **Pesquisa Global**:
   - Adicionar funcionalidade de pesquisa em todo o site
   - Implementar filtros avançados
   - Sugestões de pesquisa em tempo real

6. **Análise e Métricas**:
   - Implementar sistema de análise de tráfego
   - Rastreamento de conversões
   - Relatórios personalizados

7. **Internacionalização**:
   - Suporte para múltiplos idiomas
   - Adaptação de conteúdo para diferentes regiões

8. **Aplicativo Móvel**:
   - Desenvolvimento de aplicativo nativo para iOS e Android
   - Funcionalidades offline
   - Notificações push

## Como Executar o Projeto

1. Clone o repositório:
   \`\`\`bash
   git clone [URL_DO_REPOSITÓRIO]
   cd da-costa-music
   \`\`\`

2. Instale as dependências:
   \`\`\`bash
   npm install
   # ou
   yarn install
   \`\`\`

3. Configure as variáveis de ambiente:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
   SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role_do_supabase
   \`\`\`

4. Execute o servidor de desenvolvimento:
   \`\`\`bash
   npm run dev
   # ou
   yarn dev
   \`\`\`

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Equipe

- **Desenvolvimento**: Equipe Da Costa Music
- **Design**: Equipe Da Costa Music
- **Conteúdo**: Equipe Da Costa Music

## Licença

Todos os direitos reservados © 2023 Da Costa Music Management

---

Desenvolvido com ❤️ para Da Costa Music Management
