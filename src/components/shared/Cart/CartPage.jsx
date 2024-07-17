import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const CartPage = ({ setCartLength }) => {
    const [cart, setCart] = useState([]);
    const [qty, setQty] = useState("");
    const [selectedCart, setSelectedCart] = useState(null); // State to hold selected cart
    const user = JSON.parse(localStorage.getItem("user"));
    const [clickedIndex, setClickedIndex] = useState(null); // Index of clicked cart item
    const [showRemoveButton, setShowRemoveButton] = useState(false);

    const fetchCartDetails = async () => {
        try {
            const res = await axios.get(`/cart/get-cart/${user._id}`);
            setCart(res?.data?.cart);
            calculateTotal(res?.data?.cart);
        } catch (err) {
            console.error(`Failed to fetch cart details: ${err}`);
        }
    };

    useEffect(() => {
        fetchCartDetails();
    }, []);

    useEffect(() => {
        // Reset clickedIndex when cart items change
        setClickedIndex(null);
    }, [cart]);

    const calculateTotal = (cartsData) => {
        let totalQ = 0;
        cartsData.forEach(cart => {
            totalQ += cart.quantity;
        });
        setQty(totalQ);
        setCartLength(totalQ);
    };

    const removeCart = async (pid) => {
        try {
            const updatedCart = cart.filter(item => item._id !== pid); // Filter out the item to be removed
            setCart(updatedCart);
            const res = await axios.delete(`/cart/${user._id}/delete-cart/${pid}`);
            if (res.data.success) {
                toast.success(res.data.message);
                calculateTotal(updatedCart);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCheckout = (selectedCart) => {
        setSelectedCart(prevState => prevState ? null : selectedCart); // Toggle selectedCart state
        setClickedIndex(null); // Reset clickedIndex when checkout is clicked
    };

    const handleSize = (index) => {
        // Toggle width of clicked cart item
        setClickedIndex(prevIndex => prevIndex === index ? null : index);
        setShowRemoveButton(false);
        setTimeout(() => {
            setShowRemoveButton(true);
        }, 500);
    };

    return (
        <div className="p-4 bg-gray-100">
            <h2 className="text-2xl font-bold mb-4" onClick={() => setClickedIndex(null)}>Your Shopping Cart</h2>
            {cart.length > 0 ? (cart?.map((p, index) => (
                <div className="flex ">
                    <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 rounded-lg bg-gray-300 "
                        onClick={() => handleSize(index)} style={{ width: clickedIndex === index ? '80%' : '100%', transition: "width 0.5s linear " }} key={p._id}>
                        <Link to={p.link} className="flex flex-col md:flex-row md:items-center">
                            <div className='p-5'>
                                <img
                                    src={p.image}
                                    alt={p.name}
                                    className="w-32 h-24 lg:w-52 md:h-32 object-cover rounded-lg"
                                />
                            </div>
                            <div>
                                <p className="text-lg font-bold mb-1">{p.name}</p>
                            </div>
                        </Link>
                    </div>

                    {showRemoveButton && <div className='flex justify-center items-center' style={{ width: clickedIndex === index ? '20%' : '0%', transition: "width 1s linear " }}>
                        {clickedIndex === index && (
                            <button className="bg-gray-300 text-gray-800 font-bold p-5 rounded-full transition delay-50 duration-1000  hover:bg-red-600 hover:text-white" onClick={() => removeCart(p._id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                            </button>
                        )}
                    </div>}

                </div>
            ))) : (
                <div class="flex items-center justify-center h-96">
                    <div class="text-center">
                        <p class="text-3xl font-bold text-gray-800">0 Courses in Cart</p>
                        <p class="mt-4 text-gray-600">Cart Is Empty</p>
                    </div>
                </div>
            )}
            {cart.length > 0 &&
                <div>
                    <div className="flex flex-col md:flex-row md:justify-between items-center m-4">
                        <div className="text-lg font-bold">Subtotal</div>
                        <div className="text-2xl text-blue-800 font-extrabold">{qty}</div>
                    </div>
                    <hr className="bg-blue-200 mb-6" style={{ height: '2px' }} />
                    <p className="text-slate-400 font-light pb-4">GST, and discounts calculated at checkout</p>
                    <div className="flex justify-center">
                        <Link to='/dashboard' className="w-full flex justify-center">

                            <button className="bg-slate-900 text-white font-bold py-2 px-4 w-[95%] flex justify-center items-center rounded-full "><svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className={`h-4 w-4 mr-3 rotate-180`}>
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                                />
                            </svg>Back to Course</button>
                        </Link>
                        <div className="w-full flex justify-center">
                            <button className="bg-blue-500 text-white font-bold py-2 px-4 w-[95%] flex justify-center items-center rounded-full" onClick={() => handleCheckout(cart)}>Checkout<svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className={`h-4 w-4 ml-3`}>
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                                />
                            </svg></button>
                        </div>
                    </div>
                </div>
            }

            {selectedCart && (
                <div className="mt-4" onClick={() => setClickedIndex(null)}>
                    <h2 className="text-xl font-bold mb-2">Selected Cart</h2>
                    <ul className="divide-y divide-gray-200">
                        {selectedCart.map(item => (
                            <li key={item._id} className="py-2">
                                <p className="text-base text-gray-800">
                                    <span className="font-semibold">{item.name}</span> - Quantity: {item.quantity}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CartPage;
