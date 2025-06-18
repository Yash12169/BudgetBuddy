import type { Metadata } from 'next'
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import UserProvider from './providers/UserProvider'
import QueryProvider from './providers/QueryProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Budget Buddy',
  description: 'Your personal finance companion',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <head />
        <body className="antialiased bg-white text-black">
          {/* <header className="flex justify-end items-center p-4 gap-4 h-16 border-b"> */}
            {/* <SignedOut> */}
              {/* <SignInButton mode="modal" /> */}
              {/* <SignUpButton mode="modal" /> */}
            {/* </SignedOut> */}
            {/* <SignedIn> */}
              {/* <UserButton /> */}
            {/* </SignedIn> */}
          {/* </header> */}
          <QueryProvider>
            <UserProvider>{children}</UserProvider>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
