import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GenrePicker = () => {
    const [genres, setGenres] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/spotify/genres');
                setGenres(response.data.genres);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };

        fetchGenres();
    }, []);

    const handleGenreClick = (genre) => {
        navigate('/artists', { state: { genre } });
    };

    return (
        <div className="flex items-center justify-center min-h-screen container">
            <div className="bg-customGray max-w-[800px] w-full rounded-md mt-10">
                <div className="flex flex-col items-center mt-4">
                    <h2 className="text-2xl font-semibold text-white">Pick your genre</h2>
                    <div className="flex flex-wrap justify-center mt-5">
                        {genres.map((genre, index) => (
                            <button
                                key={index}
                                className="font-bold m-2 px-4 py-2 bg-darkBlue text-lightBlue border border-lightBlue rounded-lg hover:bg-lightBlue hover:text-darkBlue transition duration-300 capitalize"
                                onClick={() => handleGenreClick(genre)}
                            >
                                {genre}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default GenrePicker;
