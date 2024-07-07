import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPlaneUp, faRocket } from '@fortawesome/free-solid-svg-icons';

const YouTubePlaylist = ({ listId }) => {
    const [videos, setVideos] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const res = await axios.get(
                    `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${listId}&part=snippet&maxResults=50&key=AIzaSyBMPqrF - TWzQnaE0DaSZ2y5SR4Ns - Bbb2E`
                );

                setVideos(res.data.items);
            } catch (error) {
                console.error('Error fetching playlist data:', error);
            }
        };

        fetchPlaylist();
    }, [listId]);

    const splitVideos = (videos) => {
        const totalVideos = videos.length;
        const chunkSize = Math.ceil(totalVideos / 3);

        const beginnerVideos = videos.slice(0, chunkSize);
        const intermediateVideos = videos.slice(chunkSize, chunkSize * 2);
        const advancedVideos = videos.slice(chunkSize * 2);

        return { beginnerVideos, intermediateVideos, advancedVideos };
    };

    const { beginnerVideos, intermediateVideos, advancedVideos } = splitVideos(videos);

    const toggleDropdown = (title) => {
        setOpenDropdown(openDropdown === title ? null : title);
    };

    return (
        <div className="p-4">
            <Dropdown
                title="Beginner"
                videos={beginnerVideos}
                isOpen={openDropdown === 'Beginner'}
                onClick={() => toggleDropdown('Beginner')}
                color={"bg-gradient-to-b from-green-800 to-emerald-700"}
                icon={<FontAwesomeIcon icon={faPaperPlane} className="mr-4" />}
            />
            <Dropdown
                title="Intermediate"
                videos={intermediateVideos}
                isOpen={openDropdown === 'Intermediate'}
                onClick={() => toggleDropdown('Intermediate')}
                color={"bg-gradient-to-b from-amber-700 to-yellow-600"}
                icon={<FontAwesomeIcon icon={faPlaneUp} className="mr-4 rotate-45" />}
            />
            <Dropdown
                title="Advanced"
                videos={advancedVideos}
                isOpen={openDropdown === 'Advanced'}
                onClick={() => toggleDropdown('Advanced')}
                color={"bg-gradient-to-b from-red-800 to-orange-700"}
                icon={<FontAwesomeIcon icon={faRocket} className="mr-4" />}
            />
        </div>
    );
};

const Dropdown = ({ title, videos, isOpen, onClick, color, icon }) => {
    const contentRef = useRef(null);

    return (
        <div className="mb-4">
            <button
                className={`inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-indigo-100 border border-indigo-500 shadow-sm cursor-pointer hover:text-white ${color} p-2 transition-all duration-500 ${isOpen ? 'w-full delay-0 rounded-t-lg' : 'w-60 delay-1000 rounded-full'}`}
                onClick={onClick}
            >
                {icon}

                {title}
            </button>
            <div
                ref={contentRef}
                style={{
                    height: isOpen ? contentRef.current.scrollHeight : 0,
                    opacity: isOpen ? 1 : 0,
                }}
                className={`overflow-hidden bg-slate-200 rounded-b-lg transition-all duration-1000 ease ${isOpen ? "delay-500" : "delay-100"}`}
            >
                {videos.map((video) => (
                    <div key={video.snippet.resourceId.videoId} className="block px-4 py-2 text-black hover:bg-gray-300 hover:font-medium">
                        {video.snippet.title}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default YouTubePlaylist;
