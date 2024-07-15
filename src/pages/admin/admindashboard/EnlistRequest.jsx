import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

const MinimalistTabs = ({ tabs, activeTab, setActiveTab }) => {
    return (
        <div className="flex justify-center mb-4 border-b border-gray-300">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    className={`px-4 py-2 font-medium text-gray-600 relative ${activeTab === tab ? 'text-blue-600' : ''}`}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab}
                    {activeTab === tab && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
                    )}
                </button>
            ))}
        </div>
    );
};

const EnlistRequest = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [playlistLoading, setPlaylistLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Pending');

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('/course/get-EnlistRequests');
                setRequests(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch enlist requests');
                setLoading(false);
                console.error('Error fetching data:', err);
            }
        };

        fetchRequests();
    }, []);

    const handleApprove = async (requestId) => {
        try {
            const response = await axios.post('/course/approve-enlist-request', { requestId });

            if (response.status === 201) {
                setRequests((prevRequests) =>
                    prevRequests.map((request) =>
                        request._id === requestId ? { ...request, currentState: 'approved' } : request
                    )
                );
                setSelectedRequest(null); // Close the dialog
            } else {
                console.error('Failed to approve enlist request. Unexpected status:', response.status);
            }
        } catch (err) {
            console.error('Error approving enlist request:', err);
        }
    };

    const handleReject = async (requestId) => {
        try {
            const response = await axios.post('/course/reject-enlist-request', { requestId });

            if (response.status === 200) {
                console.log("why")
                setRequests((prevRequests) =>
                    prevRequests.map((request) =>
                        request._id === requestId ? { ...request, currentState: 'rejected' } : request
                    )
                );
                setSelectedRequest(null); // Close the dialog
            } else {
                console.error('Failed to reject enlist request. Unexpected status:', response.status);
            }
        } catch (err) {
            console.error('Error rejecting enlist request:', err);
        }
    };

    const RequestCard = ({ request }) => (
        <div
            className="flex flex-col md:flex-row border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden text-black w-full"
            onClick={() => setSelectedRequest(request)}
        >
            <div className="w-full md:w-1/3">
                <img src={request.imageUrl} alt={request.title} className="w-full h-48 object-cover" />
            </div>
            <div className="w-full md:w-2/3 p-4 flex flex-col text-start">
                <h2 className="text-xl font-bold mb-2">{request.title}</h2>
                <p className="text-gray-600 mb-2">{request.name}</p>
                <p className="text-sm text-gray-700 mb-4">{request.description.substring(0, 100)}...</p>
                <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                        {request.expectedTimeToFinishNumber} {request.expectedTimeToFinishUnit}
                    </span>
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                        {request.difficultyLevel}
                    </span>
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                        {request.language}
                    </span>
                </div>
            </div>
        </div>
    );

    const RequestDialog = ({ request, onClose }) => {
        const getEmbedUrl = (url) => {
            const playlistId = url.split('list=')[1];
            return `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 text-black z-[100]  ">
                <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto text-start">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-2">{request.title}</h2>
                        <p className="text-gray-600 mb-4">
                            {request.name} -
                            <a
                                href={`mailto:${request.email}`}
                                className="text-blue-500 hover:underline ml-1"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {request.email}
                            </a>
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <img src={request.imageUrl} alt={request.title} className="w-full h-64 object-cover rounded-lg" />
                            <div className="aspect-w-16 aspect-h-9 relative">
                                {playlistLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                                    </div>
                                )}
                                <iframe
                                    src={getEmbedUrl(request.playlistLink)}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                    onLoad={() => setPlaylistLoading(false)}
                                ></iframe>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-xl mb-2">Description</h3>
                                <p>{request.description}</p>
                            </div>
                            <div className="flex flex-col md:flex-row w-full justify-between space-y-4 md:space-y-0 md:space-x-4">
                                <div className="flex-[2]">
                                    <h1 className="font-semibold text-xl mb-2">Prerequisites For the course</h1>
                                    <ul className="list-disc pl-5">
                                        {request.prerequisites.map((pre, index) => (
                                            <li key={index}>{pre}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-xl mb-2">Requirements</h3>
                                    <ul className="list-disc pl-5">
                                        {request.requirements.map((req, index) => (
                                            <li key={index}>{req}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex-1">
                                    <p><strong>Difficulty:</strong> {request.difficultyLevel}</p>
                                    <p><strong>Language:</strong> {request.language}</p>
                                    <p><strong>Expected Duration:</strong> {request.expectedTimeToFinishNumber} {request.expectedTimeToFinishUnit}</p>
                                    <p><strong>Projects Included:</strong> {request.numProjectsIncluded}</p>
                                    <p><strong>Contact Number:</strong> {request.contactNumber}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-100 px-6 py-4 flex justify-evenly items-center">
                        {request.currentState === 'pending' && (
                            <>
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                                    onClick={() => handleApprove(request._id)}
                                >
                                    Approve
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                                    onClick={() => handleReject(request._id)}
                                >
                                    Reject
                                </button>
                            </>
                        )}
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) return <div className="text-center mt-8">Loading...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

    const filteredRequests = requests.filter(request => request.currentState.toLowerCase() === activeTab.toLowerCase());

    return (
        <div className="max-w-6xl mx-auto p-4 min-h-[38rem]">
            <MinimalistTabs
                tabs={['Pending', 'Approved', 'Rejected']}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <div className="space-y-4">
                {filteredRequests.length > 0 ? (
                    filteredRequests.map((request) => (
                        <RequestCard key={request._id} request={request} />
                    ))
                ) : (
                    <p className="text-center">No {activeTab.toLowerCase()} requests found.</p>
                )}
            </div>
            {selectedRequest && (
                <RequestDialog request={selectedRequest} onClose={() => setSelectedRequest(null)} />
            )}
        </div>
    );
};

export default EnlistRequest;