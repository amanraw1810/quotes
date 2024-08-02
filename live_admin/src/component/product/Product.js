import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import Footer from "../footer/Footer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Product() {
  const [message, setMessage] = useState("");
  const [brandList, setBrandList] = useState([]);
  const [mainCategoryList, setMainCategoryList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);

  const showToastMessage = () => {
    toast.success("Main Category Added Successfully !", {
      position: "top-center",
      autoClose: 5000,
      closeOnClick: true,
      draggable: false,
      progress: undefined,
    });
  };
  const [formData, setFormData] = useState({
    brand_name: "",
    main_category_name: "",
    category_name: "",
    sub_category_name: "",
    product_name: "",
    product_size_qty: "",
    product_color:"",
    product_price_before: "",
    product_price_after: "",
    product_features:"",
    product_desc:"",
    product_meta_title:"",
    product_meta_desc:"",
    product_icon_alt:"",
    product_icon: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:4004/brand-details")
      .then((res) => {
        setBrandList(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching brand details:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4004/main-category-details")
      .then((res) => {
        setMainCategoryList(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching Main Category details:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4004/category-details")
      .then((res) => {
        setCategoryList(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching Category details:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4004/sub-category-details")
      .then((res) => {
        setSubCategoryList(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching Sub Category details:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4004/product-details")
      .then((res) => {
        setProductList(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching Sub Category details:", error);
      });
  }, []);

  // useEffect(() => {
  //     axios.get('http://localhost:4004/product-details')
  //         .then((res) => {

  //             const updatedProductList = res.data.data.map(item => {
  //                 const product_icon = item.product_icon.split('/').pop();
  //                 return { ...item, product_icon };
  //             });
  //             setProductList(updatedProductList);
  //         })
  //         .catch((error) => {
  //             console.error('Error fetching product details:', error);
  //         });
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // delete function with toast notification
  const deleteRecord = (id) => {
    axios
      .delete(`http://localhost:4004/product-details/${id}`)
      .then((res) => {
        if (res.data.success) {
          setProductList(productList.filter((item) => item._id !== id));
          toast.success("Product Deleted Successfully!", {
            position: "top-center",
            autoClose: 5000,
            closeOnClick: true,
            draggable: false,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting Product:", error);
        toast.error("Error deleting Product!", {
          position: "top-center",
          autoClose: 5000,
          closeOnClick: true,
          draggable: false,
          progress: undefined,
        });
      });
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, product_icon: event.target.files });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const postData = new FormData();
    for (let key in formData) {
      if (key === "product_icon") {
        for (let file of formData[key]) {
          postData.append("product_icon", file);
        }
      } else {
        postData.append(key, formData[key]);
      }
    }

    axios
      .post("http://localhost:4004/product-details", postData)
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          setMessage(res.data.message);

          showToastMessage();

          window.location.reload();
          // Optionally, update the product list here after successful submission
          axios
            .get("http://localhost:4004/product-details")
            .then((res) => {
              // Splitting filenames and extracting image names
              const updatedProductList = res.data.data.map((item) => {
                const product_icon = item.product_icon.split("/").pop();
                return { ...item, product_icon };
              });
              setProductList(updatedProductList);
            })
            .catch((error) => {
              console.error("Error fetching updated product details:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  return (
    <>
      <Header />
      <div id="layoutSidenav">
        <Sidebar />
        <div id="layoutSidenav_content">
          <main>
            <div className="container">
              <div className="row">
                <div className="card mb-4">
                  <div className="card-header">
                    <i className="fas fa-table me-1"></i>
                    Products List
                    <button
                      type="button"
                      className="my-btn float-end"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Add Product
                    </button>
                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title fs-5"
                              id="exampleModalLabel"
                            >
                              Add Product
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <form
                              onSubmit={handleSubmit}
                              encType="multipart/form-data"
                            >
                              <div className="mb-3">
                                <select
                                  name="brand_name"
                                  style={{ width: "100%", height: "40px" }}
                                  onChange={handleChange}
                                >
                                  <option value="">----Select Brand----</option>
                                  {brandList.map((item, index) => (
                                    <option key={index} value={item.brand_name}>
                                      {item.brand_name}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="mb-3">
                                <select
                                  name="main_category_name"
                                  style={{ width: "100%", height: "40px" }}
                                  onChange={handleChange}
                                >
                                  <option value="">
                                    ----Select Main Category----
                                  </option>
                                  {mainCategoryList.map((item, index) => (
                                    <option
                                      key={index}
                                      value={item.main_category_name}
                                    >
                                      {item.main_category_name}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="mb-3">
                                <select
                                  name="category_name"
                                  style={{ width: "100%", height: "40px" }}
                                  onChange={handleChange}
                                >
                                  <option value="">
                                    ----Select Category----
                                  </option>
                                  {categoryList.map((item, index) => (
                                    <option
                                      key={index}
                                      value={item.category_name}
                                    >
                                      {item.category_name}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="mb-3">
                                <select
                                  name="sub_category_name"
                                  style={{ width: "100%", height: "40px" }}
                                  onChange={handleChange}
                                >
                                  <option value="">
                                    ----Select Sub Category----
                                  </option>
                                  {subCategoryList.map((item, index) => (
                                    <option
                                      key={index}
                                      value={item.sub_category_name}
                                    >
                                      {item.sub_category_name}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="productName"
                                  className="form-label"
                                >
                                  Product Name
                                </label>
                                <input
                                  type="text"
                                  name="product_name"
                                  onChange={handleChange}
                                  className="form-control"
                                  id="productName"
                                />
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="productName"
                                  className="form-label"
                                >
                                  Product Size With Qty
                                </label>
                                <input
                                  type="text"
                                  name="product_size_qty"
                                  onChange={handleChange}
                                  className="form-control"
                                  id="product_size_qty"
                                />

                                {/* <textarea name="product_size_qty" id="product_size_qty" className='form-control'></textarea> */}
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="productName"
                                  className="form-label"
                                >
                                  Product Color
                                </label>
                                <input
                                  type="text"
                                  name="product_color"
                                  onChange={handleChange}
                                  className="form-control"
                                  id="productName"
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="productName"
                                  className="form-label"
                                >
                                  Product features
                                </label>
                                <input
                                  type="text"
                                  name="product_features"
                                  onChange={handleChange}
                                  className="form-control"
                                  id="productName"
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="productName"
                                  className="form-label"
                                >
                                  Product Description
                                </label>
                                <input
                                  type="text"
                                  name="product_desc"
                                  onChange={handleChange}
                                  className="form-control"
                                  id="productName"
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="productName"
                                  className="form-label"
                                >
                                  Product Meta Title
                                </label>
                                <input
                                  type="text"
                                  name="product_meta_title"
                                  onChange={handleChange}
                                  className="form-control"
                                  id="productName"
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="productName"
                                  className="form-label"
                                >
                                  Product Meta Desc
                                </label>
                                <input
                                  type="text"
                                  name="product_meta_desc"
                                  onChange={handleChange}
                                  className="form-control"
                                  id="productName"
                                />
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="productName"
                                  className="form-label"
                                >
                                  Product Price(Before)
                                </label>
                                <input
                                  type="text"
                                  name="product_price_before"
                                  onChange={handleChange}
                                  className="form-control"
                                  id="productName"
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="productName"
                                  className="form-label"
                                >
                                  Product Price(After)
                                </label>
                                <input
                                  type="text"
                                  name="product_price_after"
                                  onChange={handleChange}
                                  className="form-control"
                                  id="productName"
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="productName"
                                  className="form-label"
                                >
                                  Product Icon Alt
                                </label>
                                <input
                                  type="text"
                                  name="product_icon_alt"
                                  onChange={handleChange}
                                  className="form-control"
                                  id="productName"
                                />
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="productIcon"
                                  className="form-label"
                                >
                                  Product Icons
                                </label>
                                <input
                                  type="file"
                                  name="product_icon"
                                  onChange={handleFileChange}
                                  className="form-control"
                                  id="productIcon"
                                  multiple
                                />
                              </div>
                              <div className="mb-3">
                                <button
                                  type="submit"
                                  className="btn btn-success"
                                >
                                  Submit
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <table className="table table-striped-columns">
                      <thead>
                        <tr>
                          <th>Brand_Name</th>
                          <th>Main_Category_Name</th>
                          <th>Category_Name</th>
                          <th>Sub_Category_Name</th>
                          <th>Product_Name</th>
                          <th>Product_Size_Qty</th>
                          <th>Product_Color</th>
                          <th>Product_Features</th>
                          <th>Price_Before</th>
                          <th>Product_After</th>
                        <th>Product Desc</th>
                        <th>Product_Meta_Title</th>
                        <th>Product_Meta_Desc</th>
                        <th>Product_Icon_Alt</th>
                          <th>Product_Icons</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productList.map((item, index) => (
                          <tr key={index}>
                            <td>{item.brand_name}</td>
                            <td>{item.main_category_name}</td>
                            <td>{item.category_name}</td>
                            <td>{item.sub_category_name}</td>
                            <td>{item.product_name}</td>
                            <td>{item.product_size_qty}</td>
                            <td>{item.product_color}</td>
                            <td>{item.product_features}</td>
                            
                            <td>{item.product_price_before}</td>
                            <td>{item.product_price_after}</td>
                            <td>{item.product_meta_title}</td>
                            <td>{item.product_meta_desc}</td>
                            <td>{item.product_icon_alt}</td>
                            <td>
                              {item.product_icon.map((icon, i) => (
                                <img
                                  key={i}
                                  src={`http://localhost:4004/uploads/${icon}`}
                                  alt={icon}
                                  style={{ width: "20px", margin: "5px" }}
                                />
                              ))}
                            </td>

                            <td>
                              {/* <Link className='btn btn-success' to={/edit/${item._id}}>Update</Link>
                                                            &nbsp; */}
                              <button
                                className="btn btn-danger"
                                onClick={() => {
                                  deleteRecord(item._id);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </main>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Product;
