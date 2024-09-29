import React from 'react';
import Chat from '../components/Chat';
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';

const ChatPage = () => {
    const location = useLocation();
    const { artist } = location.state || {};
    return (
        <div>
            <Header artist={artist} type="chat" />
            <Chat />
        </div>
    );
};

export default ChatPage;