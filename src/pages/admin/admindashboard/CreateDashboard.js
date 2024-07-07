import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const CreateDashboard = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState({});
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.post("/dashboard/upload", formData);
      //console.log(data);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });

      console.log("Uploaded", data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/dashboard/create-dashboard", {
        name,
        link,
        image: image?.url,
        role: [{ rolename: role }],
      });
      console.log(res);
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/dashboard");
      } else if (!res.data.success) {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div style={{ marginLeft: "80px" }}>
      <section
        className="ml-40"
        style={{
          border: "4mm ridge rgba(211, 220, 50, .6)",
          boxShadow: "60px -16px teal",
        }}>
        <div>
          <div className="w-96 bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-900">
            <div className="p-6 space-y-4 md:space-y-4 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create Dashboard
              </h1>
              <form onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Dashboard Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Dashboard Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Link
                  </label>
                  <input
                    type="text"
                    name="link"
                    id="link"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required
                  />
                </div>

                {/* <div>{upload && "uploading...!!"}</div> */}

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Role
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required>
                    <option value="">Select Role</option>
                    <option value="Employee">Employee</option>
                    <option value="Buyer">Buyer</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Upload Image"
                    // value={image}
                    onChange={handleImage}
                    required
                  />
                  {image?.url && (
                    <img src={image.url} className="w-28  aspect-square" />
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full mt-5 text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  style={{ border: "1px solid black" }}>
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateDashboard;
