import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';
// import request from 'superagent';


function RegistrationList() {
    const [state, setState] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const getTotal = (async () => {
        try {
            let response = await axios.get("http://localhost:3008/registration")
            //  console.log(response);
            //  console.log(response.data.length);
            setTotal(response.data.length / 6);
            //  console.log(response.data.length/5);
        }
        catch (error) { console.log(error) }
    })



    getTotal();


    const getData = (async () => {
        try {
            let response = await axios.get("http://localhost:3008/registration?_page=" + page + "&_limit=6")
            console.log(response);
            setState(response.data);
        }
        catch (error) { console.log(error) }
    })

    useEffect(() => {
        getData();
    }, [])

    const handlePageClick = (data) => {
        console.log(data);
        setPage(data.selected + 1);
    }

    const deleteRecord = (id) => {

        Swal.fire({
            title: "Are you sure want to delete this Id " + id + " ?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete("http://localhost:3008/registration/" + id)
                    .then((res) => {
                        // console.log(res);
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        getData();
                    })

            }
        });
    }
    return (
        <>
            <div className="conatiner py-5 my-5 overflow-hidden">
                <div className="row">
                    <div className="my-title fs-1  fw-bold mb-3">
                        Registration List
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <div className='table-responsive'>
                            <table align='center' class="table table-light table-striped">
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Mobile Number</th>
                                        <th>Password</th>
                                        <th>Delete</th>
                                        <th>Edit</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        state.map((item, index) =>
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.first_name}</td>
                                                <td>{item.last_name}</td>
                                                <td>{item.email_id}</td>
                                                <td>{item.mobile_no}</td>
                                                <td>{item.password}</td>
                                                <td>

                                                    <button type='button' className='my-btn1' onClick={() => { deleteRecord(item.id) }} >Delete</button>
                                                </td>
                                                <td style={{ paddingTop: '19px' }}>
                                                    <Link className='text-decoration-none my-btn' to={`/edit/${item.id}`}>Edit</Link>


                                                </td>

                                            </tr>)
                                    }
                                </tbody>
                            </table>
                            <ReactPaginate
                                previousLabel={'< Previous'}
                                nextLabel={'Next >'}
                                breakLabel={'...'}
                                pageCount={total}

                                marginPagesDisplayed={3}
                                pageRangeDisplayed={6}
                                onPageChange={handlePageClick}
                                containerClassName={'pagination'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                previousClassName={'page-item'}
                                previousLinkClassName={'page-link'}
                                nextClassName={'page-item'}
                                nextLinkClassName={'page-link'}
                                breakClassName={'page-item'}
                                breakLinkClassName={'page-link'}
                                activeClassName={'active'}
                            />
                        </div>
                    </div>
                    <div className="col-md-1"></div>

                </div>
            </div>
        </>
    )
}

export default RegistrationList