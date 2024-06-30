import axios from 'axios';
import React, { useEffect, useState } from 'react';

const TotalCount = ({ listId }) => {

    const [totalViewCount, setTotalViewCount] = useState(0);

    const viewcount = async () => {
        try {
            const res = await axios.get(
                `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${listId}&part=snippet&maxResults=50&key=AIzaSyAs9GbtY8udQA44o8IL5-Fzp0jdTHbMzOA`
            );

            const playlistData = {
                videos: res?.data?.items?.map(item => ({
                    title: item?.snippet?.title,
                    videoId: item?.snippet?.resourceId?.videoId
                }))
            };

            const videosWithViewCount = await Promise.all(
                playlistData?.videos?.map(async video => {
                    const videoStatsResponse = await axios.get(
                        `https://www.googleapis.com/youtube/v3/videos?id=${video.videoId}&part=statistics&key=AIzaSyAs9GbtY8udQA44o8IL5-Fzp0jdTHbMzOA`
                    );
                    const firstItem = videoStatsResponse.data.items[0];
                    if (firstItem && firstItem?.statistics && firstItem?.statistics?.viewCount) {
                        const viewCount = firstItem?.statistics?.viewCount;
                        return {
                            ...video,
                            viewCount
                        };
                    } else {
                        // Handle case where statistics are not available
                        return {
                            ...video,
                            viewCount: 0 // Or any default value you prefer
                        };
                    }
                })
            );

            // Calculate total view count
            const totalViews = videosWithViewCount.reduce((total, video) => total + parseInt(video.viewCount), 0);
            setTotalViewCount(totalViews);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        viewcount();
    }, [listId]);

    return (
        <h4 className="text-sm">Views: {totalViewCount}</h4>
    );
}

export default TotalCount;
