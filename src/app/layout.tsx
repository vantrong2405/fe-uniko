import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/libraries/utils'
import configProject from '../config/configService'
import QueryProvider from '@/libraries/query-provider'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/libraries/theme-provider'
import { AppProvider } from '../context/app-context.provider'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'UNIKO - Financial Management',
  description: ''
}

console.info('Config Project ', configProject)

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <Toaster
          toastOptions={{
            duration: 1000,
            style: {
              border: '1px solid #fff',
              padding: '16px',
              fontSize: '14px'
            },
            success: {},
            error: {}
          }}
          position='top-center'
          reverseOrder={false}
          gutter={8}
          containerClassName=''
          containerStyle={{}}
        />
        <AppProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            <QueryProvider>{children}</QueryProvider>
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  )
}
