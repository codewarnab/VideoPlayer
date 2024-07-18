import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center lg:p-0 p-3">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        &times;
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

// Button Component
const Button = ({ children, className, ...props }) => (
    <button
        className={`px-4 py-2 rounded ${className}`}
        {...props}
    >
        {children}
    </button>
);

// Festival Management Segment
const FestivalManagementSegment = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [couponCode, setCouponCode] = useState('');
    const [link, setLink] = useState('');
    const [errors, setErrors] = useState({});

    const handleChangeName = (e) => {
        setName(e.target.value);
        // Clear error message for name field
        setErrors({ ...errors, name: '' });
    };

    const handleChangeStartDate = (date) => {
        setStartDate(date);
        // Clear error message for startDate field
        setErrors({ ...errors, startDate: '' });
    };

    const handleChangeEndDate = (date) => {
        setEndDate(date);
        // Clear error message for endDate field
        setErrors({ ...errors, endDate: '' });
    };

    const handleChangeCouponCode = (e) => {
        setCouponCode(e.target.value);
        // Clear error message for couponCode field
        setErrors({ ...errors, couponCode: '' });
    };

    const handleChangeLink = (e) => {
        setLink(e.target.value);
        // Clear error message for link field
        setErrors({ ...errors, link: '' });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!name.trim()) formErrors.name = "Name is required";
        if (!startDate) formErrors.startDate = "Start date is required";
        if (!endDate) formErrors.endDate = "End date is required";
        if (!couponCode.trim()) formErrors.couponCode = "Coupon code is required";
        if (!link.trim()) formErrors.link = "Link is required";
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleAddFestival = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const res = await axios.post('/festivals/create-festival', {
                    name,
                    startDate,
                    endDate,
                    couponCode,
                    link
                });
                if (res && res.data.success) {
                    toast.success(res.data.message);
                    setShowCreateModal(false);
                    // Reset form fields
                    setName('');
                    setStartDate(null);
                    setEndDate(null);
                    setCouponCode('');
                    setLink('');
                    setErrors({});
                }
            } catch (error) {
                console.error('Error adding festival:', error);
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error('Failed to add festival. Please try again.');
                }
            }
        } else {
            toast.error('Please fill in all required fields');
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-black">Festival Management</h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
                <Button onClick={() => setShowCreateModal(true)} className="bg-green-500 text-white hover:bg-green-600">
                    Create Festival
                </Button>
                <Button onClick={() => setShowEditModal(true)} className="bg-yellow-500 text-white hover:bg-yellow-600">
                    Edit Current Festival
                </Button>
                <Button onClick={() => setShowDeleteModal(true)} className="bg-red-500 text-white hover:bg-red-600">
                    Delete Festival
                </Button>
            </div>

            <Modal
                isOpen={showCreateModal}
                onClose={() => {
                    setShowCreateModal(false);
                    setErrors({});
                }}
                title="Create New Festival"
            >
                <form onSubmit={handleAddFestival} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Name of the Festival"
                            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                            value={name}
                            onChange={handleChangeName}
                        />
                        <p className="text-red-500 text-sm h-1">{errors.name}</p>
                    </div>
                    <div>
                        <DatePicker
                            selected={startDate}
                            onChange={handleChangeStartDate}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText="Start Date"
                            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                        />
                        <p className="text-red-500 text-sm h-1">{errors.startDate}</p>
                    </div>
                    <div>
                        <DatePicker
                            selected={endDate}
                            onChange={handleChangeEndDate}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            placeholderText="End Date"
                            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                        />
                        <p className="text-red-500 text-sm h-1">{errors.endDate}</p>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Coupon Code"
                            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                            value={couponCode}
                            onChange={handleChangeCouponCode}
                        />
                        <p className="text-red-500 text-sm h-1">{errors.couponCode}</p>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Link"
                            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                            value={link}
                            onChange={handleChangeLink}
                        />
                        <p className="text-red-500 text-sm h-1">{errors.link}</p>
                    </div>
                    <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600">
                        Add Festival
                    </Button>
                </form>
            </Modal>

            <Modal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                title="Edit Current Festival"
            >
                <p>Edit festival form placeholder</p>
            </Modal>

            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Delete Festival"
            >
                <p>Delete festival confirmation placeholder</p>
            </Modal>
        </div>
    );
};

export default FestivalManagementSegment;
