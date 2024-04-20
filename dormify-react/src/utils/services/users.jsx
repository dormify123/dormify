import { supabase } from '../supabase';
import {Buffer} from 'buffer';

async function createUser(user_session, first_name, last_name, location){
    let {id, email} = user_session;
    console.log(id + " " + email +" " + first_name + " " + last_name);
    const {error: userError} = await supabase.from('users').insert({id:id, email:email, full_name: first_name + " " + last_name, location:location});
    const {error: profilePictureError} = await supabase.from('profile_pic').insert({user_id:id});
    return (userError, profilePictureError);
};
async function getUserDorm(user_session){
    let {id} = user_session;
    let role = await getUserRole(user_session);
    let drm_name;
    if(role === "resident")
    {
        let {error,data} = await supabase.from('resident').select('*').eq('user_id', id);
        if(error)
            console.log(error.message)
        else 
            return data[0];
    }
    else if(role === "dormowner")
    {
        let dormowner_query = await supabase.from('dormowner').select('id').eq('user_id', id);
        console.log(dormowner_query);
        let dormowner_id = dormowner_query.data[0].id;
        let {error,data} = await supabase.from('dorm').select('dorm_name').eq('dormowner_id', dormowner_id);
        if(error)
            console.log(error.message);
        else 
            return data[0];
    }
}
async function getUserRoomNumber(user) {
    let {id} = user;
    let {data,error} = await supabase.from('resident').select('room_num').eq('user_id', id);
    return data[0];
  }
  
  
