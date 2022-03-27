import React, { useContext } from "react";
import { useState } from "react";
import { Button, CloseButton, Form } from "react-bootstrap";
import "./Popup.css";

import CategoryContext from "../context/Category/CategoryContext";
import AlertContext from "../context/Alert/AlertContext";

function AddCategory(props) {
  const categoryContext = useContext(CategoryContext);
  const alertContext = useContext(AlertContext);
  
  const [categoryData, setCategoryData] = useState({
    category_name: "",
    category_type: "",
    color:"#ffffff",
    description:"",
  });

  //   const fetchCurrencies = async (e) => {
  //   console.log("Hello");
  //   e.preventDefault();
  //   const response = await fetch(
  //     "http://127.0.0.1:8000/api/currency/get_currencies",
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Token " + localStorage.getItem("LedgeSessionToken"),
  //       },
  //     }
  //   );
  //   const json = await response.json();
  //   console.log(json);
  //   if (json.status === "success") {
  //     console.log("success");
  //   } else {
  //     console.log("failure");
  //   }
  // };

  const submitCategoryForm = async (e) => {
    console.log(categoryData)
    e.preventDefault();
    const response = await fetch(
      "http://127.0.0.1:8000/api/Category/new_category",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token "+ localStorage.getItem("LedgeSessionToken"),
        },
        body: JSON.stringify({
          category_name: categoryData.category_name,
          category_type: categoryData.category_type,
          color:categoryData.color,
          description:categoryData.description,
        }),
      }
    );
    const json = await response.json()
    if (json.status === "success") {
      // reload
        console.log(json)
      console.log("success");
      categoryContext.getCategories();
      props.addCategoryFormTrigger(false);
      alertContext.getAlert(json.message);
    } else {
      console.log("failure");
      props.addCategoryFormTrigger(false);
      alertContext.getAlert(json.message, "danger");
    }
    setCategoryData({
      category_name: "",
      category_type: "",
      color: "#ffffff",
      description: "",
    });
  }

  const onChange = (e) => {
      setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };
  return props.addCategoryTrigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div>
          <h3>New Category</h3>
        </div>
        <hr className="sidebar-line" />
        <CloseButton
          className="close-popup"
          onClick={() => props.addCategoryFormTrigger(false)}
        />
        <Form>
          <div className="new-category-grid">
            <Form.Group className="mb-3 new-category-name">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="Text"
                placeholder="New Category Name"
                name="category_name"
                onChange={onChange}
              />
            </Form.Group>
            <div className="new-category-markers">
              <Form.Group className="mb-3 new-category-type">
                <Form.Label>Category Type</Form.Label>
                <Form.Control
                  type="Text"
                  placeholder="Type of Category"
                  name="category_type"
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Color</Form.Label>
                <Form.Control type="color"
                name="color" onChange={onChange} defaultValue='#ffffff' />
              </Form.Group>
            </div>
            <div className="new-category-description-box">
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Describe Category"
                  name="description"
                  onChange={onChange}
                />
              </Form.Group>
            </div>
          </div>
        </Form>
        <div className="create-button-flex">
          <Button variant="outline-primary" className="create-button" onClick={submitCategoryForm}>
            Add Category
          </Button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default AddCategory;
