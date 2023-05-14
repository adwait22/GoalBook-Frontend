import Home from './components/HomePage/Home';
import LoginPage from './components/LoginPage/LoginPage';
// import NavBar from './components/NavBar/NavBar';
// import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      {/* <LoginPage /> */}
      {
        (localStorage.getItem('users') == undefined || localStorage.getItem('users') == null || localStorage.getItem('users') == {}) ? 
        <LoginPage /> : <Home />
      }   
    </div>
  );
}

export default App;
