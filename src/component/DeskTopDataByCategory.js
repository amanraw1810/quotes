import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function DeskTopDataByCategory() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const _useNavigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:4004/category-details')
            .then((res) => {
                setCategories(res.data.data);
            })
            .catch((error) => {
                console.error('Error fetching Category details:', error);
            });

        axios.get('http://localhost:4004/product-details')
            .then((res) => {
                setProducts(res.data.data);
            })
            .catch((error) => {
                console.error('Error fetching Products:', error);
            });
    }, []);

    const handleCategoryClick = (category_name) => {
        setSelectedCategory(category_name);
    };

    // Filter products based on selected category
    const filteredProducts = selectedCategory ?
        products.filter(product => product.category_name === selectedCategory.category_name) :
        products;


    const goToNext = (id) => {
        // alert(id)
        _useNavigate(`product-detail/${id}`)
    }
    return (
        <div className='container'>
            <h2 className='text-start fw-bold text-muted'>Get data by category</h2>
            <div className="row">
                <div className="col-md-2">
                    <ul className="list-group" style={{ listStyleType: 'none' }}>
                        <li
                            key="all"
                            className={`my-btn`} style={{ background: '#003C71', color: 'white', cursor: 'pointer' }}
                            onClick={() => handleCategoryClick(null)}
                        >
                            All
                            <i className="fa-solid fa-caret-right float-end mt-1"></i>
                        </li>
                        {categories.slice(0, 5).map((item, index) => (
                            <li
                                key={index}
                                className={`my-btn mt-2`}
                                onClick={() => handleCategoryClick(item)} style={{ cursor: 'pointer' }}
                            >
                                {item.category_name}
                                <i className="fa-solid fa-caret-right float-end mt-1"></i>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-md-10">
                    <div className='scroll-container d-flex'>
                        {filteredProducts.map((item, index) => (
                            <div key={index} className='shadow-sm rounded px-0 mx-3' style={{ height: '320px' }}>
                                <Link to={`product-detail/${item.id}`} className='text-decoration-none'>
                                    <img src={`http://localhost:4004/uploads/${item.product_icon[2]}`} alt={item.product_icon[2]} style={{ height: '190px', margin: '5px', objectFit: 'cover' }} />

                                    {/* <img src={`http://localhost:4004/uploads/${item.product_icon}`} alt={item.product_icon} style={{ width: '80px', height: '60px', objectFit: 'contain' }} /> */}
                                </Link>
                                <div className='text-center overflow-hidden px-3' style={{ color: '#003C71' }}>
                                    <h6 className='card-title'>
                                        <strong className='text-muted fw-bold'>
                                            {item.brand_name}
                                        </strong>
                                    </h6>
                                    <p>{item.main_category_name}</p>
                                    <div className=' my-3'>
                                        {/* <Link className='w-100 my-btn text-decoration-none' to={`product-detail/${item._id}`}>
                                            Buy Now
                                        </Link> */}


                                        <input type="submit" value={'Buy Now'} className='w-100 my-btn text-decoration-none' onClick={() => { goToNext(item._id) }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeskTopDataByCategory;
