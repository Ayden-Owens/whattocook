import React, { useState, useEffect } from "react";
import Axios from "axios";
import Cookies from "js-cookie";

export const SearchBar = ({ setResults, inputValue, selectedRecipe }) => {
  const [input, setInput] = useState("");

  // const API_BASE_URL = "http://localhost:3000";

  const fetchData = async (value) => {
      try {
        const response = await Axios.get(
          "https://whattocookapp-ed9fe9a2a3d4.herokuapp.com/recipe/allergy",
          {
            params: { value },
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${Cookies.get("userToken")}`,
            },
          }
        );

        setResults(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      
  };

  const handleChange = (value) => {
    fetchData(value);
    setInput(value);
    inputValue(value);
  };

  useEffect(() => {
    // Use the input value or selectedRecipe when the component mounts
    const valueToFetch = selectedRecipe !== null ? selectedRecipe : input;
    if (valueToFetch !== "") {
      fetchData(valueToFetch);
    }
    else {
      setResults("");
    }
    setInput(valueToFetch);
  }, [input, selectedRecipe]);

  return (
    <div>
      <input
        placeholder="Search recipes..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;