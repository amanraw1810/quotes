import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import Footer from '../footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Link } from 'react-router-dom';


function Brand() {
    const [message, setMessage] = useState("");
    const showToastMessage = () => {
        toast.success("Brand Added Successfully !", {
            position: "top-center",
            autoClose: 5000,
            closeOnClick: true,
            draggable: false,
            progress: undefined,
        });
    };
    const [mystate, setMyState] = useState([]);
    const [state, setState] = useState({
        brand_name: "",
        brand_icon: ""
    });

    const uploadData = (event) => {
        setState({ ...state, brand_icon: event.target.files[0] });
    };


    // delete function with toast notification
    const deleteRecord = (id) => {
        axios.delete(`http://localhost:4004/brand-details/${id}`)
            .then((res) => {
                if (res.data.success) {
                    setMyState(mystate.filter(item => item._id !== id));
                    toast.success("Brand Deleted Successfully!", {
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

    const brandFormData = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('brand_name', state.brand_name);
        formData.append('brand_icon', state.brand_icon);

        axios.post("http://localhost:4004/brand-details", formData)
            .then((res) => {
                console.log(res);
                if (res.data.success === true) {
                    setMessage(res.data.message);
                    showToastMessage();

                    window.location.reload(); // Refresh the page
                    // Optionally, update the brand list here after successful submission
                }
            })
            .catch((error) => {
                console.error('Error submitting brand data:', error);
            });
    };

    return (
        <>
            <Header />
            <body className="sb-nav-fixed">
                <div id="layoutSidenav">
                    <Sidebar />
                    <div id="layoutSidenav_content">
                        <main className="mx-3">
                            <div className="container">
                                <div className="row">
                                    <div className="card mb-4">
                                        <div className="card-header">
                                            <i className="fas fa-table me-1"></i>
                                            Brands List
                                            <button type="button" className="my-btn float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                Add Brands
                                            </button>
                                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-xl">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <form action="" method='post' onSubmit={brandFormData} encType='multipart/form-data'>
                                                                <div className="mb-3">
                                                                    <label htmlFor="formGroupExampleInput" className="form-label">Brand Name</label>
                                                                    <input type="text" name='brand_name' onChange={handler} className="form-control" id="formGroupExampleInput" />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label htmlFor="formGroupExampleInput2" className="form-label">Profile Icon</label>
                                                                    <input type="file" onChange={uploadData} multiple />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <input type="submit" value="Submit" className='btn btn-success' />
                                                                </div>
                                                            </form>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="button" className="btn btn-primary">Save changes</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <table className="table table-striped-columns">
                                                <thead>
                                                    <tr>
                                                        <th>Brand Id</th>
                                                        <th>Brand Name</th>
                                                        <th>Brand Icon</th>
                                                        <th>Action</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {mystate.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item._id}</td>
                                                            <td>{item.brand_name}</td>
                                                            <td>
                                                                <img src={`http://localhost:4004/uploads/${item.brand_icon}`} alt={item.brand_icon} style={{ width: '80px', heigh: '60px', objectFit: 'contain' }} /></td>
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
                        </main>
                        <Footer />
                    </div>
                </div >

                <ToastContainer />
            </body >
        </>
    );
}

export default Brand