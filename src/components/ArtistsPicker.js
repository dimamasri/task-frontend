import React from 'react';

const artists = [
    { id: 1, name: 'test 1', img: '#' },
    { id: 2, name: 'test 2', img: '#' },
];

const ArtistsPicker = () => {
    return (
        <div className="grid grid-cols-3 gap-4 mt-4">
            {artists.map((artist) => (
                <div key={artist.id} className="text-center text-white">
                    <img 
                        src={artist.img} 
                        alt={artist.name} 
                        className="w-full h-32 object-artist rounded-lg shadow-lg" 
                    />
                    <p className="mt-2">{artist.name}</p>
                </div>
            ))}
        </div>
    );
};

export default ArtistsPicker;