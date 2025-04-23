import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/lib/database.types"

// Cliente para uso no lado do servidor (Server Components, API Routes)
export const createServerClient = () => {
  return createServerComponentClient<Database>({ cookies })
}
