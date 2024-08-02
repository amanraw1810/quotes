import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import Footer from '../footer/Footer';

const Signup = () => {
    const [message, setMessage] = useState("");
    const [mystate, setMyState] = useState([]);
    const [state, setState] = useState({
        f_name: "",
        l_name: "",
        email_id: "",
        mob_no: "",
        pass: "",
    });

    const uploadData = (event) => {
        setState({ ...state, picture: event.target.files[0] });
    };

    useEffect(() => {
        axios.get('http://localhost:4004/signup-details')
            .then((res) => {
                setMyState(res.data.data);
            })
            .catch((error) => {
                console.error('Error fetching signup details:', error);
            });
    }, []);

    const handler = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const signFormData = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('f_name', state.f_name);
        formData.append('l_name', state.l_name);
        formData.append('email_id', state.email_id);
        formData.append('mob_no', state.mob_no);
        formData.append('pass', state.pass);
        formData.append('picture', state.picture);

        axios.post("http://localhost:4004/signup-details", formData)
            .then((res) => {
                console.log(res);
                if (res.data.success === true) {
                    setMessage(res.data.message);
                    // Optionally, update the signup list here after successful submission
                }
            })
            .catch((error) => {
                console.error('Error submitting signup data:', error);
            });
    };

    return (
        <>
            <Header />
            <body className="sb-nav-fixed">
                <div id="layoutSidenav">
                    <Sidebar />
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container">
                                <div className="row">
                                    <div className="card mb-4">
                                        <div className="card-header">
                                            <i className="fas fa-table me-1"></i>
                                            Admin List
                                            <button type="button" className="my-btn float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                Add Admin
                                            </button>
                                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-xl">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <form action="" method='post' onSubmit={signFormData} encType='multipart/form-data'>
                                                                <div className="mb-3">
                                                                    <label htmlFor="formGroupExampleInput" className="form-label">First Name</label>
                                                                    <input type="text" name='f_name' onChange={handler} className="form-control" id="formGroupExampleInput" />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label htmlFor="formGroupExampleInput2" className="form-label">Last Name</label>
                                                                    <input type="text" name='l_name' onChange={handler} className="form-control" id="formGroupExampleInput2" />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label htmlFor="formGroupExampleInput" className="form-label">Email id</label>
                                                                    <input type="text" name='email_id' onChange={handler} className="form-control" id="formGroupExampleInput" />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label htmlFor="formGroupExampleInput2" className="form-label">Mobile Number</label>
                                                                    <input type="text" name='mob_no' onChange={handler} className="form-control" id="formGroupExampleInput2" />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label htmlFor="formGroupExampleInput" className="form-label">Password</label>
                                                                    <input type="text" name='pass' onChange={handler} className="form-control" id="formGroupExampleInput" />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label htmlFor="formGroupExampleInput2" className="form-label">Profile Picture</label>
                                                                    <input type="file" onChange={uploadData} multiple />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <input type="submit" value="Sign UP" className='btn btn-success' />
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
                                                        <th>First Name</th>
                                                        <th>Last Name</th>
                                                        <th>Email Id</th>
                                                        <th>Mobile No</th>
                                                        <th>Password</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {mystate.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item.f_name}</td>
                                                            <td>{item.l_name}</td>
                                                            <td>{item.email_id}</td>
                                                            <td>{item.mob_no}</td>
                                                            <td>{item.pass}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <Footer />
            </body>
        </>
    );
}

export default Signup;
