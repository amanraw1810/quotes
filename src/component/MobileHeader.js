import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../my_Logo/favicon4.ico';
import axios from 'axios';
import React, { useState } from 'react';

function MobileHeader() {
    const [suggestions, setSuggestions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const _useNavigate = useNavigate();
    const handleSearchChange = async (event) => {
        const { value } = event.target;
        setSearchQuery(value);

        // Hide suggestions if input field is empty
        if (!value) {
            setSuggestions([]);
            return;
        }

        // Fetch suggestions based on the current input value
        try {
            const response = await axios.get(`http://localhost:4004/search-suggestions/${value}`);

            // Check if response data is an array
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
        setSuggestions([]); // Hide suggestion list
        _useNavigate(`/searching-product/${suggestion.product_name}`);
    }
    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div class="container-fluid m-0">
                    {/* <Link class="navbar-brand m-0 p-0" to="/"><img src="my_Logo/mobile.png" alt="" class="mobilelogo" /></Link> */}
                    <Link class="navbar-brand mt-2 m-0 p-0" to="/"><img src={logo} alt="" class="mobilelogo" /></Link>

                    <form class="d-flex m-0 p-0" role="search">
                        <input class="form-control" type="search" onChange={handleSearchChange} placeholder="Search" aria-label="Search" style={{ border: '2px solid #003C71' }} />
                    </form>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{ border: '2px solid #003C71' }}>
                        {/* <span class="navbar-toggler-icon text-danger" style={{ color: '#003C71' }}></span> */}
                        <i class="fa-solid fa-bars fs-2" style={{ color: '#003C71' }}></i>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="contact">Contact</Link>
                            </li>
                            <li class="nav-item dropdown">
                                <Link class="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </Link>
                                <ul class="dropdown-menu">
                                    <li><Link class="dropdown-item" to="#">Action</Link></li>
                                    <li><Link class="dropdown-item" to="#">Another action</Link></li>
                                    {/* <li><hr class="dropdown-divider"></li> */}
                                    <li><Link class="dropdown-item" to="#">Something else here</Link></li>
                                </ul>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>
            {suggestions.length > 0 && (
                <ul className="suggestions-list list-group shadow-sm position-absolute w-100 text-start">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} className="list-group-item suggestion-item" onClick={() => handleSuggestionClick(suggestion)}>
                            <small className="mb-0 fw-bold">{suggestion.product_name}</small>
                        </li>
                    ))}

                    {suggestions.map((suggestion, index) => (
                        <li key={index} className="list-group-item suggestion-item" onClick={() => handleSuggestionClick(suggestion)}>
                            <small className="fw-bold">{suggestion.category_name}</small>
                        </li>
                    ))}

                    {suggestions.map((suggestion, index) => (
                        <li key={index} className="list-group-item suggestion-item" onClick={() => handleSuggestionClick(suggestion)}>

                            <small className="fw-bold">{suggestion.sub_category_name}</small>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default MobileHeader