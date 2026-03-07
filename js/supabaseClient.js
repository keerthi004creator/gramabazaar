import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = "https://mvzvgupvohptybfuxbww.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12enZndXB2b2hwdHliZnV4Ynd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4Njg3NzEsImV4cCI6MjA4ODQ0NDc3MX0.hWDttnIga5z-DGaBb28wdY55NjOgiXCA1vz2eBvg5Ro"

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase