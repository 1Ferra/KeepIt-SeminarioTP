import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import NavBar from './components/NavBar';
import DocumentExplorer from './pages/document-explorer/Document-explorer';
import SignUp from './pages/signup/SignUp';
import Landing from './pages/landing/Landing';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login'></Route>
        <Route path='/'></Route>
        <Route path='/signup'></Route>
        <Route path='*' element={<NavBar/>}></Route>
      </Routes>
      <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/documents" element={<DocumentExplorer/>}></Route>
        <Route path="/profile" element={<></>}></Route>
      </Routes>
    </div>
  );
}

export default App;
