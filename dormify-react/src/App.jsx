import './App.css';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Header from './modules/header/header'
import Home from './pages/home/home';
import Profile from './pages/profile/profile';
import Footer from './modules/footer/footer';
import { BrowserRouter, Routes, Route} from "react-router-dom";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Header/>
          <Routes>
            <Route path ="/" element ={<Home/>}></Route>
            <Route path ="login" element ={<Login/>}></Route>
            <Route path ="signup" element = {<Signup/>}></Route>
            <Route path ="profile" element = {<Profile/>}></Route>
          </Routes>
          <Footer/>
        </BrowserRouter>
    </div>
  );
}

export default App;
