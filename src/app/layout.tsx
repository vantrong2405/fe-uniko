import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/libraries/utils'
import configProject from '../config/configService'
import QueryProvider from '@/libraries/query-provider'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/libraries/theme-provider'
import { ReactNode } from 'react'
import 'nprogress/nprogress.css'
import dynamic from 'next/dynamic'
import { SocketProvider } from '../libraries/useSocketIo'
import { GoogleOAuthProvider } from '@react-oauth/google'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'UNIKO - Financial Management',
  description: '',
  icons: 'favicon.ico'
}

const TopProgressBar = dynamic(
  () => {
    return import('@/components/core/top-progress-bar')
  },
  { ssr: false }
)

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'UNIKO',
    applicationCategory: 'FinanceApplication',
    description:
      'Phần mềm quản lý tài chính thông minh UNIKO giúp tối ưu hóa việc theo dõi và quản lý tài chính cá nhân',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  }

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </head>
      <body className={cn('min-h-screen font-sans antialiased', fontSans.variable)}>
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
        <TopProgressBar />
        <SocketProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            <GoogleOAuthProvider clientId={configProject.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
              <QueryProvider>{children}</QueryProvider>
            </GoogleOAuthProvider>
          </ThemeProvider>
        </SocketProvider>
      </body>
    </html>
  )
}
