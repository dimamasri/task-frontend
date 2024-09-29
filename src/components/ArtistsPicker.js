import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ArtistsPicker = ({ genre }) => {
    const navigate = useNavigate();
    const [artists, setArtists] = useState([]);

    const handleArtistClick = (artist) => {
        navigate('/chat', { state: { artist } });
    };

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await axios.post('/api/spotify/artists', { genre });
                setArtists(response.data);
            } catch (error) {
                console.error("Error fetching artists:", error.response ? error.response.data : error.message);
            }
        };

        if (genre) {
            fetchArtists();
        }
    }, [genre]);

    return (
        <div className="container">
            <div className="grid grid-cols-5 gap-4">
                {Array.isArray(artists) && artists.length > 0 ? (
                    artists.map((artist) => (
                        <div onClick={() => handleArtistClick(artist)}
                            key={artist.id}
                            className="cursor-pointer bg-customGray rounded-lg p-4 relative text-white mt-5">
                            <img
                                src={artist.images[0].url}
                                alt={artist.name}
                                className="w-full h-48 object-cover rounded-lg mb-2"
                            />
                            <h3 className="text-lg font-semibold">{artist.name}</h3>
                            <p className="text-sm text-lightGray font-bold">{formatFollowersCount(artist.followers.total)} followers</p>
                            <span className="absolute bottom-0 right-4 rounded-t-md bg-darkBlue text-lightBlue font-bold px-2 py-2 text-md">
                                {artist.popularity}
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="text-white">No artists found for this genre.</p>
                )}
            </div>
        </div>
    );
};

const formatFollowersCount = (count) => {
    if (count >= 1e6) {
        return `${(count / 1e6).toFixed(1)}M`;
    } else if (count >= 1e3) {
        return `${(count / 1e3).toFixed(1)}k`;
    }
    return count.toString();
};
export default ArtistsPicker;