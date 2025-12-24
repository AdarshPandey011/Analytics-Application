import './globals.css'

export const metadata = {
  title: 'CausalFunnel Analytics',
  description: 'User Analytics Dashboard',
}

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

