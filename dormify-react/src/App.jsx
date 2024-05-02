import './App.css';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Header from './modules/header/header'
import Home from './pages/home/home';
import Profile from './pages/profile/profile';
import Services from './pages/services/services';
import LaundrySchedule from './pages/laundry/laundry';
import CleaningSchedule from './pages/cleaning/cleaning';
import CheckIn from './pages/checkIn/checkIn';
import About from './pages/about/about';
import ContactUs from './pages/contactus/contactus';
import Footer from './modules/footer/footer';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import {useState, useEffect} from 'react';
import {supabase} from './utils/supabase';
import ForgotPassword from './pages/forgotPassword/forgotPassword';


function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, []);
  return (
    <div className="App">
        <BrowserRouter>
        <Header session = {session}/>
          <Routes>
            <Route path ="/" element ={<Home session = {session}/>}></Route>
            <Route path ="login" element ={<Login/>}></Route>
            <Route path ="signup" element = {<Signup/>}></Route>
            <Route path ="profile" element = {<Profile session={session}/>}></Route>
            <Route path ="services" element = {<Services session = {session}></Services>}></Route>
            <Route path ="laundry" element = {<LaundrySchedule session = {session}/>}></Route>
            <Route path ="cleaning" element = {<CleaningSchedule session ={session}/>}></Route>
            <Route path ="checkIn" element = {<CheckIn session={session}/>}></Route>
            <Route path ="about" element = {<About/>}></Route>
            <Route path ="contact" element = {<ContactUs/>}></Route>

          </Routes>
          <Footer/>
        </BrowserRouter>
    </div>
  );
}

export default App;
