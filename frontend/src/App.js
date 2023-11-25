import './App.css';
import './index.css'
import Footer from './components/Footer'
import NavBar from './components/NavBar'

function App() {
  return (
    <>
      <NavBar />
      <div className='site-content'>
        <h1>Academic Assistant</h1>
      </div>
      <Footer />
    </>
  );
}

export default App;
