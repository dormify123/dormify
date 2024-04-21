import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey,{
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    }
});
async function getSession(){
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Something went wrong retrieving the session: " + error.message);
  }
  else{
    return data;
  }
}
export {supabase, getSession};
