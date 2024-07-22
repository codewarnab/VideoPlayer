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

const SkeletonLoader = () => (
    <div className="flex flex-col lg:flex-row items-start w-full max-w-7xl mx-auto bg-gray-800 rounded-3xl shadow-lg overflow-hidden animate-pulse">
        <div className="w-full lg:w-2/3 bg-gray-700 rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none overflow-hidden">
            <div className="relative pt-[56.25%] bg-gray-600"></div>
            <div className="p-4">
                <div className="h-6 bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-600 rounded w-1/4"></div>
            </div>
        </div>
        <div className="w-full lg:w-1/3 bg-gray-700 rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none">
            {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center p-3">
                    <div className="flex-shrink-0 w-24 h-16 mr-3 bg-gray-600 rounded-lg"></div>
                    <div className="flex-grow">
                        <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-600 rounded w-1/4"></div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const VideoPlayerComponent = ({ videos }) => {
    const [currentVideo, setCurrentVideo] = useState(videos[0]);

    const embedUrl = `https://www.youtube.com/embed/${currentVideo.videoId}?controls=1&rel=0&modestbranding=1&showinfo=0`;

    return (
        <div className="flex flex-col lg:flex-row items-start w-full max-w-7xl mx-auto bg-gray-800 rounded-3xl shadow-lg overflow-hidden">
            <div className="w-full lg:w-2/3 bg-black rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none overflow-hidden">
                <div className="relative pt-[56.25%]">
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={embedUrl}
                        title={currentVideo.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <div className="p-4 bg-gray-700">
                    <h2 className="text-xl md:text-2xl font-bold mb-2 text-white">{currentVideo.title}</h2>
                    <p className="text-sm text-gray-300">{formatViewCount(currentVideo.viewCount)} views</p>
                </div>
            </div>
            <div className="w-full lg:w-1/3 overflow-y-auto max-h-[calc(100vh-16rem)] lg:max-h-[calc(100vh-2rem)] bg-gray-700 rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none">
                {videos.map((video) => (
                    <div
                        key={video._id}
                        className={`flex items-center p-3 hover:bg-gray-600 cursor-pointer transition-colors duration-200 ${video._id === currentVideo._id ? 'bg-blue-500' : ''}`}
                        onClick={() => setCurrentVideo(video)}
                    >
                        <div className="flex-shrink-0 w-24 h-16 mr-3">
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-sm font-semibold line-clamp-2 text-white">{video.title}</h3>
                            <span className="text-xs text-gray-300">
                                {formatViewCount(video.viewCount)} views
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const VideoPlayer = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
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
                setLoading(false);
            } catch (error) {
                console.error("Error fetching videos:", error);
                setLoading(false);
            }
        };
        fetchVideos();
    }, [ytPlayListId]);

    return (
        <div className="p-4 md:p-8 bg-gray-900 min-h-screen">
            {loading ? (
                <SkeletonLoader />
            ) : videos.length > 0 ? (
                <VideoPlayerComponent videos={videos} />
            ) : (
                <p className="text-center text-xl font-semibold text-white">No videos found.</p>
            )}
        </div>
    );
}

export default VideoPlayer;