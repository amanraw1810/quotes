// BannerSlider.js
import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const banners = [
    { imageUrl: 'banners/75562901.webp', caption: '' },
    { imageUrl: 'banners/755629.jpg', caption: '' },
    { imageUrl: 'banners/75562902.webp', caption: '' },
    { imageUrl: 'banners/317802.webp', caption: '' },
    { imageUrl: 'banners/755628.webp', caption: '' },

    // Add more banners as needed
];

function BannerSlider() {

    const sliderRef = useRef(null);

    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    const goToPrev = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    const goToNext = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };
    return (
        <>
            <div className="banner-slider-container">
                <Slider ref={sliderRef} {...settings}>
                    {banners.map((banner, index) => (
                        <div key={index}>
                            <img src={banner.imageUrl} alt={`Banner ${index + 1}`} style={{ width: '100%' }} />
                            <p>{banner.caption}</p>
                        </div>
                    ))}
                </Slider>
                <button className="prev-button my-btn" onClick={goToPrev}><i className="fa-solid fa-caret-left fs-2"></i></button>
                <button className="next-button my-btn" onClick={goToNext}><i className="fa-solid fa-caret-right fs-2"></i></button>
            </div>
        </>
    )
}

export default BannerSlider