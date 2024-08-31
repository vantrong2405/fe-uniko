'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Icons } from '@/components/ui/icons'
import { Card, CardContent } from '@/components/ui/card'
import { useState, FormEvent } from 'react'
import { useAuth } from '@/hooks/query-hooks/use-auth'
import Logo2 from '@/images/logo-2.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function SignUpForm() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signUp, isSigningUp } = useAuth()
  const router = useRouter()

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    signUp({ fullName, email, password })
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-r from-[#4D4C7D] to-[#363062] px-4 py-12 sm:px-6 lg:px-8'>
      <Card className='w-full max-w-md rounded-lg shadow-lg'>
        <div className='flex items-center justify-center p-4'>
          <div className='h-32 w-32'>
            <Image
              src={Logo2}
              alt='Logo'
              width={500}
              height={500}
              layout='responsive'
              objectFit='cover'
              className='h-full w-full'
            />
          </div>
        </div>
        <CardContent className=''>
          <h2 className='text-center text-2xl font-bold tracking-tight text-primary sm:text-3xl'>
            Create your account
          </h2>
          <p className='mt-2 text-center text-sm text-primary'>Join us and open up your own world!</p>
          <form className='space-y-4 sm:space-y-6' onSubmit={handleSubmit}>
            <div>
              <Label htmlFor='fullName'>Full Name</Label>
              <Input
                id='fullName'
                required
                placeholder='John Doe'
                className='mt-2'
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor='email'>Email address</Label>
              <Input
                id='email'
                autoComplete='email'
                required
                placeholder='name@example.com'
                className='mt-2'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                autoComplete='new-password'
                required
                placeholder='••••••••'
                className='mt-2'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button variant='blueVin' className='mt-4 w-full' type='submit' isLoading={isSigningUp}>
              Sign Up
            </Button>
            <div className='relative mt-4'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t border-muted-foreground/30' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>Already have an account?</span>
              </div>
            </div>
            <Button variant='secondary' className='w-full' type='button' onClick={() => router.push('/sign-in')}>
              <Link href={'/sign-in'}>Sign In</Link>
            </Button>
            <div className='relative mt-6'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t border-muted-foreground/30' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
              </div>
            </div>
            <div className='mt-4 flex flex-col sm:flex-row sm:space-x-2'>
              <Button variant='greenPastel1' className='mb-2 me-5 w-full'>
                <Icons.google className='mr-2 h-5 w-5' />
                Sign up with Google
              </Button>
              <Button variant='blueVin' className='w-full'>
                <Icons.gitHub className='mr-2 h-5 w-5' />
                Sign up with GitHub
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
