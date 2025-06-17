import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import NavBar from './components/NavBar';
import DocumentExplorer from './pages/document-explorer/Document-explorer';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login'></Route>
        <Route path='*' element={<NavBar/>}></Route>
      </Routes>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/documents" element={<DocumentExplorer/>}></Route>
        <Route path="/profile" element={<></>}></Route>
      </Routes>
    </div>
  );
}

export default App;
