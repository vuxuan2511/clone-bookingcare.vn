import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import './HomePage.scss';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import SectionDoctor from './Section/SectionDoctor';
import HandBook from './Section/HandBook';
import FooterHomePage from './FooterHomePage';
import MediaYoutube from './Section/MediaYoutube';

class HomePage extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: false,
            autoplay: true,
            pauseOnHover: true,
            speed: 400,
            autoplaySpeed: 5000,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            <div className="container1">
                <HomeHeader isShowBanner={true} />

                <Specialty settings={settings} />

                <MedicalFacility settings={settings} />

                <SectionDoctor settings={settings} />

                <HandBook settings={settings} />

                <MediaYoutube />

                <FooterHomePage />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
