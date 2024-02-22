function loadWrapperFunctions(supabase)
{
    console.log(supabase);
    const _supabase = supabase.createClient("https://ieioqboeihxduwuipmim.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllaW9xYm9laWh4ZHV3dWlwbWltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg0MzA1MTAsImV4cCI6MjAyNDAwNjUxMH0.VLnvpD2Ejft5ZeUtZODHZJkcsI7JbwNK_zv24iazbbk");
    console.log(_supabase);
    async function getUsers()
    {
        const {data,error} = await _supabase.from('users').select();
        console.log(data);
    }
    getUsers();
}