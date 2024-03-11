import { supabase } from '../supabase';

async function createUser(user_session, first_name, last_name, room_number){
    console.log("room number is: ");
    console.log(room_number);
    let {id, email} = user_session;
    console.log(id + " " + email +" " + first_name + " " + last_name);
    const {error} = await supabase.from('users').insert({id:id, email:email, first_name:first_name, last_name:last_name, room_num:room_number});
    console.log(error);
    if(error)
        console.log("something went wrong inserting a user: " + error.message);
};
async function getUserInformation(user_session)
{
    let {id} = user_session;
    console.log(id);
    return await supabase.from("users").select('*').eq('id', id); 
}


export{createUser, getUserInformation};
