import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import Footer from '../footer/Footer';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainCategory() {
    const [message, setMessage] = useState("");
    const [mystate, setMyState] = useState([]);
    const [mystate1, setMyState1] = useState([]);
    const showToastMessage = () => {
        toast.success("Main Category Added Successfully !", {
            position: "top-center",
            autoClose: 5000,
            closeOnClick: true,
            draggable: false,
            progress: undefined,
        });
    };
    const [state, setState] = useState({
        brand_name: "",
        main_category_name: "",
        main_category_icon: ""
    });

    useEffect(() => {
        axios.get('http://localhost:4004/brand-details')
            .then((res) => {
                setMyState(res.data.data);
            })
            .catch((error) => {
                console.error('Error fetching brand details:', error);
            });
    }, []);

    const handler = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const uploadData = (event) => {
        setState({ ...state, main_category_icon: event.target.files[0] });
    };


    // delete function with toast notification
    const deleteRecord = (id) => {
        axios.delete(`http://localhost:4004/main-category-details/${id}`)
            .then((res) => {
                if (res.data.success) {
                    setMyState1(mystate1.filter(item => item._id !== id));
                    toast.success("Main Category Deleted Successfully!", {
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

    const maincategoryFormData = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('brand_name', state.brand_name);
        formData.append('main_category_name', state.main_category_name);
        formData.append('main_category_icon', state.main_category_icon);

        axios.post("http://localhost:4004/main-category-details", formData)
            .then((res) => {
                console.log(res);
                if (res.data.success === true) {
                    setMessage(res.data.message);
                    showToastMessage();

                    window.location.reload();
                    // Optionally, update the brand list here after successful submission
                }
            })
            .catch((error) => {
                console.error('Error submitting brand data:', error);
            });
    };

    useEffect(() => {
        axios.get('http://localhost:4004/main-category-details')
            .then((res) => {
                setMyState1(res.data.data);
            })
            .catch((error) => {
                console.error('Error fetching brand details:', error);
            });
    }, []);

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
                                        main-category-List
                                        <button type="button" className="my-btn float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Add-main-category
                                        </button>
                                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-xl">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title fs-5" id="exampleModalLabel">Main Category</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <form onSubmit={maincategoryFormData} encType='multipart/form-data'>
                                                            <div className="mb-3">
                                                                <select name="brand_name" id="" style={{ width: "100%", height: "40px" }} onChange={handler}>
                                                                    <option value="">----Select Brand----</option>
                                                                    {mystate.map((item, index) => (
                                                                        <option key={index} value={item.brand_name}>{item.brand_name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label htmlFor="formGroupExampleInput" className="form-label">Main Category Name</label>
                                                                <input type="text" name='main_category_name' onChange={handler} className="form-control" id="formGroupExampleInput" />
                                                            </div>

                                                            <div className="mb-3">
                                                                <label htmlFor="formGroupExampleInput2" className="form-label">Main Category Icon</label>
                                                                <input type="file" onChange={uploadData} multiple />
                                                            </div>
                                                            <div className="mb-3">
                                                                <input type="submit" value="Submit" className='btn btn-success' />
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
                                                    <th>Main-Category-Icon</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {mystate1.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.brand_name}</td>
                                                        <td>{item.main_category_name}</td>
                                                        <td>
                                                            {/* <img src={item.main_category_icon} alt="" style={{ width: '300px' }} /> */}
                                                            <img src={`http://localhost:4004/uploads/${item.main_category_icon}`} alt={item.main_category_icon} style={{ width: '80px', heigh: '60px', objectFit: 'contain' }} />
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

export default MainCategory;
