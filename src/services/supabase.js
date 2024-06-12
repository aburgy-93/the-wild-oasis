import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://cgesnnczqnurpxqsrdzd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnZXNubmN6cW51cnB4cXNyZHpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzMTY3NTMsImV4cCI6MjAxOTg5Mjc1M30.ycxKa_Y5KKbCwUIrPAGFUPAtLQbASFSGyTW4TLm2I1k";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
