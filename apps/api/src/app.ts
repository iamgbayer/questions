import express from 'express'
import cors from 'cors'
import '@/lib/firebase'
import { signup } from './services/signup'

export async function buildApp(app: ReturnType<typeof express>) {

  app.post('/signup', signup)
  app.use(cors())

}
