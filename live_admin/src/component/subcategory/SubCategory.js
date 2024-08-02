import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import Footer from '../footer/Footer';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SubCategory() {
    const [message, setMessage] = useState("");
    const [brandList, setBrandList] = useState([]);
    const [mainCategoryList, setMainCategoryList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);

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
        sub_category_icon: ""
    });

    useEffect(() => {
        axios.get('http://localhost:4004/brand-details')
            .then((res) => {
                setBrandList(res.data.data);
            })
            .catch((error) => {
                console.error('Error fetching brand details:', error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:4004/main-category-details')
            .then((res) => {
                setMainCategoryList(res.data.data);
            })
            .catch((error) => {
                console.error('Error fetching Main Category details:', error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:4004/category-details')
            .then((res) => {
                setCategoryList(res.data.data);
            })
            .catch((error) => {
                console.error('Error fetching Category details:', error);
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:4004/sub-category-details')
            .then((res) => {
                setSubCategoryList(res.data.data);
            })
            .catch((error) => {
                console.error('Error fetching Sub Category details:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // delete function with toast notification
    const deleteRecord = (id) => {
        axios.delete(`http://localhost:4004/sub-category-details/${id}`)
            .then((res) => {
                if (res.data.success) {
                    setSubCategoryList(subCategoryList.filter(item => item._id !== id));
                    toast.success("Sub Category Deleted Successfully!", {
                        position: "top-center",
                        autoClose: 5000,
                        closeOnClick: true,
                        draggable: false,
                        progress: undefined,
                    });
                }
            })
            .catch((error) => {
                console.error('Error deleting brand:', error);
                toast.error("Error deleting brand!", {
                    position: "top-center",
                    autoClose: 5000,
                    closeOnClick: true,
                    draggable: false,
                    progress: undefined,
                });
            });
    };

    const handleFileChange = (event) => {
        setFormData({ ...formData, sub_category_icon: event.target.files[0] });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const postData = new FormData();
        for (let key in formData) {
            postData.append(key, formData[key]);
        }

        axios.post("http://localhost:4004/sub-category-details", postData)
            .then((res) => {
                console.log(res);
                if (res.data.success === true) {
                    setMessage(res.data.message);
                    showToastMessage();

                    window.location.reload();
                }
            })
            .catch((error) => {
                console.error('Error submitting data:', error);
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
                                        Sub-Category-List
                                        <button type="button" className="my-btn float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Add-Sub-Category
                                        </button>
                                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-xl">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title fs-5" id="exampleModalLabel">Category</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <form onSubmit={handleSubmit} encType='multipart/form-data'>
                                                            <div className="mb-3">
                                                                <select name="brand_name" style={{ width: "100%", height: "40px" }} onChange={handleChange}>
                                                                    <option value="">----Select Brand----</option>
                                                                    {brandList.map((item, index) => (
                                                                        <option key={index} value={item.brand_name}>{item.brand_name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>

                                                            <div className="mb-3">
                                                                <select name="main_category_name" style={{ width: "100%", height: "40px" }} onChange={handleChange}>
                                                                    <option value="">----Select Main Category----</option>
                                                                    {mainCategoryList.map((item, index) => (
                                                                        <option key={index} value={item.main_category_name}>
                                                                            {item.main_category_name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>

                                                            <div className="mb-3">
                                                                <select name="category_name" style={{ width: "100%", height: "40px" }} onChange={handleChange}>
                                                                    <option value="">----Select Category----</option>
                                                                    {categoryList.map((item, index) => (
                                                                        <option key={index} value={item.category_name}>
                                                                            {item.category_name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>

                                                            <div className="mb-3">
                                                                <label htmlFor="subCategoryName" className="form-label">Sub Category Name</label>
                                                                <input type="text" name="sub_category_name" onChange={handleChange} className="form-control" id="subCategoryName" />
                                                            </div>

                                                            <div className="mb-3">
                                                                <label htmlFor="subCategoryIcon" className="form-label">Sub Category Icon</label>
                                                                <input type="file" name="sub_category_icon" onChange={handleFileChange} className="form-control" id="subCategoryIcon" multiple />
                                                            </div>
                                                            <div className="mb-3">
                                                                <button type="submit" className='btn btn-success'>Submit</button>
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
                                                    <th>Brand-Name</th>
                                                    <th>Main-Category-Name</th>
                                                    <th>Category-Name</th>
                                                    <th>Sub-Category-Name</th>
                                                    <th>Sub-Category-Icon</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {subCategoryList.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.brand_name}</td>
                                                        <td>{item.main_category_name}</td>
                                                        <td>{item.category_name}</td>
                                                        <td>{item.sub_category_name}</td>


                                                        <td>
                                                            <img src={`http://localhost:4004/uploads/${item.sub_category_icon}`} alt={item.sub_category_icon} style={{ width: '80px', heigh: '60px', objectFit: 'contain' }} />
                                                        </td>
                                                        <td>
                                                            {/* <Link className='btn btn-success' to={/edit/${item._id}}>Update</Link>
                                                            &nbsp; */}
                                                            <button className='btn btn-danger' onClick={() => { deleteRecord(item._id) }} >Delete</button>
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

export default SubCategory;
