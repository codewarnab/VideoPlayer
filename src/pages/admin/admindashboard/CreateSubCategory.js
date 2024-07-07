import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CreateSubCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategoryName, setSubcategoryName] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get("/category/getCategory");
      setCategories(res.data.categories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/category/createSubCategory", {
        subCategoryName,
        categoryId: selectedCategory,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
      } else if (!res.data.success) {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div
      className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-md shadow-md"
      style={{
        width: "auto",
        height: "20rem",
        marginTop: "4rem",
        marginLeft: "4rem",
      }}>
      <select
        className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
        onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">Select Category</option>
        {categories?.map((category) => (
          <option key={category?._id} value={category?._id}>
            {category?.categoryName}
          </option>
        ))}
      </select>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            SubCategory:
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            type="text"
            name="subCategoryName"
            value={subCategoryName}
            placeholder="Enter SubCategory Name"
            onChange={(e) => setSubcategoryName(e.target.value)}
            required
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white mt-10 font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-500"
          type="submit">
          Create SubCategory
        </button>
      </form>
    </div>
  );
};

export default CreateSubCategory;
