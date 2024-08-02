import React from 'react'
import Slider from '../component/Slider';
import BannerSlider from '../component/BannerSlider';
import DesktopCards from '../component/DesktopCards';
import MobileCards from '../component/MobileCards';
import MobileCollapsible from '../component/MobileCollapsible';
import DeskTopDataByCategory from '../component/DeskTopDataByCategory';
function Home() {
    return (
        <>
            <div className="mobilenone" style={{ marginTop: '0px' }}>
                <Slider />
            </div>

            <div className="displaynone" style={{ marginTop: '70px' }}>
                <Slider />
            </div>


            <div className="parent-container">
                <BannerSlider />
            </div>

            <div className="mobilenone">
                <DeskTopDataByCategory />
            </div>

            <div className="displaynone">
                <MobileCollapsible />
            </div>

            <div className="mobilenone">
                <DesktopCards />
            </div>

            <div className="displaynone">
                <MobileCards />
            </div>
        </>
    )
}

export default Home