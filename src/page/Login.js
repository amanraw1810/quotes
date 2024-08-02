import logo from '../my_Logo/favicon4.ico';
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function Login() {
    const [state, setState] = useState({
        email_id: "",
        pass: "",
    });
    const _useNavigate = useNavigate();

    const handler = (event) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
    };
    const loginData = (event) => {
        event.preventDefault();
        console.log(state);
        axios.post("http://localhost:4004/user-login", state).then((res) => {
            // console.log(res);
            if (res.data.success) {
                localStorage.setItem("_token", res.data.token);
                _useNavigate("/");
            } else {
                console.log("username or password is worng");
            }
        });
    };
    return (
        <>
            <div className="container-fluid bg-dark" style={{ backgroundImage: 'url(banners/login1.jpg)', objectFit: 'contain' }}>
                <div className="container pb-4" style={{ paddingTop: '96px' }}>
                    <div className="row">
                        <div className="col-md-6">
                            {/* <img src="favicon.ico" alt="" width={'120'}  /> */}
                        </div>
                        <div className="col-md-6 shadow bg-light rounded px-5 py-3">
                            <img src={logo} alt="" width={'120'} />
                            <h3 align={'left'}>
                                Continue with Sign In
                            </h3>

                            <form method="post"
                                onSubmit={loginData} align={'left'}>


                                <div className="mb-3" style={{ marginTop: "2%" }}>
                                    <label htmlFor="formGroupExampleInput" className="form-label">
                                        Email ID
                                    </label>
                                    <input
                                        type="text"
                                        name="email_id"
                                        onChange={handler}
                                        className="form-control border-2"
                                        id="formGroupExampleInput"
                                        placeholder=""
                                    />
                                </div>

                                <div className="mb-3" style={{ marginTop: "2%" }}>
                                    <label htmlFor="formGroupExampleInput" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="text"
                                        name="pass"
                                        onChange={handler}

                                        className="form-control border-2"
                                        id="formGroupExampleInput2"
                                        placeholder=""
                                    />
                                </div>
                                <div className="mb-3" style={{ marginTop: "2%" }}>
                                    <div align="center">
                                        {/* <input type="submit" value="get data" className='btn btn-danger' /> */}
                                        <input type="submit" value="Sign In" className='my-btn w-100' />

                                        <div className='mt-3'>
                                            Don't have an Account? <Link to={'/registration'} className='text-decoration-none'> Sign Up
                                            </Link>
                                        </div>
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

export default Login