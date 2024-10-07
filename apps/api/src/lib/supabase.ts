
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mcmphljbgzdnndofdpvz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jbXBobGpiZ3pkbm5kb2ZkcHZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgwMzk4MzMsImV4cCI6MjA0MzYxNTgzM30.vDbK3NP00hymG79bNkss0z5Oadkq5ao9AUl5G3YZ0wQ'
export const supabase = createClient(supabaseUrl, supabaseKey)
