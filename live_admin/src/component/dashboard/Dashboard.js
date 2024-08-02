import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Header from '../header/Header'

import Sidebar from '../sidebar/Sidebar'
import Footer from '../footer/Footer'






function Dashboard() {


    const [state, setState] = useState([]);
    const _useNavigate = useNavigate()
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


    return (
        <>
            <body className="sb-nav-fixed">

                <Header />

                <div id="layoutSidenav">
                    <Sidebar />
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid px-4">
                                <h1 className="mt-4">Dashboard</h1>
                                <ol className="breadcrumb mb-4">
                                    <li className="breadcrumb-item active">Dashboard</li>
                                </ol>
                                <div className="row">
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card bg-primary text-white mb-4">
                                            <div className="card-body">Primary Card</div>
                                            <div className="card-footer d-flex align-items-center justify-content-between">
                                                <a className="small text-white stretched-link" href="#">View Details</a>
                                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card bg-warning text-white mb-4">
                                            <div className="card-body">Warning Card</div>
                                            <div className="card-footer d-flex align-items-center justify-content-between">
                                                <a className="small text-white stretched-link" href="#">View Details</a>
                                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card bg-success text-white mb-4">
                                            <div className="card-body">Success Card</div>
                                            <div className="card-footer d-flex align-items-center justify-content-between">
                                                <a className="small text-white stretched-link" href="#">View Details</a>
                                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6">
                                        <div className="card bg-danger text-white mb-4">
                                            <div className="card-body">Danger Card</div>
                                            <div className="card-footer d-flex align-items-center justify-content-between">
                                                <a className="small text-white stretched-link" href="#">View Details</a>
                                                <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-6">
                                        <div className="card mb-4">
                                            <div className="card-header">
                                                <i className="fas fa-chart-area me-1"></i>
                                                Area Chart Example
                                            </div>
                                            <div className="card-body"><canvas id="myAreaChart" width="100%" height="40"></canvas></div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="card mb-4">
                                            <div className="card-header">
                                                <i className="fas fa-chart-bar me-1"></i>
                                                Bar Chart Example
                                            </div>
                                            <div className="card-body"><canvas id="myBarChart" width="100%" height="40"></canvas></div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <Footer />
                        </main>

                    </div>

                </div>

            </body>
        </>
    )
}

export default Dashboard
