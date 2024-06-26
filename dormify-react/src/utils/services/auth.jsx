import { supabase } from '../supabase';
import {createUser} from './users'
import {useNavigate} from 'react-router-dom'
async function userSignUp(_email, _password, first_name, last_name, room_number) {
    const {data, error} = await supabase.auth.signUp({
        email: _email,
        password: _password
    });
    if(!error){
        console.log("Sign up succesful");
        const {data,error} = await supabase.auth.getSession();
        if(!error){
            const {session} = data;
            const {user} = session;
            createUser(user, first_name, last_name, room_number);
        }
        return null;
    }
    else 
    {
        console.log("Sign up failed: " + error.message);
        return error;
    } 
};
async function userLogin(_email, _password) {
    const {data, error} = await supabase.auth.signInWithPassword({
        email: _email,
        password: _password
    });
    if(!error){
        console.log("Sign in succesful");
        console.log(await supabase.auth.getSession());
        return null;
    }
    else 
    {
        console.log("Sign in failed: " + error.message);
        return error;
    }
};
async function userSignOut(){
    const {error} = await supabase.auth.signOut();
    if(!error){
        console.log("Sign out succesful");
    }
    else 
    {
        console.log("sign out failed: " + error.message);
        return error;
    }
}
async function resetPassword(email) {
    console.log(email);

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://dormify-dormify123s-projects.vercel.app',
    })
    if(!error){
        console.log("Reset password succesful");
        return null;
    }
    else {
        throw error;
    }
}
async function updateUserPassword(email_,password_){
    
const { data, error } = await supabase.auth.updateUser({ email: email_,
    password: password_
  })
}
export {userSignUp, userLogin, userSignOut, resetPassword, updateUserPassword};