import { supabase } from '../supabase';
import {createUser} from './users'
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
    try {
        // Send a verification email for password recovery
        const { error: sendEmailError } = await supabase.auth.api.sendPasswordRecoveryEmail(email);

        if (sendEmailError) {
            throw new Error('Failed to send password recovery email');
        }

        return true; // Indicate successful password recovery email sent
    } catch (error) {
        console.error("Password reset failed:", error.message);
        throw error;
    }
}
export {userSignUp, userLogin, userSignOut, resetPassword};