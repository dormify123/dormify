import { supabase } from '../supabase';

async function userSignUp(_email, _password) {
    const {data, error} = await supabase.auth.signUp({
        email: _email,
        password: _password
    });
    if(!error){
        console.log("Sign up succesful");
        console.log(await supabase.auth.getSession());
    }
    else 
        console.log("Sign up failed: " + error.message); 
};
async function userLogin(_email, _password) {
    const {data, error} = await supabase.auth.signInWithPassword({
        email: _email,
        password: _password
    });
    if(!error){
        console.log("Sign in succesful");
        console.log(await supabase.auth.getSession());
    }
    else 
        console.log("Sign in failed: " + error.message);
};
export {userSignUp, userLogin};