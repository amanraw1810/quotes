import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [state, setState] = useState([]);
    const _useNavigate = useNavigate()
    const logout = () => {
        if (localStorage.getItem("_token")) {
            localStorage.removeItem("_token")
        }
        else {
            _useNavigate("/login")
        }
    }
    useEffect(() => {
        axios.get("http://localhost:4004/signup-details")
            .then((res) => {
                setState(res.data.record);
            })
        if (localStorage.getItem("_token")) {

        }
        else {
            _useNavigate("/login")
        }
    }, [])
    const [isSidebarToggled, setSidebarToggled] = useState(localStorage.getItem('sb|sidebar-toggle') === 'true');

    useEffect(() => {
        if (isSidebarToggled) {
            document.body.classList.add('sb-sidenav-toggled');
        } else {
            document.body.classList.remove('sb-sidenav-toggled');
        }
        // Cleanup function to remove the class from body
        return () => {
            document.body.classList.remove('sb-sidenav-toggled');
        };
    }, [isSidebarToggled]);

    const toggleSidebar = () => {
        setSidebarToggled(!isSidebarToggled);
        localStorage.setItem('sb|sidebar-toggle', !isSidebarToggled);
    };
    return (
        <>
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">

                <a className="navbar-brand ps-3 fw-bolder text-start" href="index.html">Admin Panel</a>

                <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" onClick={toggleSidebar}><i className="fas fa-bars"></i></button>


                <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                        <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
                    </div>
                </form>



                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li className="nav-item ">
                        <a className="nav-link " href="" onClick={logout}  >
                            <i className="fas fa-user fa-fw"></i>Logout
                        </a>

                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Header