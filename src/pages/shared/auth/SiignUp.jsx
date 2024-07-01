import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import signupright from '../../../images/signupright.png';
import { useNavigate, Link } from 'react-router-dom';
import registerHandler from '../../../utils/shared/registerHandler';

const SignUp = () => {
  const data = ['User', 'Administrator'];
  const [showFront, setShowFront] = useState(true);
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
     employee : '',
    email: '',
    name: '',
    password: '',
    phoneno: '',
    confirmpassword: ''
  });
  const navigate = useNavigate();

  const adminFormFields = [
    ['First Name*', 'Last Name*'],
    ['Employee ID*', 'Official Email ID*'],
    ['Phone No*']
  ];

  const commonFields = [
    'Password*',
    'Confirm Password*'
  ];

  const userFormFields = [
    'Name*',
    'Email*',
    ...commonFields
  ];

  useEffect(() => {
    // Reset form data when user type changes
    setFormData({
      firstname: '',
      lastname: '',
      employee: '',
      email: '',
      phone: '',
      name: '',
      password: '',
      phoneno: '',
      confirmpassword: ''
    });
  }, [userType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    console.log("Updated formData:", { ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);  // Add this line for debugging
    try {
      const success = await registerHandler(userType, formData);

      if (success) {
        navigate('/signin');
      }
    } catch (error) {
      console.error("Registration error:", error);
      // The toast error is already handled in registerHandler
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-slate-50 to-[#C1C5F2] flex justify-center flex-col gap-4 items-center min-h-auto py-14">
      {showFront && (
        <>
          <h1 className="lg:text-6xl text-3xl font-extrabold relative md:text-4xl text-black text-center">Who Are You?</h1>
          <div className="flex flex-col sm:flex-row gap-4 mt-6 lg:h-44 mb-11">
            {data.map((d, index) => (
              <div key={index} className="relative inline-flex items-center justify-center">
                <div
                  className="px-4 py-3 md:px-6 md:py-4 lg:text-2xl lg:px-10 lg:py-4 text-2xl font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-sm cursor-pointer"
                  onClick={() => {
                    setShowFront(false);
                    setUserType(d);
                  }}
                >
                  {d}
                </div>
                {index !== data.length - 1 && <br className="sm:hidden lg:block" />}
              </div>
            ))}
          </div>
        </>
      )}
      {userType && (
        <div className="w-full lg:h-auto font-poppins flex flex-col lg:flex-row">
          {/* left section */}
          <div className="flex justify-center items-center lg:w-1/2 w-full">
            <div className=" bg-blue-50 bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-md rounded-lg p-5 w-full max-w-md">
              <div className="flex gap-1 items-center mb-4">
                <h1 className="font-semibold text-3xl leading-tight text-black">Signup</h1>
              </div>
              <div className='flex flex-col gap-1'>
                <form className="space-y-4 opacity-80" onSubmit={handleSubmit}>
                  {userType === 'Administrator' ? (
                    <>
                      {adminFormFields.map((fields, index) => (
                        <div className="grid sm:grid-cols-2 gap-4" key={index}>
                          {fields.map((placeholder, idx) => {
                            const name = placeholder.toLowerCase().replace(/ /g, '').replace('*', '').replace('enter', '').replace('official', '').replace('id', '');
                            return (
                              <input
                                key={idx}
                                type="text"
                                placeholder={placeholder}
                                name={name}
                                value={formData[name]}
                                onChange={handleInputChange}
                                className="p-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent font-light font-sans text-black w-full"
                                style={placeholder.toLowerCase().includes('phone') ? { gridColumn: 'span 2' } : {}}
                              />
                            );
                          })}
                        </div>
                      ))}

                      {commonFields.map((placeholder, index) => (
                        <input
                          key={index}
                          type="password"
                          placeholder={placeholder}
                          name={placeholder.toLowerCase().replace(/ /g, '').replace('*', '').replace('enter', '').replace('official', '').replace('id', '')}
                          value={formData[placeholder.toLowerCase().replace(/ /g, '').replace('*', '').replace('enter', '').replace('official', '').replace('id', '')]}
                          onChange={handleInputChange}
                          className="p-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent font-light font-sans text-black w-full"
                        />
                      ))}
                    </>
                  ) : (
                    userFormFields.map((placeholder, index) => {
                      const name = placeholder.toLowerCase().replace(/ /g, '').replace('*', '').replace('enter', '');
                      return (
                        <input
                          key={index}
                          type={placeholder.includes('Password') ? 'password' : 'text'}
                          placeholder={placeholder}
                          name={name}
                          value={formData[name]}
                          onChange={handleInputChange}
                          className="p-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent font-light font-sans text-black w-full"
                        />
                      );
                    })
                  )}

                  <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition duration-300">
                    Sign Up
                  </button>
                </form>
                <p className="text-gray-500 text-xs font-bold mt-4">
                  Already have an account?
                  <Link
                    to="/signin"
                    className="text-blue-500 cursor-pointer hover:font-semibold transition-all ease-in-out tracking-wider text-sm underline inline-block mx-1"
                  >
                    Login now!
                  </Link>
                </p>
              </div>
            </div>
          </div>
          {/* right section */}
          <div className="hidden lg:flex justify-center items-center lg:w-1/2">
            <div className="rounded-full w-[85%] h-[100%] shadow-md pr-2 overflow-hidden object-cover bg-blue-50 bg-opacity-20 backdrop-filter backdrop-blur-lg">
              <LazyLoadImage
                src={signupright}
                alt="A Boy Standing Holding a Book"
                effect="blur"
                className="relative top-[18px] pb-3 pr-2 object-cover h-[30rem]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
