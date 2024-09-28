// src/components/GenrePicker.js
import React from 'react';

const genres = [
    'Rock', 'Pop'
];

const GenrePicker = () => {
    return (
        <div className="flex flex-col items-center mt-4">
            <h2 className="text-2xl font-semibold text-white">Pick your genre</h2>
            <div className="flex flex-wrap justify-center mt-4">
                {genres.map((genre, index) => (
                    <button 
                        key={index} 
                        className="m-2 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition duration-300"
                    >
                        {genre}
                    </button>
                ))}
            </div>
        </div>
    );
};
export default GenrePicker;
