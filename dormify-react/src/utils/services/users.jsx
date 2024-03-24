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
    return error;
};
async function getUserInformation(user_session)
{
    let {id} = user_session;
    console.log(id);
    return await supabase.from("users").select('*').eq('id', id); 
}
async function registerUserRole(user_session, role)
{
    let {id} = user_session;
    let error_resident;
    let error_roles;
    let sequence_error;
    if(role === "resident"){
        let {error,data} = await supabase.from('sequence').select('value').eq('table_name','resident');
        let res_id = data[0].value;
        error_resident = await supabase.from('resident').insert({id: res_id,dorm_id:null, room_num:null,user_id:id});
        error_roles = await supabase.from('roles').insert({user_id:id, resident_id:res_id});
        res_id +=1
        sequence_error = await supabase.from('sequence').update({value: res_id}).eq('table_name', 'resident');
        
    }
    return {error_resident, error_roles, sequence_error};
}


export{createUser, getUserInformation, registerUserRole};
