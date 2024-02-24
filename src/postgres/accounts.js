function loadWrapperFunctions(supabase)
{
    console.log(supabase);
    const _supabase = supabase.createClient("https://ieioqboeihxduwuipmim.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllaW9xYm9laWh4ZHV3dWlwbWltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg0MzA1MTAsImV4cCI6MjAyNDAwNjUxMH0.VLnvpD2Ejft5ZeUtZODHZJkcsI7JbwNK_zv24iazbbk",{
        auth: {
          autoRefreshToken: false,
          persistSession: false,
          detectSessionInUrl: false
        }
      });
    console.log(_supabase);
    async function getUsers()
    {
        const {data,error} = await _supabase.from('users').select(`name,lastname`);
        if(error != null)
            console.log("error fetching data: " + error.message);
        else 
        {
            return data;
        }
        
    }
    async function userSignUp()
    {
        const {mail, password} = {mail: document.getElementById("user_email").value, password: document.getElementById("user_password").value};
        console.log(mail + " " + password);
       await _supabase.auth.signUp({
        email: mail,
        password: password
       });
    }
    async function userLogIn(){
        const {mail, password} = {mail: document.getElementById("user_email").value, password: document.getElementById("user_password").value};
        const { data, error } = await _supabase.auth.signInWithPassword({
            email: mail,
            password: password,
          })
        console.log(data);
        console.log(error);
    }
    const { data } = _supabase.auth.onAuthStateChange((event, session) => {
        console.log(event, session)
    
        if (event === 'INITIAL_SESSION') {
        // handle initial session
        } else if (event === 'SIGNED_IN') {
        // handle sign in event
        } else if (event === 'SIGNED_OUT') {
        // handle sign out event
        } else if (event === 'PASSWORD_RECOVERY') {
        // handle password recovery event
        } else if (event === 'TOKEN_REFRESHED') {
        // handle token refreshed event
        } else if (event === 'USER_UPDATED') {
        // handle user updated event
        }
    })
  
  // call unsubscribe to remove the callback
  data.subscription.unsubscribe()
    getUsers().then(users => console.log(users));

    return {getUsers, userSignUp, userLogIn};

}