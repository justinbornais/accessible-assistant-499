import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat';
import Chats from './pages/Chats';
import Tutorial from './components/Tutorial';
import AccesibilityMenu from './components/AccesibilityMenu';

function App() {

  const chatList = JSON.parse(window.localStorage.getItem('chats')) || [];
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
      {chatList.length === 0 && <Tutorial />}
    </Router>
  );
}

export default App;
