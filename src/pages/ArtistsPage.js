import React from 'react';
import ArtistsPicker from '../components/ArtistsPicker';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';

const ArtistsPage = () => {
    const location = useLocation();
    const { genre } = location.state || {};
    return (
        <div>
            <Header genre={genre} type="artists" />
            <ArtistsPicker genre={genre} />
        </div>
    );
};

export default ArtistsPage;