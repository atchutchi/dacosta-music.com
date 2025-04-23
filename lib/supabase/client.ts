import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/database.types"

// Cliente para uso no lado do cliente (componentes)
export const createClient = () => {
  return createClientComponentClient<Database>()
}
