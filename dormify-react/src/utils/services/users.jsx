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
async function createDorm(user_session, rooms, location, email)
{
    
}
async function getUserInformation(user_session)
{
    let {id} = user_session;
    console.log(id);
    return await supabase.from("users").select('*').eq('id', id); 
}
async function registerUserRole(user_session, role)
{
    let {id} = user_session;
    let existing_role = await getUserRole(user_session);
    let error_table;
    let error_roles;
    let sequence_error;
    console.log(existing_role);
    if(!existing_role){
        if(role === "resident"){
            let {error,data} = await supabase.from('sequence').select('value').eq('table_name','resident');
            let res_id = data[0].value;
            error_table = await supabase.from('resident').insert({id: res_id,dorm_id:null, room_num:null,user_id:id});
            error_roles = await supabase.from('roles').insert({user_id:id, resident_id:res_id});
            res_id +=1
            sequence_error = await supabase.from('sequence').update({value: res_id}).eq('table_name', 'resident');
        }
        else if(role === "staff")
        {
            let {error,data} = await supabase.from('sequence').select('value').eq('table_name','staff');
            let stff_id = data[0].value;
            error_table = await supabase.from('staff').insert({id: stff_id,user_id:id});
            error_roles = await supabase.from('roles').insert({user_id:id, staff_id:stff_id});
            stff_id +=1
            sequence_error = await supabase.from('sequence').update({value: stff_id}).eq('table_name', 'staff');
        }
        else if(role === "dormowner")
        {
            let {error,data} = await supabase.from('sequence').select('value').eq('table_name','dormowner');
            let drmowner_id = data[0].value;
            error_table = await supabase.from('dormowner').insert({id: drmowner_id,user_id:id});
            error_roles = await supabase.from('roles').insert({user_id:id, dormowner_id:drmowner_id});
            drmowner_id +=1
            sequence_error = await supabase.from('sequence').update({value: drmowner_id}).eq('table_name', 'dormowner'); 
        }
    }
    else{
        return {message:"User already has a role"};
    }

    return {error_table, error_roles, sequence_error};
}
async function getUserRole(user_session)
{
    let {id} = user_session;
    let {error,data} = await supabase.from('roles').select('*').eq('user_id', id);
    if(data.length === 0)
        return null;
    if(data[0].dormowner_id)
        return "dormowner";
    else if(data[0].resident_id)
        return "resident";
    else if(data[0].staff_id)
        return "staff";
}

export{createUser, getUserInformation, registerUserRole, getUserRole};
