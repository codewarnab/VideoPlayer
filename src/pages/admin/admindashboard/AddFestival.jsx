import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Pencil, Trash2 } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center lg:p-0 p-3 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-black">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        &times;
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

const Button = ({ children, className, ...props }) => (
    <button
        className={`px-6 py-3 text-lg rounded ${className}`}
        {...props}
    >
        {children}
    </button>
);

const FestivalManagementSegment = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSelectFestivalModal, setShowSelectFestivalModal] = useState(false);
    const [festivals, setFestivals] = useState([]);
    const [currentFestival, setCurrentFestival] = useState(null);
    const [selectedFestival, setSelectedFestival] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        startDate: null,
        endDate: null,
        couponCode: '',
        link: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchFestivals();
        fetchCurrentFestival();
    }, []);

    const fetchFestivals = async () => {
        try {
            const res = await axios.get('/festivals/all-festivals');
            if (res.data.success) {
                setFestivals(res.data.festivals);
            }
        } catch (error) {
            console.error('Error fetching festivals:', error);
            toast.error('Failed to fetch festivals');
        }
    };

    const fetchCurrentFestival = async () => {
        try {
            const res = await axios.get('/festivals/today');
            if (res.data.success) {
                setCurrentFestival(res.data.festival);
            }
        } catch (error) {
            console.error('Error fetching current festival:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleDateChange = (date, field) => {
        setFormData({ ...formData, [field]: date });
        setErrors({ ...errors, [field]: '' });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.name.trim()) formErrors.name = "Name is required";
        if (!formData.startDate) formErrors.startDate = "Start date is required";
        if (!formData.endDate) formErrors.endDate = "End date is required";
        if (!formData.couponCode.trim()) formErrors.couponCode = "Coupon code is required";
        if (!formData.link.trim()) formErrors.link = "Link is required";
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                let res;
                if (selectedFestival) {
                    res = await axios.put(`/festivals/edit-festival/${selectedFestival._id}`, formData);
                } else {
                    res = await axios.post('/festivals/create-festival', formData);
                }
                if (res && res.data.success) {
                    toast.success(res.data.message);
                    setShowCreateModal(false);
                    setShowEditModal(false);
                    resetForm();
                    fetchFestivals();
                    fetchCurrentFestival();
                }
            } catch (error) {
                console.error('Error submitting festival:', error);
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error('Failed to submit festival. Please try again.');
                }
            }
        } else {
            toast.error('Please fill in all required fields');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            startDate: null,
            endDate: null,
            couponCode: '',
            link: '',
        });
        setErrors({});
        setSelectedFestival(null);
    };

   
  

    const handleEditSelect = (festival) => {
        setSelectedFestival(festival);
        setFormData({
            name: festival.name,
            startDate: new Date(festival.startDate),
            endDate: new Date(festival.endDate),
            couponCode: festival.couponCode,
            link: festival.link,
        });
        setShowSelectFestivalModal(false);
        setShowEditModal(true);
    };

    const handleDeleteSelect = (festival) => {
        setSelectedFestival(festival);
        setShowSelectFestivalModal(false);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const res = await axios.delete(`/festivals/delete-festival/${selectedFestival._id}`);
            if (res && res.data.success) {
                toast.success(res.data.message);
                setShowDeleteModal(false);
                fetchFestivals();
                fetchCurrentFestival();
            }
        } catch (error) {
            console.error('Error deleting festival:', error);
            toast.error('Failed to delete festival. Please try again.');
        }
    };

    const categorizedFestivals = () => {
        const today = new Date();
        const ongoing = festivals.filter(festival => new Date(festival.startDate) <= today && new Date(festival.endDate) >= today);
        const upcoming = festivals.filter(festival => new Date(festival.startDate) > today);
        return { ongoing, upcoming };
    };

    const renderFestivalForm = () => (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <input
                    type="text"
                    name="name"
                    placeholder="Name of the Festival"
                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <p className="text-red-500 text-sm h-1">{errors.name}</p>
            </div>
            <div>
                <DatePicker
                    selected={formData.startDate}
                    onChange={(date) => handleDateChange(date, 'startDate')}
                    selectsStart
                    startDate={formData.startDate}
                    endDate={formData.endDate}
                    placeholderText="Start Date"
                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                />
                <p className="text-red-500 text-sm h-1">{errors.startDate}</p>
            </div>
            <div>
                <DatePicker
                    selected={formData.endDate}
                    onChange={(date) => handleDateChange(date, 'endDate')}
                    selectsEnd
                    startDate={formData.startDate}
                    endDate={formData.endDate}
                    minDate={formData.startDate}
                    placeholderText="End Date"
                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                />
                <p className="text-red-500 text-sm h-1">{errors.endDate}</p>
            </div>
            <div>
                <input
                    type="text"
                    name="couponCode"
                    placeholder="Coupon Code"
                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                    value={formData.couponCode}
                    onChange={handleInputChange}
                />
                <p className="text-red-500 text-sm h-1">{errors.couponCode}</p>
            </div>
            <div>
                <input
                    type="text"
                    name="link"
                    placeholder="Festival Link"
                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                    value={formData.link}
                    onChange={handleInputChange}
                />
                <p className="text-red-500 text-sm h-1">{errors.link}</p>
            </div>
            <div className="flex justify-center space-x-2">
                <Button className="bg-blue-500 text-white hover:bg-blue-600">Submit</Button>

            </div>
        </form>
    );

    return (
        <div className="space-y-4">
            <div className=' w-full min-h-[20rem] flex justify-center items-center'>
                <div className='flex  gap-8 flex-wrap justify-center'>
                    <Button onClick={() => {
                        resetForm(); 
                        setShowCreateModal(true);
                    }} className="bg-green-500 text-white hover:bg-green-600">
                        Create Festival
                    </Button>

                <Button onClick={() => setShowSelectFestivalModal(true)} className="bg-blue-500 text-white hover:bg-blue-600">Manage Festival</Button>
                </div>

            </div>
            <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Create Festival">
                {renderFestivalForm()}
            </Modal>

            <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Festival">
                {renderFestivalForm()}
            </Modal>

            <Modal isOpen={showSelectFestivalModal} onClose={() => setShowSelectFestivalModal(false)} title="Select Festival">
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-black">Ongoing Festivals</h3>
                    {categorizedFestivals().ongoing.length > 0 ? (
                        <ul>
                            {categorizedFestivals().ongoing.map((festival) => (
                                <li key={festival._id} className="flex justify-between items-center p-2 border border-gray-300 rounded mb-2">
                                    <div className="flex items-center gap-1 flex-wrap justify-center  ">
                                        <span className="font-semibold text-start text-black">{festival.name}</span>
                                        <div>
                                            <span className="text-sm text-gray-800">{` ${new Date(festival.startDate).toLocaleDateString()} -`}</span>
                                            <span className="text-sm text-gray-800">{`${new Date(festival.endDate).toLocaleDateString()}`}</span>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button onClick={() => handleEditSelect(festival)} className="text-blue-500 hover:underline">
                                            <Pencil />
                                        </button>
                                        <button onClick={() => handleDeleteSelect(festival)} className="text-red-500 hover:underline">
                                            <Trash2 />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No ongoing festivals.</p>
                    )}
                    <h3 className="text-lg font-bold text-black mt-4">Upcoming Festivals</h3>
                    {categorizedFestivals().upcoming.length > 0 ? (
                        <ul>
                            {categorizedFestivals().upcoming.map((festival) => (
                                <li key={festival._id} className="flex justify-between  items-center p-2 border border-gray-300 rounded mb-2">
                                    <div className="flex items-center gap-1 flex-wrap justify-center">
                                        <span className="font-semibold text-black ">{festival.name}</span>
                                        <div>
                                            <span className="text-sm text-gray-800">{` ${new Date(festival.startDate).toLocaleDateString()} -`}</span>
                                            <span className="text-sm text-gray-800">{`${new Date(festival.endDate).toLocaleDateString()}`}</span>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button onClick={() => handleEditSelect(festival)} className="text-blue-500 hover:underline">
                                            <Pencil />
                                        </button>
                                        <button onClick={() => handleDeleteSelect(festival)} className="text-red-500 hover:underline">
                                            <Trash2 />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-black">No upcoming festivals.</p>
                    )}
                </div>
            </Modal>



            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Festival">
                <div className="space-y-4">
                    <p className='text-gray-700 text-start'>
                        Are you sure you want to delete the festival
                        <span className='block text-black'>
                            "{selectedFestival?.name}"?
                        </span>
                    </p>


                    <div className="flex justify-end space-x-2">
                        <Button onClick={handleDeleteConfirm} className="bg-red-500 text-white hover:bg-red-600">Delete</Button>
                        <Button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 text-black hover:bg-gray-400">Cancel</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default FestivalManagementSegment;
