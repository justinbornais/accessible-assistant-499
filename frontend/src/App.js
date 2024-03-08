import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat';
import Chats from './pages/Chats';
import AccesibilityMenu from './components/AccesibilityMenu';

function App() {
  return (
    <Router>
      <AccesibilityMenu />
      <div className='site-content pt-0 p-3'>
        <Routes>
          <Route path='/chats' element={<Chats />} />
          <Route path='/chats/:id' element={<Chat />} />
          <Route exact path='/' element={<Chats />} />
        </Routes>

      </div> 
    </Router>
  );
}

export default App;
