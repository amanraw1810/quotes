
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';




const Sidebar = () => {

    return (
        <>
            <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Core</div>
                            <Link className="nav-link" to="/">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Dashboard
                            </Link>
                            <div className="sb-sidenav-menu-heading">Interface</div>

                            <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts1" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Login Details
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>
                            <div className="collapse" id="collapseLayouts1" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="/sign-up">Sign Up</Link>
                                    <Link className="nav-link" to="login">Login</Link>
                                </nav>
                            </div>


                            <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#E-commerce" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                E-commerce
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>
                            <div className="collapse" id="E-commerce" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="/brand">Brand</Link>
                                    <Link className="nav-link" to="/main-category">Main Category</Link>
                                    <Link className="nav-link" to="/category">Category</Link>
                                    <Link className="nav-link" to="/sub-category">Sub Category</Link>
                                    <Link className="nav-link" to="/product">Products</Link>
                                </nav>
                            </div>


                        </div>
                    </div>

                </nav>
            </div>

        </>
    )
}

export default Sidebar
