import type { Metadata } from 'next'
import { Inter, Libre_Caslon_Text } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'], variable: '--font-body' })
const libreCaslon = Libre_Caslon_Text({ 
  subsets: ['latin'], 
  variable: '--font-display',
  weight: ['400', '700']
})

export const metadata: Metadata = {
  title: 'Gorla Pothanna Farms - Fresh from Farm to Table',
  description: 'Premium organic produce delivered to your doorstep',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${libreCaslon.variable} font-body bg-background text-foreground antialiased`}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
