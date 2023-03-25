import "./landing.scss"
import Home from "../../components/landing/Home";
import About from "../../components/landing/About";
import Contact from "../../components/landing/Contact";
import Footer from "../../components/landing/Footer";
import MatchCard from "../../components/landing/matchCard";
import ClubCard from "../../components/landing/clubCard";
import { Alert, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "../../AxiosConfig";
import Navbar from "../../components/landing/Navbar";
import moment from 'moment';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//npm install slick-carousel --save

const Landing = () => {

    var pathMatch = "/matches";
    const [matches, setMatches] = useState([]);
    const list = [];

    useEffect(
        function () {
            localStorage.removeItem("onClickMatch")
            axios.get(pathMatch)
                .then(function (response) {
                    Array.from(response.data).sort().map((x) => {
                        if (!moment(x.date).isBefore(Date.now())) {
                            list.push(x)

                        }
                    })
                    setMatches(list)
                })
                .catch(function (err) {
                    console.log(32, err);
                });
        },
        []
    );


    return (
        <div>
            <Navbar />
            <div className="App">
                <Home />
                <div className="text-center pt-5">
                    <h1>Incomming Matches</h1>
                </div>
                <div className="matchs">
                    {matches.length === 0 ? (
                        <Alert className="mt-5" variant="info">
                            No matches found Managers Will add soon
                        </Alert>
                    )
                        : (
                            Array.from(matches).sort().map((x) =>
                                <MatchCard key={x._id} match={x} />
                            )
                        )
                    }</div>
                <ClubCard />
                <About />
                <Contact />
                <Footer />
            </div>
        </div>
    )
}

export default Landing