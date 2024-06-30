import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

const TopBanner = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [textColor, setTextColor] = useState('yellow'); // Initial text color
    const offerExpiry = calculateOfferExpiry(); // Calculate offer expiry time

    const [todayFestival, setTodayFestival] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTodayFestival = async () => {
            try {
                const res = await axios.get('/festivals/today');
                setTodayFestival(res?.data?.festival);
            } catch (error) {
                console.error('Error fetching today\'s festival:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTodayFestival();
    }, []);

    // Calculate offer expiry time (end of the current day)
    function calculateOfferExpiry() {
        const now = new Date();
        const endOfDay = new Date(now);
        endOfDay.setHours(23, 59, 59, 999); // Set to end of the day (23:59:59.999)
        return endOfDay;
    }

    // Update current time every second
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    // Calculate remaining time until offer expiry
    function calculateTimeRemaining() {
        const timeDiff = offerExpiry - currentTime;
        if (timeDiff <= 0) {
            return { hours: 0, minutes: 0, seconds: 0 };
        }

        const totalSeconds = Math.floor(timeDiff / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const remainingSecondsAfterHours = totalSeconds % 3600;
        const minutes = Math.floor(remainingSecondsAfterHours / 60);
        const seconds = remainingSecondsAfterHours % 60;

        return { hours, minutes, seconds };
    }

    // Toggle text color every second (blinking effect)
    useEffect(() => {
        const blinkIntervalId = setInterval(() => {
            setTextColor((prevColor) => (prevColor === 'yellow' ? 'green' : 'white'));
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(blinkIntervalId);
    }, []);

    // Get remaining time
    const { hours, minutes, seconds } = calculateTimeRemaining();
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return (
        <>
            {loading ? (
                <p className="text-gray-400 sm:min-h-14 lg:min-h-16 flex justify-center items-center ">Loading...</p>
            ) : (
                <div className='bg-gray-800 flex justify-center lg:gap-4 lg:py-1 items-center'>
                    <div className={`text-${textColor} font-semibold leading-none`}>
                        <div>
                            <h1 className='flex  lg:py-2 items-center  flex-wrap justify-center'>
                                <span className='underline hover:text-blue-400 hover:cursor-pointer'>
                                    {todayFestival ? `Grab The ${todayFestival.name} sale Offer` : 'Grab Frontend System Design offer here '}
                                </span>
                                <span className="ml-2">Coupon Code:</span>
                                <div className="bg-yellow-400 text-gray-800 p-[0.34rem] rounded font-semibold ml-2">
                                    {todayFestival ? `${todayFestival.couponCode}` : 'PCS360'}
                                </div>
                            </h1>
                        </div>
                    </div>
                    {/* Timer block hidden on tablets and mobile phones */}
                    <div className='hidden lg:flex'>
                        <div className='flex justify-around'>
                            <div className="lg:py-1 px-1 text-2xl text-white">
                                <div className="bg-white rounded-lg p-2 text-black font-bold">
                                    {formattedHours.slice(0, 2)}
                                </div>
                            </div>
                            <div className="lg:py-1 px-1 text-2xl text-white">
                                <div className="bg-white rounded-lg p-2 text-black font-bold">
                                    {formattedMinutes.slice(0, 2)}
                                </div>
                            </div>
                            <div className="lg:py-1 px-1 text-2xl text-white">
                                <div className="bg-white rounded-lg p-2 text-black font-bold">
                                    {formattedSeconds.slice(0, 2)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TopBanner;