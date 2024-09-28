import React from 'react';
import ArtistsPicker from '../components/ArtistsPicker';

const ArtistsPage = () => {
    return (
        <div className="flex flex-col items-center mt-4">
            <ArtistsPicker />
        </div>
    );
};

export default ArtistsPage;