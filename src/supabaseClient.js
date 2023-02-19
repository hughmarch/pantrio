import { createClient } from '@supabase/supabase-js'
// import {config} from "dotenv";
//
// config()

const supabaseUrl = "https://homukshizdogpzexxorp.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvbXVrc2hpemRvZ3B6ZXh4b3JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY4MTE2MzIsImV4cCI6MTk5MjM4NzYzMn0.w9OfQsud5nf15ft690SwphREEcLS26_Xm85y3WulXto"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)