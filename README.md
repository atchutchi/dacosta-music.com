# Da Costa Music - Website

![Da Costa Music Logo](/public/images/logo-white.png)

## Visão Geral

Da Costa Music é um site para uma agência de gestão de música e talentos focada em música eletrônica africana. O site apresenta os artistas representados pela agência, suas músicas, eventos, e outras informações relevantes.

## Tecnologias Utilizadas

- **Next.js 14**: Framework React com renderização do lado do servidor
- **React 18**: Biblioteca JavaScript para construção de interfaces
- **TypeScript**: Superset tipado de JavaScript
- **Tailwind CSS**: Framework CSS utilitário
- **Framer Motion**: Biblioteca para animações
- **Shadcn/UI**: Componentes de UI reutilizáveis
- **Lucide React**: Biblioteca de ícones
- **Supabase**: Banco de dados e autenticação

## Estrutura do Projeto

\`\`\`
da-costa-music/
├── app/                  # Rotas e páginas da aplicação
│   ├── admin/            # Área administrativa
│   ├── api/              # Rotas de API
│   ├── artists/          # Páginas de artistas
│   ├── blog/             # Blog e artigos
│   ├── b3b/              # Página do conceito B3B
│   ├── events/           # Páginas de eventos
│   ├── login/            # Página de login
│   ├── register/         # Página de registro
│   ├── shop/             # Loja online
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Página inicial
├── components/           # Componentes reutilizáveis
│   ├── admin/            # Componentes da área administrativa
│   ├── calendar/         # Componentes de calendário
│   ├── ui/               # Componentes de UI (shadcn)
│   ├── hero-section.tsx  # Seção de hero
│   ├── navbar.tsx        # Barra de navegação
│   └── ...               # Outros componentes
├── lib/                  # Utilitários e configurações
│   ├── supabase/         # Configuração do Supabase
│   ├── database.types.ts # Tipos do banco de dados
│   └── utils.ts          # Funções utilitárias
├── public/               # Arquivos estáticos
│   ├── images/           # Imagens
│   └── videos/           # Vídeos
└── ...
\`\`\`

## Funcionalidades Implementadas

1. **Página Inicial**:
   - Hero section com vídeo de fundo
   - Seções sobre a agência, artistas, música, blog e contato

2. **Artistas**:
   - Perfis detalhados para cada artista (Caiiro, Da Capo, Enoo Napa)
   - Biografias, discografias, estatísticas e galerias

3. **Conceito B3B**:
   - Página dedicada ao conceito B3B (Back-to-Back-to-Back)
   - Informações sobre eventos e experiências

4. **Blog**:
   - Artigos e notícias sobre os artistas e a indústria
   - Categorização e paginação

5. **Loja**:
   - Produtos relacionados aos artistas
   - Carrinho de compras funcional (front-end)

6. **Música**:
   - Player de música com playlists
   - Controles de reprodução

7. **Contato**:
   - Formulário de contato
   - Informações de contato da agência

8. **Autenticação**:
   - Sistema de login/registro
   - Área de administração protegida

9. **Área Administrativa**:
   - Dashboard administrativo
   - Gerenciamento de artistas e eventos
   - Perfil de usuário e configurações

10. **Eventos**:
    - Listagem de eventos
    - Detalhes de eventos individuais
    - Calendário de eventos

11. **Integração com Banco de Dados**:
    - Supabase para armazenamento de dados
    - API para gerenciar artistas e eventos

## Funcionalidades a Implementar

1. **Sistema de Pagamento**:
   - Integrar gateway de pagamento (Stripe, PayPal)
   - Implementar checkout seguro

2. **Streaming de Áudio**:
   - Melhorar o player de música atual
   - Adicionar funcionalidade de streaming real

3. **Newsletter**:
   - Implementar sistema de inscrição em newsletter
   - Integrar com serviço de email marketing

4. **Comentários e Interação**:
   - Adicionar sistema de comentários em blog e eventos
   - Implementar funcionalidades sociais

5. **Pesquisa Global**:
   - Adicionar funcionalidade de pesquisa em todo o site
   - Implementar filtros avançados

6. **Upload de Imagens**:
   - Implementar sistema de upload de imagens
   - Integrar com armazenamento de arquivos

7. **SEO e Performance**:
   - Otimizar metadados para SEO
   - Melhorar performance e tempo de carregamento

8. **Testes**:
   - Implementar testes unitários e de integração
   - Realizar testes de usabilidade

9. **Internacionalização**:
   - Adicionar suporte para múltiplos idiomas

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

## Licença

[Inserir informação de licença]

---

Desenvolvido com ❤️ para Da Costa Music Management
