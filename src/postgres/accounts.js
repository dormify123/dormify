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
    function retrieveSession(){
      var data = getSessionFromCookie("sessionCookie");
      console.log(data);
      updateSessionUI(data);
    }
    function getSessionFromCookie(sessionName) {
      const cookieString = document.cookie;
      const cookieArray = cookieString.split('; ');
      console.log(cookieString);
      console.log(cookieArray);
  
      for (const cookie of cookieArray) {
          const [name, value] = cookie.split('=');
          if (name === sessionName) {
              return JSON.parse(decodeURIComponent(value));
          }
      }
      return null;
    }
    function clearAllCookies() {
      const cookies = document.cookie.split("; ");
    
      for (const cookie of cookies) {
        const [name] = cookie.split("=");
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    }    
    retrieveSession();
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
    const { data } = _supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session)
  
      if (event === 'INITIAL_SESSION') {
      // handle initial session
      } else if (event === 'SIGNED_IN') {
        console.log("logged in event!");
        updateSessionUI(session);
      } else if (event === 'SIGNED_OUT') {
      // handle sign out event
      } else if (event === 'PASSWORD_RECOVERY') {
      // handle password recovery event
      } else if (event === 'TOKEN_REFRESHED') {
      // handle token refreshed event
      } else if (event === 'USER_UPDATED') {
      // handle user updated event
      }
    });
    function updateSessionUI(session)
    {
      var status = document.createElement("text");
      console.log(session);
      if(session != null)
      {
        status.textContent = "Currently logged in as: " + session.user.email;
        var logout_anchor = document.createElement("button");
        logout_anchor.textContent = "SIGN OUT";
        logout_anchor.className = "button_href";
        logout_anchor.addEventListener("click", function(event)
        {
          userSignOut();
        });
        logout_anchor.addEventListener("mouseover", function (event) {
          logout_anchor.style.textDecoration ="underline";
        });
        logout_anchor.addEventListener("mouseout", function (event){
          logout_anchor.style.textDecoration = "none";
        });
        document.getElementById("header").innerHTML = "";
        document.getElementById("header").appendChild(status);
        document.getElementById("header").appendChild(logout_anchor);
      }
      else {
        status.textContent = "Currently not logged in";
        document.getElementById("header").innerHTML = "";
        document.getElementById("header").appendChild(status);
      }
    }
    function setSessionCookie(sessionName, sessionValue, daysToExpire)
    {
      const date = new Date();
      date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
      const expires = "expires=" + date.toUTCString();
      const cookieString = `${sessionName}=${sessionValue};${expires};path=/`;
      document.cookie = cookieString;
      console.log(document.cookie);
    }
    function removeCookie(cookieName)
    {
      const cookie_string = document.cookie;
      const cookie_array = cookie_string.split("; ");
      for(const cookie of cookie_array)
      {
        const [name, value] = cookie.split('=');
        if(name == cookieName)
        {
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          console.log("Cookie " + cookieName + " removed!");
          return;
        }
      }
      console.log("Cookie not found");
    }
    async function userSignUp()
    {
        const {user_name,mail,password} = {user_name: document.getElementById("user_name").value, mail: document.getElementById("user_email").value, password: document.getElementById("user_password").value};
        console.log(mail + " " + password);
       const {data,error} = await _supabase.auth.signUp({
        email: mail,
        password: password
       });
       if(error == null)
       {
        setSessionCookie("sessionCookie",JSON.stringify(data),1);
        console.log(data);
        console.log("name is: "  + user_name);
        window.location.href = "../pages/login-page.html";
       }
       else 
       {
        console.log("Something went wrong: " + error.message);
       }
       const {db_error} = await createUser(data.user.id,user_name,"",mail);
       console.log(db_error);
       
    }
    async function userSignOut()
    {
      const { error } = await _supabase.auth.signOut();
      removeCookie("sessionCookie");
      retrieveSession();
    }
    async function userLogIn(){
        const {mail, password} = {mail: document.getElementById("user_email").value, password: document.getElementById("user_password").value};
        const { data, error } = await _supabase.auth.signInWithPassword({
            email: mail,
            password: password,
          })
          if(error == null)
          {
            console.log(data);
            setSessionCookie("sessionCookie",JSON.stringify(data),1);
          }
          else 
          {
            document.getElementById("loginError").textContent = error.message;
          }
    }
    async function createUser(_id,_name,_lastName, _email)
    {
        const {error} = await _supabase.from('users').insert({id:_id, name: _name, lastname: _lastName, email: _email});
        console.log(error);
        if(error == null)
        {
          console.log("user created succesfully");
          return error;
        }
        else
        {
          console.log("Error: " + error.message);
          return error;
        } 
    }
    return {getUsers, userSignUp, userLogIn};
}