import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePlaylist = () => {
    const [path, setPath] = useState("");
    const [listId, setListId] = useState("");
    const [name, setName] = useState("");
    const [lecId, setLecId] = useState("");

    const navigate = useNavigate();


    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                '/playlist/createPlaylist',
                { path, listId, name, lecId }
            );
            console.log(res);
            if (res && res.data.success) {
                alert(res.data.message);
                navigate("/createDashboard");
            } else if (!res.data.success) {
                alert(res.data.message);
            }
        } catch (error) {
            alert(error.message)
        }
    }
    return (
        <div>
            <section className="mt-4 dark:bg-gray-900 ">
                <div className="flex flex-col items-center justify-center px-4 py-4 mx-auto lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-900">
                        <div className="p-6 space-y-4 md:space-y-4 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create Playlist
                            </h1>
                            <form className="space-y-4 md:space-y-4" action="#" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Path Name</label>
                                    <input type="text"
                                        name="path"
                                        id="path"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter Path"
                                        value={path}
                                        onChange={(e) => setPath(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">List Id Name</label>
                                    <input type="text"
                                        name="listId"
                                        id="listId"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter List I'D"
                                        value={listId}
                                        onChange={(e) => setListId(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input type="text"
                                        name="name"
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter Playlist Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lecture Id</label>
                                    <input type="text"
                                        name="lecId"
                                        id="lecId"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter Lecture Video I'D"
                                        value={lecId}
                                        onChange={(e) => setLecId(e.target.value)}
                                        required
                                    />
                                </div>

                                <button type="submit"
                                    className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" style={{ border: "1px solid black" }}>
                                    Create
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default CreatePlaylist
