import { useState } from "react";
import CategoryContext from "./CategoryContext";

const CategoryState = (props) => {
    const [categories, setCategories] = useState();
    
    const getCategories = async () => {
      console.log("start");
      const response = await fetch(
        "http://127.0.0.1:8000/api/Category/user_categories",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + localStorage.getItem("LedgeSessionToken"),
          },
        }
      );
      const json = await response.json();
      if (json.status === "success") {
        console.log(json);
        console.log(json.categories);
        setCategories(json.categories);
        console.log("success");
      } else {
        console.log("failure");
      }
    };

  return (
    <CategoryContext.Provider value={{ categories, getCategories }}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryState;
