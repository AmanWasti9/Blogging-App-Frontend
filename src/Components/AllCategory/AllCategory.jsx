import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadAllCategories } from "../../Services/CategoryService";

export default function AllCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadAllCat = async () => {
      try {
        const catData = await loadAllCategories();
        setCategories(catData);
      } catch (error) {
        console.log(error);
      }
    };
    loadAllCat();
  }, []);

  // Slice the first three categories
  const limitedCategories = categories.slice(0, 9);

  return (
    <div style={{ margin: "20px", padding: "20px" }}>
      <h5>Categories</h5>
      <br />
      <div className="d-f f-w g-20px">
        {limitedCategories.map((catItem, index) => (
          <Link to={"/category/" + catItem.categoryId} className="c-b td-n" key={index}>
            <div className="di1">
              <p>{catItem.categoryTitle}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-10">
        <Link to="/categories" className="td-n fs-17">
          See more topics
        </Link>
      </div>
    </div>
  );
}
