import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://cmhaajnfguvrfhcbbjez.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtaGFham5mZ3V2cmZoY2JiamV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MDc0NTAsImV4cCI6MjA2NzM4MzQ1MH0.AaswbVbmwlEDqrMW-ZBIHeFhGn3GDp4fhyCj9C82FNw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
