import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../my_Logo/favicon4.ico';
import axios from 'axios';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux
import { selectTotalCartItems } from '../store/slices/cardSlice'; // Adjust the path as per your project structure

// Header component
function DeskTopHeader() {
    const totalCartItems = useSelector(selectTotalCartItems); // Select total cart items from Redux state

    const [toggle, setToggle] = useState(0);
    const [activeMegaMenu1, setActiveMegaMenu1] = useState(null);
    const [mainCategoryList, setMainCategoryList] = useState([]);
    const [CategoryList, setCategoryList] = useState([]);
    const [SubCategoryList, setSubCategoryList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const megaMenuRef1 = useRef(null);
    const navigate = useNavigate();

    // useEffect(() => {
    //     axios.get("http://localhost:4004/signup-details")
    //         .then((res) => {
    //             // Assuming you need to do something with res.data.record
    //             // Replace or use this data appropriately
    //         });

    //     if (!localStorage.getItem("_token")) {
    //         navigate("/login");
    //     }
    // }, [navigate]);

    useEffect(() => {
        const fetchMainCategoryList = async () => {
            try {
                const response = await axios.get('http://localhost:4004/main-category-details');
                setMainCategoryList(response.data.data);
            } catch (error) {
                console.error('Error fetching Main Category details:', error);
            }
        };

        fetchMainCategoryList();
    }, []);

    useEffect(() => {
        const fetchCategoryList = async () => {
            try {
                const response = await axios.get('http://localhost:4004/category-details');
                setCategoryList(response.data.data);
            } catch (error) {
                console.error('Error fetching Main Category details:', error);
            }
        };

        fetchCategoryList();
    }, []);

    useEffect(() => {
        const fetchSubCategoryList = async () => {
            try {
                const response = await axios.get('http://localhost:4004/sub_category-details');
                setSubCategoryList(response.data.data);
            } catch (error) {
                console.error('Error fetching Main Category details:', error);
            }
        };

        fetchSubCategoryList();
    }, []);

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const response = await axios.get('http://localhost:4004/product-details');
                setProductList(response.data.data);
            } catch (error) {
                console.error('Error fetching Product details:', error);
            }
        };

        fetchProductList();
    }, []);

    const handleMouseEnter1 = useCallback((megaMenuId) => {
        setToggle(1);
        setActiveMegaMenu1(megaMenuId);
    }, []);

    const handleMouseLeave1 = useCallback(() => {
        setToggle(0);
        setActiveMegaMenu1(null);
    }, []);

    useEffect(() => {
        const handleClickOutside1 = (event) => {
            if (
                megaMenuRef1.current &&
                !megaMenuRef1.current.contains(event.target) &&
                event.target.getAttribute('id') !== ''
            ) {
                handleMouseLeave1();
            }
        };

        document.addEventListener('click', handleClickOutside1);

        return () => {
            document.removeEventListener('click', handleClickOutside1);
        };
    }, [handleMouseLeave1]);

    const renderMegaMenu1 = useCallback((megaMenuId) => {
        const services = productList.filter(product => product.main_category_name === megaMenuId);
        return (
            <div className={toggle === 1 ? "mega-menu-show" : "mega-menu"} ref={megaMenuRef1}>
                <MegaMenu1 services={services} handleMouseLeave={handleMouseLeave1} />
            </div>
        );
    }, [toggle, productList, handleMouseLeave1]);

    const handleSearchChange = async (event) => {
        const { value } = event.target;
        setSearchQuery(value);

        if (!value) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:4004/search-suggestions/${value}`);
            if (Array.isArray(response.data.suggestions)) {
                setSuggestions(response.data.suggestions);
            } else {
                console.error('Invalid response format: Expected an array');
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion.product_name);
        setSuggestions([]);
        navigate(`/searching-product/${suggestion.product_name}`);
    };

    const logout = () => {
        localStorage.removeItem("_token");
        navigate("/login");
    };

    // MegaMenu component
    const MegaMenu1 = ({ services, handleMouseLeave }) => {
        // Create a set to store unique sub-category names
        const uniqueSubCategories = new Set();

        // Group services by category_name and collect unique sub-categories
        const groupedServices = services.reduce((acc, service) => {
            if (!acc[service.category_name]) {
                acc[service.category_name] = [];
            }
            // Check if the sub-category name is not already added
            if (!uniqueSubCategories.has(service.sub_category_name)) {
                acc[service.category_name].push(service.sub_category_name);
                uniqueSubCategories.add(service.sub_category_name);
            }
            return acc;
        }, {});

        return (
            <div className="mega-menu-content" onMouseLeave={handleMouseLeave}>
                <div className="row">
                    {Object.keys(groupedServices).map((categoryName, index) => (
                        <div key={index} className="col-sm-2 w-25 mega-menu-column">
                            <Link className="mega-menu-link" to={`sub-category/${categoryName}`}>
                                <h5 className='fw-bold text-muted'>{categoryName}</h5>
                            </Link>
                            <ul className="list-unstyled mb-0">
                                {groupedServices[categoryName].map((subCategory, idx) => (
                                    <li key={idx}>
                                        <Link className="mega-menu-link" to={`sub-category/${subCategory}`}>
                                            {subCategory}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        );
    };


    return (
        <>
            <nav className="navbar navbar-expand-lg sticky-top shadow-sm p-0">
                <div className="container p-0">
                    <Link className="navbar-brand" to="/"><img src={logo} alt="logo" className="logoimg" /></Link>
                    <ul className="navbar-nav">
                        {mainCategoryList.map((item, index) => (
                            <li key={index} className="nav-item services-nav-item mx-2" id="servicesNavItem1" ref={megaMenuRef1}>
                                <Link className="nav-link my-btn fw-bold" to="#" onMouseEnter={() => handleMouseEnter1(item.main_category_name)}>{item.main_category_name}</Link>
                                {activeMegaMenu1 === item.main_category_name && renderMegaMenu1(activeMegaMenu1)}
                            </li>
                        ))}
                    </ul>
                    <ul className="navbar-nav m-auto">
                        <form className="d-flex position-relative w-100" role="search">
                            <input
                                className="form-control me-2 outline-none"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                style={{ border: '1px solid #003C71' }}
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <button className="my-btn" type="submit">Search</button>
                        </form>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link my-btn mt-2 mx-2" to="contact"> Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link my-btn mt-2 mx-2" to="cart">
                                <i className="fa-solid fa-cart-plus"></i><sup className='badge bg-danger'>{totalCartItems}</sup>
                            </Link>
                        </li>
                        {localStorage.getItem("_token") ? (
                            <>
                                <li className="nav-item">
                                    <button className="nav-link my-btn mt-2 mx-2" onClick={logout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link my-btn mt-2 mx-2" to="/login"> <i className="fa-solid fa-right-to-bracket"></i>Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
            {suggestions.length > 0 && (
                <ul className="suggestions-list list-group shadow-sm position-absolute w-100 text-start">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} className="list-group-item suggestion-item" onClick={() => handleSuggestionClick(suggestion)}>
                            <small className="mb-0 fw-bold">{suggestion.product_name}</small>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

export default DeskTopHeader;