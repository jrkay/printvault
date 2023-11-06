import Footer from "@/components/Footer"
import TopMenu from "@/components/TopMenu"
import "@/styles/index.css"
import "semantic-ui-css/semantic.min.css"

export const metadata = {
  title: "PrintVault",
  description: "3D Print File Management",
}

export const dynamic = "force-dynamic"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
