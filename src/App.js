import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GenrePage from './pages/GenrePage';
import ArtistsPage from './pages/ArtistsPage';
import ChatPage from './pages/ChatPage';
import { useEffect } from 'react';
import { getUserId } from './utils/user';

function App() {
  
  useEffect(() => {
    getUserId();
  }, []);

  return (
    <Router>
      <div className="bg-black">
        <Routes>
          <Route path="/" element={<GenrePage />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
