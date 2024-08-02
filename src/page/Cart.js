import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart,updateCartItemQuantity } from '../store/slices/cardSlice'; // Adjust the path to your cartSlice file
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Cart() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const cartTotalQty = useSelector((state) => state.cart.cartTotalQty); // Fetch total quantity from Redux
    const dispatch = useDispatch();

    const handleRemoveFromCart = (id, selectedSize) => {
        dispatch(removeFromCart({ id, selectedSize }));
        toast.error('Item removed from cart');
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        toast.error('Cart cleared');
    };

    const handleQuantityChange = (id, selectedSize, newQuantity) => {
        dispatch(updateCartItemQuantity({ id, selectedSize, newQuantity }));
    };

    const calculateItemTotal = (item) => {
        return item.cartQuantity * item.price;
    };

    const totalAmount = cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-md-9">
                    <h2 className="mb-4">My Cart</h2>
                    <div className='mb-2' style={{textAlign:"right"}}> <button className="btn btn-primary w-25 " onClick={handleClearCart}>Clear Cart</button></div>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Product</th>
                                    <th scope="col">Size</th>
                                    <th scope="col">Color</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={`${item.id}-${item.selectedSize}`}>
                                        <td data-label="Product">
                                            <div className="cart-item">
                                                <img
                                                    className="cart-item-image"
                                                    src={`http://localhost:4004/uploads/${item.product_icon}`}
                                                    style={{width:"100px",height:"60px",objectFit:"contain"}}
                                                    alt={item.product_name}
                                                />
                                                <div className="cart-item-details">
                                                    <a href={`product-detail/${item.id}`} className='text-decoration-none'>
                                                        <span style={{fontSize:"12px"}}>{item.product_name}</span>
                                                    </a>
                                                 
                                                </div>
                                            </div>
                                        </td>
                                        <td data-label="Size">{item.selectedSize}</td>
                                        <td data-label="Color">Red</td> {/* Replace with actual color */}
                                        <td data-label="Quantity">
                                            <div className="input-group">
                                                <button
                                                    className="btn btn-sm btn-outline-secondary"
                                                    type="button"
                                                    onClick={() => handleQuantityChange(item.id, item.selectedSize, item.cartQuantity - 1)}
                                                    disabled={item.cartQuantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span className="input-group-text">{item.cartQuantity}</span>
                                                <button
                                                    className="btn btn-sm btn-outline-secondary"
                                                    type="button"
                                                    onClick={() => handleQuantityChange(item.id, item.selectedSize, item.cartQuantity + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td data-label="Price">₹ {item.price}</td>
                                        <td data-label="Total">₹ {calculateItemTotal(item)}</td>
                                        <td data-label="Remove" className='text-center'>
                                            <button className="btn btn-sm btn-danger" onClick={() => handleRemoveFromCart(item.id, item.selectedSize)}>
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Cart Summary</h5>
                            <p>Total Items: {cartTotalQty}</p>
                            <p>Total Amount: ₹ {totalAmount}</p>
                           
                            <button className="btn btn-primary w-100 mt-2">Proceed to Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