async function getUserProfileInformation(user_session)
{
    let {id} = user_session;
    console.log(id);
    let {error, data}  = await supabase.from('users').select('*').eq('id', id);
    console.log("CHECK HERE: ");
    console.log(data[0]);
    if(error)
        console.log("unexecpted error: " + error.message);
    else 
        return data[0];
}
async function registerUserRole(user_session, role)
{
    let {id} = user_session;
    let existing_role = await getUserRole(user_session);
    console.log(existing_role);
    let error_table;
    let error_roles;
    let sequence_error;
    console.log(existing_role);
    if(!existing_role){
        if(role === "resident"){
            let {error,data} = await supabase.from('sequence').select('value').eq('table_name','resident');
            let res_id = data[0].value;
            error_table = await supabase.from('resident').insert({id: res_id,dorm_name:null, room_num:null,user_id:id});
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
    if(error)
    {
        console.log(error.message);
        return;
    }
    if(data.length === 0)
        return null;
    if(data[0].dormowner_id)
        return "dormowner";
    else if(data[0].resident_id)
        return "resident";
    else if(data[0].staff_id)
        return "staff";
}

async function createDorm(name_, email_, location_, room_num_, user_session){
    let {id} = user_session;
    let {data: dormOwnerQuery, error: dormOwnerError} = await supabase.from('dormowner').select('*').eq('user_id',id);
    if(dormOwnerError)
        console.log(dormOwnerError);
    let {error: dormError} = await supabase.from('dorm').insert({dorm_name:name_, email:email_, location:location_, rooms:room_num_, dormowner_id: dormOwnerQuery[0].id});
    if(dormError)
    {
        console.log("something went wrong inserting a dorm: " + dormError.message);
        return dormError;
    }
    let {data: sequenceQuery, error: sequenceError} = await supabase.from('sequence').select('value').eq('table_name', "calendar");
    let calendar_id = sequenceQuery[0].value;
    const dataToInsert = [{id: calendar_id, name:"laundry", dorm_name:name_}, {id:calendar_id +1, name:"cleaning", dorm_name:name_}];
    let {error: calendarError} = await supabase.from('calendar').insert(dataToInsert);
    if(calendarError)
        console.log(calendarError.message);
}
async function joinDorm(session, dorm_name)
{
    let {id} = session;
    let resident_query = await supabase.from('resident').select('*').eq('user_id',id);
    let resident_id = resident_query.data[0].id;
    let {error} = await supabase.from('resident').update({dorm_name: dorm_name}).eq('id', resident_id);
    return error;
}
async function changeUserInformation(session, full_name, email, location, image)
{
    const bufferData = Buffer.from(image.split(',')[1], 'base64');
    const hexData = bufferData.toString('hex');
    const byteaData = '\\x' + hexData;
    let {id} = session;
    let {error: userError} = await supabase.from('users').update({full_name: full_name, email: email, location: location}).eq('id', id);
    let {error: picError} = await supabase.from('profile_pic').update({image_data: byteaData}).eq('user_id', id);
    return {userError, picError};
}
async function getUserProfilePicture(session){
    console.log(session);
    let {id} = session;
    let {error,data} = await supabase.from('profile_pic').select('image_data').eq('user_id', id);
    if(error)
        console.log(error);
    else if(data.length > 0) 
        return data[0].image_data;
}
async function leaveDorm(session){
    let user_role = await getUserRole(session);
    let user_dorm = await getUserDorm(session);
    let {id} = session;
    if(user_role === "resident")
    {
        console.log(await supabase.from('resident').update({dorm_name: null}).eq('user_id', id));
    }
    else{
        let {data: calendarQuery, error: calendarError} = await supabase.from('calendar').select('id').eq('dorm_name', user_dorm);
        if(calendarError)
            console.log(calendarError);
        console.log(calendarQuery);
        let calendar_id = calendarQuery[0].id;
        console.log(await supabase.from('slots').delete().eq('calendar_id', calendar_id));
        console.log(await supabase.from('calendar').delete().eq('id',calendar_id));
    }

}
async function getResidents(session)
{
    if(await getUserRole(session) === "dormowner")
    {
        let {id} = session;
        let {data: dormOwnerQuery, error: errorDormOwner} = await supabase.from('roles').select('dormowner_id').eq('user_id',id);
        let {data: dormQuery, error: errorDorm} = await supabase.from('dorm').select('dorm_name').eq('dormowner_id', dormOwnerQuery[0].dormowner_id);
        const { data, error } = await supabase.from('resident').select(`users (id,full_name)`).eq("dorm_name", dormQuery[0].dorm_name);
        if(error)
            console.log(error.message);
        return data;
    }
}
async function getResident(uuid)
{
    console.log("UUID IS: " + uuid);
    let{data,error} = await supabase.from('resident').select('*').eq('user_id',uuid);
    if(error)
        console.log(error.message);
    return data[0];
}
async function checkinLateUser(session, date_){
    let {id} = session;
    let{data, error : errorSequence1} = await supabase.from('sequence').select('value').eq('table_name', 'late_checkins');
    let {data: dormData, error: dormError} = await supabase.from('resident').select('dorm_name').eq('user_id', id);
    let dorm_name = dormData[0].dorm_name;
    let {error: errorLateCheckins} = await supabase.from('late_checkins').insert({user_id: id, date:toLocaleISOString(date_), id: data[0].value, dorm_name: dorm_name});
    if(errorSequence1)
        console.log(errorSequence1.message);
    if(errorLateCheckins)
        console.log(errorLateCheckins.message);
    let {error: errorSequence2} = await supabase.from('sequence').update({value:data[0].value + 1}).eq('table_name', 'late_checkins');
    if(errorSequence2)
        console.log(errorSequence2.message)
}
function toLocaleISOString(date) {
    function pad(n) { return ("0"+n).substr(-2); }

    var day = [date.getFullYear(), pad(date.getMonth()+1), pad(date.getDate())].join("-"),
        time = [date.getHours(), date.getMinutes(), date.getSeconds()].map(pad).join(":");
    if (date.getMilliseconds())
        time += "."+date.getMilliseconds();
    var o = date.getTimezoneOffset(),
        h = Math.floor(Math.abs(o)/60),
        m = Math.abs(o) % 60,
        o = o==0 ? "Z" : (o<0 ? "+" : "-") + pad(h) + ":" + pad(m);
    return day+"T"+time+o;
}
async function assignRoom(user, room_num_)
{
    let {user_id} = user;
    let {error} = await supabase.from('resident').update({room_num:room_num_}).eq('user_id',user_id);
    return error;
}
async function getCheckins(session)
{
    let {id} = session;
    let { data: dormQuery, error: dormError } = await supabase.from('dormowner').select('dorm (dorm_name)').eq('user_id', id)
    let dorm_name = dormQuery[0].dorm[0].dorm_name;
    let {data: checkinsQuery, error: checkinsError} = await supabase.from('late_checkins').select('users (full_name), date').eq('dorm_name', dorm_name).order('date',{ascending:false});
    let returnArray = new Array(dormQuery.length);
    for (let i = 0; i < checkinsQuery.length; i++) {
        let name = checkinsQuery[i].users.full_name;
        let date = new Date(checkinsQuery[i].date);
        let formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:00`;
        returnArray[i] = { name, date:formattedDate };
    }
    return returnArray;
}
async function kickUser(user)
{
    let {user_id} = user;
    let {error} = await supabase.from('resident').update({'dorm_name': null, room_num: null}).eq('user_id', user_id);
    return error;
}
async function reserveSlot(session, event, type){
    let {id} = session;
    let {data: dormQuery, error:dormError} = await supabase.from('resident').select('dorm_name').eq('user_id', id);
    let dorm_name = dormQuery[0].dorm_name;
    let {data: calendarQuery, error: calendarError} = await supabase.from('calendar').select('id').eq('dorm_name', dorm_name).eq('name',type);
    let calendar_id = calendarQuery[0].id;
    let start_time = event.start;
    let end_time = new Date(event.end);
    let {data: slotsQuery, error: slotsError} = await supabase.from('slots').insert({calendar_id: calendar_id, start_time:start_time, end_time:toLocaleISOString(end_time), user_id: event.user_id});
    return {dormError, calendarError, slotsError};
}
async function getSlots(session, type)
{
    let {id} = session;
    let {data:residentQuery, error:residentError} = await supabase.from('resident').select('dorm_name').eq('user_id',id);
    let dorm_name = residentQuery[0].dorm_name;
    let {data: calendarQuery, error: calendarError} = await supabase.from('calendar').select('*').eq('name', type).eq('dorm_name', dorm_name);
    let calendar_id = calendarQuery[0].id;
    let {data: slotsQuery, error: slotsError} =  await supabase.from('slots').select('*').eq('calendar_id', calendar_id);
    let return_array = new Array(slotsQuery.length);
    for(let i = 0; i < slotsQuery.length;i++){
        let end_time = new Date(slotsQuery[i].end_time);
        return_array[i]={
            id: slotsQuery[i].id,
            user_id: slotsQuery[i].user_id,
            title: "Reserved",
            start: slotsQuery[i].start_time,
            end: end_time.getTime(),
            selectInfo : null 
        }
    }
    console.log(return_array[0]);
    return return_array;
}
async function removeSlot(event, type, session)
{
    console.log(event);
    let {id} = session;
    let {data: dormQuery, error:dormError} = await supabase.from('resident').select('dorm_name').eq('user_id', id);
    let dorm_name = dormQuery[0].dorm_name;
    let {data: calendarQuery, error: calendarError} = await supabase.from('calendar').select('id').eq('dorm_name', dorm_name).eq('name',type);
    let calendar_id = calendarQuery[0].id;
    let {error: deletionError} = await supabase.from('slots').delete().eq('user_id', event.extendedProps.user_id).eq('calendar_id', calendar_id).eq('id',event.id);
    return {dormError, calendarError, deletionError};
}
async function slotIsForUser(event, session)
{
    let {id} = session;
    console.log(event);
    console.log(id);
    if(event.extendedProps.user_id === id)
        return true;
    else 
        return false;
}
export{createUser, getUserProfileInformation, registerUserRole, getUserRole, getUserDorm, createDorm, joinDorm, changeUserInformation, getUserProfilePicture, leaveDorm , getUserRoomNumber, getResidents, checkinLateUser,
getCheckins, getResident, assignRoom, kickUser, reserveSlot, getSlots, removeSlot, slotIsForUser};
