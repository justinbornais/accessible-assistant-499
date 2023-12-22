import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Chats from './pages/Chats';
import AccesibilityMenu from './components/AccesibilityMenu';

function App() {
  return (
    <Router>
      <NavBar />  
      <div className='site-content p-3 p-lg-4'>
      <AccesibilityMenu />
        <Routes>
          <Route path='/chats' element={<Chats />} />
          <Route path='/chats/:id' element={<Chat />} />
          <Route exact path='/' element={<Home />} />
        </Routes>

      </div> 
      <Footer />
    </Router>
  );
}

export default App;
