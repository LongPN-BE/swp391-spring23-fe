import axios from "../../AxiosConfig";
import React, { useEffect, useState } from "react";
import "./clubCard.scss"
import Slider from "react-slick";
import stadiumIcon from "../assets/stadium-icon.png"
import pinIcon from "../assets/pin.png"


//npm install react-slick --save


var pathClub = "/clubs";
const ClubCard = () => {
    const [clubs, setClubs] = useState([]);

    //Axios------------------------------------------
    useEffect(
        function () {
            axios.get(pathClub).then(function (response) {
                setClubs(response.data)
            })
                .catch(function (err) {
                    console.log("clubCard err: ", err);
                });
        }, []
    )
    //-----------------------------------------------------

    // react-slick config

    const settings = {
        speed: 600,
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 2000
    };

    //------------------------------------


    console.log(clubs)
    return (


        <div className="card__container">
            <h3>TEAMS</h3>
            <Slider {...settings} className="card__container--inner">
                {Array.from(clubs).map((club) => {
                    return (
                        <div className="card__container--inner--card" key={club._id}>

                            <img src={club.logo} alt="hero_img" />

                            <div className="card__container--inner--card--date_time">

                                <img src={pinIcon} alt="location" />
                                <p>{club.location}</p>
                            </div>
                            <div className="card__container--inner--card--date_time">
                                <img src={stadiumIcon} alt="location" /><h3>{club.nameStadium}</h3>
                            </div>
                            <div className="card__info">
                                <h2>{club.name} FC</h2>
                            </div>

                        </div>
                    );
                })}
            </Slider>
        </div>



    );
}

export default ClubCard;