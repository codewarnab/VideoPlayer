import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

const formatViewCount = (views) => {
    if (views >= 1000000) {
        return Math.floor(views / 1000000) + 'M+';
    } else if (views >= 1000) {
        return Math.floor(views / 1000) + 'k+';
    }
    return views;
};

const VideoPlayerComponent = ({ videos }) => {
    const [currentVideo, setCurrentVideo] = useState(videos[0]);

    const embedUrl = `https://www.youtube.com/embed/${currentVideo.videoId}?controls=1&rel=0&modestbranding=1&showinfo=0`;

    return (
        <div className="flex flex-col items-center w-full max-w-6xl mx-auto bg-gray-800 rounded-3xl shadow-lg overflow-hidden">
            <div className="w-full aspect-video bg-black rounded-t-3xl overflow-hidden">
                <iframe
                    className="w-full h-full"
                    src={embedUrl}
                    title={currentVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            <div className="w-full p-6 bg-gray-700 rounded-b-3xl">
                <h2 className="text-2xl font-bold mb-2 text-white">{currentVideo.title}</h2>
                <p className="text-sm text-gray-300 mb-4">{formatViewCount(currentVideo.viewCount)} views</p>
            </div>
            <div className="w-full overflow-y-auto max-h-96 bg-gray-700 rounded-3xl mt-4">
                {videos.map((video) => (
                    <div
                        key={video._id}
                        className={`flex items-center p-4 hover:bg-gray-600 cursor-pointer transition-colors duration-200 rounded-2xl m-2 ${video._id === currentVideo._id ? 'bg-blue-500' : ''}`}
                        onClick={() => setCurrentVideo(video)}
                    >
                        <div className="flex-shrink-0 w-32 h-18 mr-4">
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </div>
                        <div className="flex-grow">
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-sm font-semibold line-clamp-2 flex-grow text-white">{video.title}</h3>
                                <span className="text-xs text-gray-300 ml-2 whitespace-nowrap">
                                    {formatViewCount(video.viewCount)} views
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const VideoPlayer = () => {
    const [videos, setVideos] = useState([]);
    const { ytPlayListId } = useParams();

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                if (!ytPlayListId) {
                    console.error("ytPlayListId is required");
                    return;
                }
                const response = await axios.get(`/description/getVideos?ytPlayListId=${ytPlayListId}`);
                setVideos(response.data);
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };
        fetchVideos();
    }, [ytPlayListId]);

    return (
        <div className="p-8 bg-gray-900 min-h-screen">
            {videos.length > 0 ? (
                <VideoPlayerComponent videos={videos} />
            ) : (
                <p className="text-center text-xl font-semibold text-white">Loading videos...</p>
            )}
        </div>
    );
}

export default VideoPlayer;