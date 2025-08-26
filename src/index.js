import { createClient } from '@supabase/supabase-js';
import { app } from './app.js' 
import dotenv from 'dotenv'

dotenv.config({
    path: '.env'
})

// 🔁 Replace these two values with your actual Supabase info
const supabaseUrl = process.env.SUPABASE_URL       // Your Supabase project URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey);

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on ${process.env.PORT || 8000}`)
  }
)

export default { supabase }

