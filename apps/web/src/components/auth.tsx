import React, { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import * as firebase from 'firebase/auth'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/use-auth'

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32)
})

type Props = {
  page: 'signin' | 'signup'
}

export function Auth({ page = 'signin' }: Props) {
  const router = useRouter()
  const { signUp, signIn } = useAuth()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (page === 'signup') {
      try {
        await signUp(data.email, data.password)
        router.push('/profile')
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        await signIn(data.email, data.password)
        router.push('/profile')
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="container flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold mb-4">
        {page === 'signin' ? 'Welcome!' : 'Sign up'}
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-1/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button>
            {page === 'signin' ? 'Sign in' : 'Sign up'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
