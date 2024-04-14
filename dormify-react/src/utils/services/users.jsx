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
async function getUserDorm(user_session){
    let {id} = user_session;
    let role = await getUserRole(user_session);
    let drm_id;
    if(role === "resident")
    {
        let {error,data} = await supabase.from('resident').select('dorm_id').eq('user_id', id);
        drm_id = data[0].dorm_id;
    }
    else if(role === "dormowner")
    {
        let dormowner_query = await supabase.from('dormowner').select('id').eq('user_id', id);
        console.log(dormowner_query);
        let dormowner_id = dormowner_query.data[0].id;
        let {error,data} = await supabase.from('dorm').select('*').eq('dormowner_id', dormowner_id);
        if(error)
            console.log(error.message);
        console.log(data);
        if(data.length != 0)
            drm_id = data[0].id;
    }
    return drm_id;
}
async function getUserRoomNumber(userId) {
    if (!userId) {
      console.error('Invalid or missing userId');
      return null;
    }
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('room_num')
        .eq('id', userId)
        .single();  
    
      if (error) {
        console.error('Error fetching room number:', error.message);
        return null;
      }
    
      return data ? data.room_num : null;
    } catch (error) {
      console.error('Exception fetching room number:', error.message);
      return null;
    }
  }
  
  
async function getUserProfileInformation(user_session)
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
async function getUserRole(user_session) {
    if (!user_session || !user_session.id) {
        console.error("Invalid user session data", user_session);
        return null;
    }

    let { id } = user_session;
    try {
        const { data, error } = await supabase.from('roles').select('*').eq('user_id', id);

        if (error) {
            console.error('Error fetching user role:', error.message);
            return null;
        }

        if (!data || data.length === 0) {
            console.log('No roles found for user:', id);
            return null;
        }

        if (data[0].dormowner_id) {
            return "dormowner";
        } else if (data[0].resident_id) {
            return "resident";
        } else if (data[0].staff_id) {
            return "staff";
        }

        return null;  
    } catch (error) {
        console.error('Exception fetching user role:', error.message);
        return null;
    }
}

async function createDorm(name_, email_, location_, room_num_, user_session){
    let {id} = user_session;
    let dormowner_query = await supabase.from('dormowner').select('id').eq('user_id',id);
    console.log(dormowner_query);
    let dorm_id = await supabase.from('sequence').select('*').eq('table_name',"dorm");
    let {error} = await supabase.from('dorm').insert({id: dorm_id.data[0].value, name:name_, email:email_, location:location_, rooms:room_num_, dormowner_id: dormowner_query.data[0].id});
    if(error)
    {
        console.log("something went wrong inserting a dorm: " + error.message);
        return error;
    }
    dorm_id +=1;
    let error_sequence = await supabase.from('sequence').update({valye: dorm_id}).eq('table_name', "dorm");
}
async function joinDorm(session, dorm_id_)
{
    let {id} = session;
    let resident_query = await supabase.from('resident').select('*').eq('user_id',id);
    let resident_id = resident_query.data[0].id;
    let {error} = await supabase.from('resident').update({dorm_id: dorm_id_}).eq('id', resident_id);
    return error;
}

export{createUser, getUserProfileInformation, registerUserRole, getUserRole, getUserDorm, getUserRoomNumber, createDorm, joinDorm};
