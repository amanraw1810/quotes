import axios from 'axios'
import React, { useState } from 'react'

function Contact() {
    const [message, setMessage] = useState("")


    const [idCounter, setIdCounter] = useState(1);

    const [state, setState] = useState({
        id: idCounter,
        full_name: '',
        email_id: '',
        mobile_number: '',
        subject: '',
        desc: '',
    });

    const handler = (event) => {
        // console.log(event);
        // console.log(event.target.value);
        // setState({full_name:event.target.value})
        const { name, value } = event.target;
        // console.log("name is "+name+" value is "+value);
        setState({ ...state, [name]: value })
    }
    const savaContactData = (event) => {
        event.preventDefault();
        console.log(state);
        setIdCounter((prevCounter) => prevCounter + 1);

        axios
            .post('http://localhost:3004/contact', {
                ...state,
                id: idCounter, // Use the current counter value for the ID
            })
            .then((res) => {
                console.log('Data saved');
                setMessage('Data Send successfully!');
            })
            .catch((error) => {
                console.error('Error:', error);
                setMessage(`Failed to send data. Please try again. ${error.message || ''}`);
            });
    };
    return (
        <>

            <div className="container" style={{ marginTop: '96px' }}>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        {
                            message ?
                                <div className='alert alert-success'>{message}</div>
                                : ''
                        }
                        <form onSubmit={savaContactData} method='post' align={'left'}>

                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name='full_name'
                                    onChange={handler}
                                    className="form-control"
                                    id="formGroupExampleInput"
                                    placeholder=""
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput2" className="form-label">
                                    Email Id
                                </label>
                                <input
                                    type="text"
                                    name='email_id'
                                    onChange={handler}
                                    className="form-control"
                                    id="formGroupExampleInput2"
                                    placeholder=""
                                />
                            </div>
                            <div className="mb-3" style={{ marginTop: "2%" }}>
                                <label htmlFor="formGroupExampleInput" className="form-label">
                                    Mobile Number
                                </label>
                                <input
                                    type="text"
                                    name='mobile_number'
                                    onChange={handler}
                                    className="form-control"
                                    id="formGroupExampleInput"
                                    placeholder=""
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formGroupExampleInput2" className="form-label">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name='subject'
                                    onChange={handler}
                                    className="form-control"
                                    id="formGroupExampleInput2"
                                    placeholder=""
                                />
                            </div>
                            <div className="mb-3" style={{ marginTop: "2%" }}>
                                <label htmlFor="formGroupExampleInput" className="form-label">
                                    Message
                                </label>
                                <textarea name="desc" onChange={handler} id="" style={{ width: "100%", height: "90px" }}></textarea>
                            </div>
                            <div className="mb-3" style={{ marginTop: "2%" }}>
                                <div align="center">
                                    {/* <input type="submit" value="get data" className='btn btn-danger' /> */}
                                    <input type="submit" value="Send message" className='btn btn-success' />
                                </div>
                            </div>



                        </form>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </>
    )
}

export default Contact