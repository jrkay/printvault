import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get("email"))
  const password = String(formData.get("password"))
  const supabase = createRouteHandlerClient({ cookies })

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    const errorMessage = encodeURIComponent(
      error.message || "Could not authenticate user"
    )
    return NextResponse.redirect(
      `${requestUrl.origin}/?error=${errorMessage}`,
      {
        status: 301,
      }
    )
  }

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  })
}
