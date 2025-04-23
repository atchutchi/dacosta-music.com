/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para não pré-renderizar páginas administrativas
  experimental: {
    // Remover appDir que está causando o aviso
  },
  // Configuração para imagens externas
  images: {
    domains: ['localhost', 'supabase.co', 'storage.googleapis.com'],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
