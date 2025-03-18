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
    <div style={{ margin: "20px", padding: "25px", borderRadius: "16px" }}>
      <h5 className="heading-sm" style={{ marginBottom: "1.5rem", fontWeight: "600", color: "var(--primary-color)" }}>Categories</h5>
      <div className="d-f f-w g-20px">
        {limitedCategories.map((catItem, index) => (
          <Link to={"/category/" + catItem.categoryId} className="c-b td-n" key={index}>
            <div style={{
              padding: "0.7rem 1.4rem",
              borderRadius: "30px",
              // background: "white",
              // boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
              transition: "all 0.3s ease",
              // border: "1px solid rgba(0,0,0,0.06)",
              transform: "translateY(0)",
              marginBottom: "8px",
              background: "rgba(0,0,0,0.02)", 
              boxShadow: "0 6px 18px rgba(0,0,0,0.03)", 
              border: "1px solid rgba(0,0,0,0.04)"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.08)";
              e.currentTarget.style.background = "#f9f9f9";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.04)";
              e.currentTarget.style.background = "white";
            }}>
              <p className="caption-text" style={{ margin: 0 }}>{catItem.categoryTitle}</p>
            </div>
          </Link>
        ))}
      </div>
      <div style={{ marginTop: "1.5rem" }}>
        <Link to="/categories" className="accent-text" style={{ 
          textDecoration: "none", 
          color: "#333", 
          display: "inline-flex", 
          alignItems: "center",
          fontWeight: "600",
          fontSize: "0.9rem",
          padding: "8px 16px",
          borderRadius: "20px",
          background: "rgba(0,0,0,0.03)",
          transition: "all 0.3s ease"
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = "rgba(0,0,0,0.06)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = "rgba(0,0,0,0.03)";
        }}>
          See more topics
        </Link>
      </div>
    </div>
  );
}
