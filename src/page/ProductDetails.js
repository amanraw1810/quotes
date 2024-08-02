import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cardSlice';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function ProductDetails() {
    const dispatch = useDispatch();

    const [isWebShareSupported, setIsWebShareSupported] = useState(false);
    const [product, setProduct] = useState({
        brand_name: '',
        main_category_name: '',
        category_name: '',
        sub_category_name: '',
        product_name: '',
        product_size_qty: '',
        product_price_before:'',
        product_price_after:'',
        product_icon: [],
        price: 0,
    });
    const [showModal, setShowModal] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const shareButton = document.getElementById('shareButton');

        if (navigator.share) {
            setIsWebShareSupported(true);

            shareButton.addEventListener('click', () => {
                navigator
                    .share({
                        title: 'Share Example',
                        text: 'Check out this awesome content!',
                        url: window.location.href,
                    })
                    .then(() => console.log('Shared successfully.'))
                    .catch((error) => console.error('Share failed:', error));
            });
        } else {
            setIsWebShareSupported(false);
        }

        return () => {
            if (shareButton) {
                shareButton.removeEventListener('click', () => { });
            }
        };
    }, []);

    useEffect(() => {
        axios
            .get(`http://localhost:4004/product-details/${id}`)
            .then((res) => {
                setProduct(res.data.data);
                return res.data.data.sub_category_name;
            })
            .then((subCategory) => {
                axios
                    .get(`http://localhost:4004/similar-products?sub_category_name=${subCategory}`)
                    .then((res) => {
                        setSimilarProducts(res.data.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching similar products:', error);
                    });
            })
            .catch((error) => {
                console.error('Error fetching product details:', error);
            });
    }, [id]);

    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 7000,
    };

    const handleThumbnailClick = (index) => {
        setSelectedImageIndex(index);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedImageIndex(null);
    };

    const renderSizeQty = () => {
        if (!product.product_size_qty) {
            return null;
        }

        const sizeQtyPairs = product.product_size_qty.split(',');

        return sizeQtyPairs.map((pair) => {
            const [size, qty] = pair.split('=');
            return (
                <div key={size} className="d-flex align-items-center mt-2 mx-2">
                    <button
                        type='button'
                        key={size}
                        className={`btn ${selectedSize === size ? 'btn-primary' : 'btn-outline-primary'} mx-0`}
                        onClick={() => setSelectedSize(size)}
                    >
                        <span className="me-2" style={{ borderRadius: '50rem' }}>{size}</span>
                    </button>
                    <sup className="badge bg-danger mr-3 mb-2">{qty}</sup>
                </div>
            );
        });
    };

    const addToCartData = () => {
        if (!selectedSize) {
            alert('Please select a size.');
            return;
        }
    
        const productWithSize = {
            id: product._id,
            product_name: product.product_name,
            selectedSize,
            price: product.product_price_after,
            product_icon: product.product_icon[0]
        };
    
        dispatch(addToCart(productWithSize));
    
        // Show toast message
        toast.success('Item Added to cart!', {
            position: 'top-center',
            autoClose:'1000'
        });
    };

    const calculateDiscountPercentage = (oldPrice, newPrice) => {
        const discount = Math.round(((oldPrice - newPrice) / oldPrice) * 100); // Round to the nearest integer
        return discount;
    };

    return (
        <>
        <ToastContainer />
            <div className='container mb-5' style={{ marginTop: '80px' }}>
                <div className='parent-container'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='banner-slider-container bg-light'>
                                <Slider {...settings}>
                                    {product.product_icon.map((icon, index) => (
                                        <div key={index} style={{ cursor: 'pointer' }} onClick={() => handleThumbnailClick(index)}>
                                            <img src={`http://localhost:4004/uploads/${icon}`} alt={icon} style={{ width: '100%', margin: '5px' }} />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>

                        <div className='col-md-8'>
                            <div className='text-start'>
                                <h6 className='mt-3'>
                                    <span className='fs-5 text-danger'>{product.brand_name}</span>
                                    <span>
                                        <button
                                            type='button'
                                            id='shareButton'
                                            className={`btn btn-success float-end ${isWebShareSupported ? '' : 'd-none'}`}
                                        >
                                            <i className='fa-solid fa-share fs-3 float-end'></i>
                                        </button>
                                        <button type='button' className='btn btn-danger float-end mx-2'>
                                            <i className='fa-solid fa-heart fs-3 float-end'></i>
                                        </button>
                                    </span>
                                </h6>

                                <h3 className='fw-bold mt-3'>{product.product_name}</h3>

                                <div className='text-danger mt-3'>
                                    <span className='btn btn-success' style={{ backgroundColor: 'green', fontSize: '14px' }}>
                                        4.3 <i className='fa-solid fa-star' style={{ fontSize: '14px' }}></i>
                                    </span>{' '}
                                    143 Ratings & 27 Reviews
                                </div>

                                <div className='mt-3'>
                                    Product highlights
                                    <ul>
                                        <li>Water-soluble calcium form that is easily absorbed</li>
                                        <li>Rich source of vitamins and minerals</li>
                                        <li>Helps make the bones stronger</li>
                                        <li>Supports bone and muscle health</li>
                                    </ul>
                                </div>

                                <div className='mt-3 px-3'>
                                    <span className='fs-2 fw-bold text-success'> {calculateDiscountPercentage(product.product_price_before, product.product_price_after)}% off</span>
                                    <span className='fs-2 fw-bold text-muted'> <del>₹{product.product_price_before}</del></span>
                                    <span className='fs-2 fw-bold'> ₹{product.product_price_after}</span>
                                </div>

                                <div className='mt-3 px-3'>
                                    <div className='fw-bold text-muted fs-5'>Color : Red</div>
                                </div>

                                <div className='mt-3 px-3' align={'center'}>
                                    <label htmlFor='' className='float-start fw-bold text-muted fs-5'>
                                        Available Size Quantities:
                                    </label>
                                    <div className='scroll-container w-100 d-flex'>
                                        {renderSizeQty()}
                                    </div>
                                </div>

                                <div className='mt-3 d-flex' align={'center'}>
                                    <button className='my-btn1 mx-4 w-50'>
                                        <i className='fa-solid fa-bag-shopping'></i> Buy Now
                                    </button>
                                    <button type="button" onClick={addToCartData} className='btn btn-success mx-4 w-50'>
                                        <i className='fa-solid fa-cart-plus'></i> Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        <Modal show={showModal} onHide={handleModalClose} dialogClassName='modal-fullscreen'>
                            <Modal.Header closeButton>
                                <Modal.Title>Product Preview</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className='banner-slider-container bg-light'>
                                    <Slider {...settings}>
                                        {selectedImageIndex !== null && (
                                            <img
                                                src={`http://localhost:4004/uploads/${product.product_icon[selectedImageIndex]}`}
                                                alt={product.product_icon[selectedImageIndex]}
                                                style={{ width: '100%' }}
                                            />
                                        )}
                                        {product.product_icon.map((icon, index) => (
                                            <div key={index}>
                                                <img
                                                    src={`http://localhost:4004/uploads/${icon}`}
                                                    alt={icon}
                                                    style={{ width: '100%', margin: '5px', objectFit: 'contain' }}
                                                />
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>{/* Footer content */}</Modal.Footer>
                        </Modal>
                    </div>

                    <div className="row mt-5">
                        <h2 className='text-start fw-bold text-muted'>Similar Products</h2>
                        {similarProducts.map((item, index) => (
                            <div className="col-md-2" style={{ height: '300px', marginBottom: '3%' }} key={index}>
                                <div className='shadow-sm rounded px-0 mx-3' style={{ height: '320px' }}>
                                    <Link to={`product - detail / ${item._id}`} className='text-decoration-none'>
                                        <img src={`http://localhost:4004/uploads/${item.product_icon[0]}} alt={item.product_icon[0]} style={{ height: '190px', margin: '5px', }`} />
                                    </Link>
                                    <div className='text-center overflow-hidden px-3' style={{ color: '#003C71' }}>
                                        <h6 className='card-title'>
                                            <strong className='text-muted fw-bold'>
                                                {item.brand_name.substring(0, 10)}
                                            </strong>
                                        </h6>
                                        <p>{item.main_category_name.substring(0, 10)}</p>
                                        <div className='my-3'>
                                            <Link className='w-100 my-btn text-decoration-none' to={`product - detail / ${item._id}`}>
                                                Buy Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div >
                </div >
            </div >
        </>
    );
}

export default ProductDetails;
