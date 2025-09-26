import type { Metadata } from 'next'
import { Montaga } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const montaga = Montaga({
  subsets: ['latin'],
  weight: [ '400',],
  variable: '--font-montaga',
  display: 'swap',
})

const anecor = localFont({
  src: '../public/fonts/anecor-gheroos.otf',
  variable: '--font-anecor',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nuestra Boda - Invitación',
  description: 'Te invitamos a celebrar nuestro día especial',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
       <body 
          className={`${montaga.variable} ${anecor.variable} font-montaga bg-gradient-to-br from-white to-slate-100 min-h-screen`}
          suppressHydrationWarning
        >

        {children}
      </body>
    </html>
  )
}