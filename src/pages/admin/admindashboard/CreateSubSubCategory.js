import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CreateSubSubCategory = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [subSubCategoryName, setSubsubcategoryName] = useState("");
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

  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
    try {
      const res = await axios.get(`/category/getSubCategory/${categoryId}`);
      setSubcategories(res.data.subcategory);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/category/createSubSubCategory", {
        subSubCategoryName,
        categoryId: selectedCategory,
        subcategoryId: selectedSubcategory,
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
      <div className="mb-4">
        <select
          className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="">Select Category</option>
          {categories?.map((category) => (
            <option key={category._id} value={category._id}>
              {category?.categoryName}
            </option>
          ))}
        </select>
        {selectedCategory && (
          <select
            className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            onChange={(e) => setSelectedSubcategory(e.target.value)}>
            <option value="">Select Subcategory</option>
            {subcategories?.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory?.subCategoryName}
              </option>
            ))}
          </select>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              SubCategory:
            </label>
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              type="text"
              name="subSubcategoryName"
              placeholder="Enter SubSubCategory Name"
              value={subSubCategoryName}
              onChange={(e) => setSubsubcategoryName(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white mt-7 font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-500"
            type="submit">
            Create SubSubCategory
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSubSubCategory;
