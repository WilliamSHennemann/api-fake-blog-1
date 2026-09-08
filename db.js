require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://tzoofgtinnoyotyfwpgn.supabase.co';
const supabaseKey = process.env.SUPABASE_SECRET_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = supabase