import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Hype from '../my_Logo/status1.jpg';
import logo from '../my_Logo/favicon4.ico';
function DeskTopFooter() {
    const [isFirstRender, setIsFirstRender] = useState(true);
    const initialChatState = JSON.parse(localStorage.getItem('isChatOpen')) || false;
    const [isChatOpen, setIsChatOpen] = useState(initialChatState);

    const openChat = () => {
        setIsChatOpen(true);
    };

    const closeChat = () => {
        setIsChatOpen(false);
    };

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }

        localStorage.setItem('isChatOpen', JSON.stringify(isChatOpen));
    }, [isChatOpen, isFirstRender]);

    useEffect(() => {
        if (isFirstRender) {
            openChat();
        }
    }, [isFirstRender]);

    const [formData, setFormData] = useState({
        name: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const gotowhatsapp = () => {
        const { name } = formData;

        const url =
            `https://wa.me/9667373162?text=` +
            `${name}%0a`;

        window.open(url, '_blank').focus();
    };

    return (
        <>
            {!isChatOpen && !isFirstRender && (
                <button id="openChatBtn" className="fade-in-button" onClick={openChat}>
                    <img src={Hype} alt="" width="50" height="50"
                        style={{ border: '2px solid #003C71', borderRadius: '50rem' }} />
                    {/* <i class="fa-brands fa-square-whatsapp text-success" style={{ fontSize: '40px' }}></i> */}
                </button>
            )}






            <footer className='shadow-sm w-100' style={{ borderTop: '1px solid #003C71' }}>
                <div class="footer-content">
                    <div class="footer-section footer-logo">
                        <img src={logo} alt="Your Company Logo" />
                    </div>
                    <div class="footer-section footer-info" style={{ textAlign: 'justify' }}>
                        <p>Hike</p>
                        <p>123 Main Street, Cityville,
                            State 12345</p>
                        <p>Phone: (123) 456-7890</p>
                        <p>Email: infostackedlight@gmail.com</p>
                    </div>
                    <div class="footer-section footer-links" style={{ textAlign: 'justify' }}>
                        <ul style={{ listStyleType: 'none' }}>
                            <li>
                                <Link to="#">Home</Link>
                            </li>
                            <li>
                                <Link to="#">About Us</Link>
                            </li>
                            <li>
                                <Link to="#">Services</Link>
                            </li>
                        </ul>
                    </div>
                    <div class="footer-section footer-links" style={{ textAlign: 'justify' }}>
                        <ul style={{ listStyleType: 'none' }}>
                            <li>
                                <Link to="#">Blog</Link>
                            </li>
                            <li>
                                <Link to="#">Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                    <div class="footer-section footer-social">

                        {/*
        <Link to="#" className='w-100'>

        <div className='w-100 my-btn mb-2 fw-bold'>
            <i class="fa-brands fa-google-plus float-start mt-1"></i> Offical Site
        </div>
        </Link> */}

                        <Link to="#" className='w-100'>
                            {/* <i class="fa-brands fa-google-plus"></i> */}
                            <div className='w-100 btn btn-outline-danger mb-2 fw-bold'>
                                <i class="fa-brands fa-google-plus float-start mt-1"></i> Google
                            </div>
                        </Link>

                        <Link to="#" className='w-100'>
                            {/* <i class="fa-brands fa-google-plus"></i> */}
                            <div className='w-100 btn btn-outline-primary mb-2 fw-bold'>
                                <i class="fa-brands fa-facebook float-start mt-1"></i> FaceBook
                            </div>
                        </Link>

                        <Link to="#" className='w-100'>
                            {/* <i class="fa-brands fa-google-plus"></i> */}
                            <div className='w-100 btn btn-outline-success mb-2 fw-bold'>
                                <i class="fa-brands fa-square-whatsapp float-start mt-1"></i> WhatsApp
                            </div>
                        </Link>

                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2023 Hike. All rights reserved. |
                        <Link to="#">Privacy Policy</Link> |
                        <Link to="#">Terms of
                            Service</Link>
                    </p>
                </div>
            </footer>
        </>
    )
}

export default DeskTopFooter