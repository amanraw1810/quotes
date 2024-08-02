import Hype from '../my_Logo/status1.jpg';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
function Collapsible({ title, content, isActive, toggleCollapsible }) {




    return (
        <>



            <div className="container m-0 p-0" >
                {/* <h4 className='fw-bold float-start mx-2 text-muted'> Data By Categories</h4> */}
                <button type="button" style={{ borderRadius: '0px' }} className={`collapsible my-btn w-100 ${isActive ? 'active' : ''}`} onClick={toggleCollapsible}>
                    <span className="ms-3 float-start">{title}</span>
                    <i className={`fa-solid fa-angle-${isActive ? 'down' : 'up'} float-end mt-1`}></i>
                </button>
                <div className="content" style={{ display: isActive ? 'block' : 'none' }}>
                    <p dangerouslySetInnerHTML={{ __html: content }}></p>
                </div>
            </div>
        </>

    );
}

function MobileFooter() {
    const [activeCollapsible, setActiveCollapsible] = useState(null);

    const toggleCollapsible = (index) => {
        setActiveCollapsible(activeCollapsible === index ? null : index);
    };

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
                <button id="openChatBtn1" className="fade-in-button" onClick={openChat}>
                    <img src={Hype} alt="" width="50" height="50"
                        style={{ border: '2px solid #003C71', borderRadius: '50rem' }} />
                </button>
            )}

            {isChatOpen && (
                <div id="chatPopup1" className="fade-in-popup rounded">
                    <div id="chatHeader">
                        <div class="text-light fw-bold d-flex">
                            <div style={{ border: '2px solid white', borderRadius: '50rem' }}>
                                <img src={Hype} alt="Northern Lights" width="50" height="50"
                                    style={{ border: '2px solid #003C71', borderRadius: '50rem' }} />
                            </div>
                            <h2 className='mx-2 mt-2 pt-1'>Hiker Hype</h2>
                            <a href="https://wa.me/9667373162" className="text-decoration-none mt-2 mx-5" target='_blank' rel='noopener noreferrer'> <i class="fa-brands fa-square-whatsapp text-success" style={{ fontSize: '40px' }}></i></a>
                        </div>
                        <span id="closeChatBtn" onClick={closeChat}>&times;</span>



                    </div>
                    <div id="chatBody">
                        {/* <div className="chat mb-3">
                        <i class="fa-brands fa-square-whatsapp text-success" style={{ fontSize: '40px' }}></i>
                        <p className="txt m-2">
                            <a href="https://wa.me/9667373162" className="text-decoration-none" target='_blank' rel='noopener noreferrer'> Tap to Chat in What's app</a>
                        </p>
                    </div> */}
                        <div className="chat">
                            <img src={Hype} className='chatimg' alt="user" />
                            <p className="txt bg-light p-2 rounded">
                                Welcome to our Hiker Hype how may i help you
                            </p>

                        </div>

                        <div className="chat float-end">
                            <p className="txt bg-light p-2 rounded mx-2">
                                Welcome to our Hiker Hype how may i help you
                            </p>
                            <img src={Hype} className='chatimg' alt="user" />


                        </div>
                    </div>
                    <div id="chatFooter">
                        <input type="text" id="messageInput" className='rounded px-2 outline-none' style={{ border: '1px solid #003C71', outline: 'none' }} name="name" value={formData.name} onChange={handleChange} placeholder="Type your message..." />
                        <button id="sendBtn" className='my-btn' onClick={gotowhatsapp}>Send</button>
                    </div>
                </div>
            )}

            <Collapsible title="Contact Us" content="
            <Link to='' className='textdecoration w-100'>
            <address style='text-align:justify;padding:5%;font-weight:bold'><p>Hike</p>
            <p>123 Main Street, Cityville,
                State 12345</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: infostackedlight@gmail.com</p></address>

        </Link >"isActive={activeCollapsible === 0} toggleCollapsible={() => toggleCollapsible(0)} className='bg-dark' />



            <footer id="sticky-footer" className="my_display flex-shrink-0 text-light-20 text-center" style={{ marginTop: '80px', }}>

                <nav className='navbar navbar-expand-lg bg-light fixed-bottom d-flex overflow-hidden text-center'>
                    <div className='container-fluid text-center'>

                        <Link className='navbar-brand text-center' to='/'>
                            <i class="fa-solid fa-house-user" style={{ color: '#003C71' }}></i>
                            <div className='text-center fs-6'>
                                Home
                            </div>
                        </Link>

                        <Link className='navbar-brand text-center' to='chat'>
                            <i class="fa-solid fa-tags" style={{ color: '#003C71' }}></i>
                            <div className='text-center fs-6'>
                                Offers
                            </div>
                        </Link>

                        <Link className='navbar-brand text-center' to='payment'>
                            <i class="fa-solid fa-square-plus" style={{ color: '#003C71' }}></i>
                            <div className='text-center fs-6'>
                                Categories
                            </div>
                        </Link>

                        <Link className='navbar-brand text-center' to='cart'>
                            <i class="fa-solid fa-cart-flatbed-suitcase" style={{ color: '#003C71' }}></i>
                            <div className='text-center fs-6'>
                                Cart
                            </div>
                        </Link>



                        <Link className='navbar-brand text-center' to='map' style={{ marginRight: '-0px', }}>
                            <i class="fa-solid fa-square-rss" style={{ color: '#003C71' }}></i>
                            <div className='text-center fs-6'>
                                Blogs
                            </div>
                        </Link>


                    </div>
                </nav>

            </footer>
        </>
    )
}

export default MobileFooter