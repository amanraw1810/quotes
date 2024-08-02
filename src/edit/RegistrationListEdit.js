import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// import { Link } from 'react-router-dom';

import logo from '../my_Logo/favicon4.ico';



function RegistrationListEdit() {
    // const [message, setMessage] = useState("")

    const [state, setState] = useState({
        first_name: '',
        last_name: '',
        email_id: '',
        mobile_no: '',
        password: ''
    })
    const parms = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:3008/registration/" + parms.id)
            .then((res) => {
                setState(res.data)
            })
    }, [parms.id]);

    const handler = (event) => {
        const { name, value } = event.target
        setState({ ...state, [name]: value })
    }
    const updateData = (event) => {
        event.preventDefault();
        // console.log(state);
        axios.put("http://localhost:3008/registration/" + parms.id, state)
            .then((res) => {
                navigate("/registration-list")
            })
    }
    return (
        <>
            <div className="container-fluid bg-dark" style={{ backgroundImage: 'url(../../banners/login1.jpg)', objectFit: 'contain' }}>
                <div className="container pb-4" style={{ paddingTop: '96px' }}>
                    <div className="row">
                        <div className="col-md-6 p-0">
                            {/* <img src="banners/login.jpg" alt="" width={'100%'} height={'100%'} /> */}
                        </div>
                        <div className="col-md-6 shadow bg-light rounded px-5 py-3">
                            <img src={logo} alt="" width={'120'} />
                            <h3 align={'left'}>
                                Edit Registration
                            </h3>
                            {/* {
                            message ?
                                <div className='alert alert-success' align={'left'}>{message}</div>
                                : ''
                        } */}
                            <form onSubmit={updateData} method='post' align={'left'}>

                                <div className="mb-3">
                                    <label htmlFor="formGroupExampleInput" className="form-label">
                                        First Name
                                    </label>
                                    <input type="text" name='first_name' onChange={handler} value={state.first_name} className="form-control border-2" id="formGroupExampleInput" placeholder=""
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formGroupExampleInput2" className="form-label">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name='last_name'
                                        onChange={handler} value={state.last_name}
                                        className="form-control border-2"
                                        id="formGroupExampleInput2"
                                        placeholder=""
                                    />
                                </div>
                                <div className="mb-3" style={{ marginTop: "2%" }}>
                                    <label htmlFor="formGroupExampleInput" className="form-label">
                                        Email ID
                                    </label>
                                    <input
                                        type="text"
                                        name='email_id'
                                        onChange={handler} value={state.email_id}
                                        className="form-control border-2"
                                        id="formGroupExampleInput"
                                        placeholder=""
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formGroupExampleInput2" className="form-label">
                                        Mobile NO
                                    </label>
                                    <input
                                        type="text"
                                        name='mobile_no'
                                        onChange={handler} value={state.mobile_no}
                                        className="form-control border-2"
                                        id="formGroupExampleInput2"
                                        placeholder=""
                                    />
                                </div>
                                <div className="mb-3" style={{ marginTop: "2%" }}>
                                    <label htmlFor="formGroupExampleInput" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="text"
                                        name='password'
                                        onChange={handler} value={state.password}
                                        className="form-control border-2"
                                        id="formGroupExampleInput2"
                                        placeholder=""
                                    />
                                </div>
                                <div className="mb-3" style={{ marginTop: "2%" }}>
                                    <div align="center">
                                        {/* <input type="submit" value="get data" className='btn btn-danger' /> */}
                                        <input type="submit" value="Update" className='my-btn w-100' />

                                        {/* <div className='mt-3'>
                                        Already have an account? <Link to={'/login'} className='text-decoration-none'> Sign In
                                        </Link>
                                    </div> */}
                                    </div>
                                </div>



                            </form>
                        </div>
                    </div>
                </div >
            </div >



        </>
    )
}

export default RegistrationListEdit