import Footer from "@/components/Footer"
import TopMenu from "@/components/TopMenu"
import "@/styles/index.css"
import "semantic-ui-css/semantic.min.css"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"

export const metadata = {
  title: "PrintVault",
  description: "3D Print File Management",
}

export const dynamic = "force-dynamic"

async function AuthLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return redirect(`/`)

  return (
    <html lang='en'>
      <body>
        <div>
          <TopMenu />
        </div>
        {children}
        <div>
          <Footer />
        </div>
      </body>
    </html>
  )
}

export default AuthLayout
