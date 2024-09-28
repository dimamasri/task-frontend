import './App.css';
import Chat from './components/Chat';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import GenrePage from './pages/GenrePage';
import ArtistsPage from './pages/ArtistsPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col justify-between h-screen bg-black text-white p-5">
         {/*<nav className="mb-4">
          <Link to="/genre" className="mx-3 text-blue-400 hover:text-blue-300">Genre Picker</Link>
          <Link to="/artists" className="mx-3 text-blue-400 hover:text-blue-300">Artists</Link>
          <Link to="/chat" className="mx-3 text-blue-400 hover:text-blue-300">Chat</Link>
        </nav> */}
        <Routes>
          <Route path="/genre" element={<GenrePage />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
