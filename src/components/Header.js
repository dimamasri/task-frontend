import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ genre = null, type, artist = null }) => {
    const navigate = useNavigate();

    return (
        <div>
            {type === 'artists' ? (
                <div className="flex items-center bg-customGray p-4 mb-10">

                    <button onClick={() => navigate(-1)} className="text-white mr-4">
                        <img
                            src='../assets/images/back.svg'
                            alt="Back"
                            className="w-6 h-6"
                        />
                    </button>

                    <h1 className="text-white text-xl flex-1 text-center font-bold">Genre / <span className="capitalize">{genre || 'Not Specified'}</span></h1>

                </div>
            ) : (
                <div className="flex flex-col p-4 mb-20">
                    <div className="flex bg-customGray p-4 mb-10 fixed top-0 left-0 w-full z-10">
                        <button onClick={() => navigate(-1)} className="text-white mr-4">
                            <img
                                src='../assets/images/back.svg'
                                alt="Back"
                                className="w-6 h-6"
                            />
                        </button>

                        <div className="flex items-start text-white flex-1 ms-5">
                            <img
                                src={artist?.images[0].url}
                                alt={artist?.name}
                                className="w-12 h-12 rounded-lg mr-3"
                            />
                            <div className="flex flex-col">
                                <h2 className="text-lg font-bold">{artist?.name}</h2>
                                <p className="text-sm text-lightGray font-bold">
                                    {artist ? formatFollowersCount(artist.followers.total) + ' followers' : 'Loading...'}
                                </p>
                            </div>
                            <span className="ml-4 rounded-sm bg-darkBlue text-lightBlue font-bold px-2 py-1 text-xs">
                                {artist?.popularity}
                            </span>
                        </div>
                    </div>
                </div>
            )}
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
export default Header;