import './style/index.css'
import 'semantic-ui-css/semantic.min.css'

export const metadata = {
  title: 'PrintVault',
  description: '3D Print File Management',
}

export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode 
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
