import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { loadPostsBySearch } from "../../Services/PostService";

export default function Searchbar({ handleSearchResults, loadAllBlogs }) {
  const [searchValue, setSearchValue] = useState("");
  const [posts, setPosts] = useState();

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  useEffect(() => {
    const searchPosts = async () => {
      try {
        if (searchValue.trim() === "") {
          // If search value is empty, load all posts
          setPosts(null);
          handleSearchResults(null); // Pass null to indicate loading all posts
          loadAllBlogs();
        } else {
          const searchResults = await loadPostsBySearch(searchValue);
          setPosts(searchResults);
          handleSearchResults(searchResults); // Pass search results back to parent component
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Execute searchPosts whenever searchValue changes
    searchPosts();
  }, [searchValue]); // Add searchValue as a dependency to the useEffect hook

  return (
    <div style={{ justifyContent: "center", display: "flex", margin: "20px" }}>
      <div
        className="flex-row"
        style={{
          border: "1px solid rgba(0,0,0,0.1)",
          width: "500px",
          borderRadius: "30px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
          transition: "all 0.3s ease",
          background: "white",
          overflow: "hidden"
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(232, 90, 79, 0.1)";
          e.currentTarget.style.borderColor = "rgba(232, 90, 79, 0.3)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.05)";
          e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)";
        }}
      >
        <div
          className="search_icon"
          style={{
            width: "10%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "20px",
            color: "var(--primary-color)",
            padding: "0 5px"
          }}
        >
          <CiSearch />
        </div>
        <div className="search_bar" style={{ width: "90%" }}>
          <input
            type="search"
            name=""
            id=""
            placeholder="Search all topics"
            style={{
              width: "95%",
              padding: "12px 10px",
              border: "none",
              outline: "none",
              fontSize: "14px",
              fontFamily: "'Poppins', sans-serif"
            }}
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  );
}
