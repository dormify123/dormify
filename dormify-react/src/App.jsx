import './App.css';
import Login from './pages/login/login';
import Header from './modules/header/header'
import Home from './pages/home/home';

function App() {
  return (
    <div className="App">
        <Header/>
        <Home/>
    </div>
  );
}

export default App;
