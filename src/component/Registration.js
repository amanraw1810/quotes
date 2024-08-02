import logo from '../my_Logo/favicon4.ico';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Registration() {
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
        axios.get('http://localhost:4004/registration-details')
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

        axios.post("http://localhost:4004/registration-details", formData)
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
            <div className="container-fluid bg-dark" style={{ backgroundImage: 'url(banners/login1.jpg)', objectFit: 'contain' }}>
                <div className="container pb-4" style={{ paddingTop: '96px' }}>
                    <div className="row">
                        <div className="col-md-6 p-0">
                            {/* Placeholder for image */}
                        </div>
                        <div className="col-md-6 shadow bg-light rounded px-5 py-3">
                            <img src={logo} alt="Logo" width={120} />
                            <h3 align="left">Continue with Sign Up</h3>
                            {message && <div className='alert alert-success' align='left'>{message}</div>}
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default Registration
