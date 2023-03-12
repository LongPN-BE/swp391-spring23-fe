import "./buyTicket.scss"
import Navbar from "../../components/landing/Navbar"
import MatchCard from "../../components/landing/matchCard";
import { Alert, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import StadiumMap from "./stadium-map.png"
import BuyCard from "../../components/purchase/buyCard";
import axios from "../../AxiosConfig";
import moment from "moment";
import Popup from "../../components/popup/Popup";

const BuyTicket = () => {
    const matchId = localStorage.getItem("onClickMatch")
    const [matches, setMatches] = useState([])
    const [ticket, setTicket] = useState([])
    useEffect(
        function () {
            axios.get("matches/" + matchId)
                .then(function (response) {
                    setMatches(response.data)
                })
            axios.get("/match/tickets/" + matchId).then(function (response) {
                setTicket(response.data)
                console.log("tickets: " + response.data)
            })
                .catch(function (err) {
                    console.log(32, err);
                });


        },
        []
    )
    const standOptions = ticket.map(x => x.nameStand);
    console.log(standOptions)


    return (
        <div className="home-container">
            <Navbar />
            <Row className="d-flex justify-content-center mt-5 p-5">
                <Col xs={12} md={10}>
                    <div className="text-center purchase-title">
                        <h1>PURCHASE</h1>
                    </div>
                    <div>
                        <h4>Match details</h4>
                    </div>
                    <MatchCard key={matches._id} match={matches} showDetails={false} />
                </Col>
            </Row>
            <Row className="d-flex justify-content-center">
                <Col xs={12} md={10}>
                    <Col xs={12} md={12}>
                        <div className="stadium-map">
                            <img src={StadiumMap} alt="" />
                        </div>
                    </Col>

                    {moment(matches.date).isBefore(Date.now()) ?
                        <div className="text-center m-5">
                            <p>THE MATCH ENDED, PLEASE TRY ANOTHER! </p>
                        </div>

                        : <div className="text-center mt-5">
                            {ticket.length == 0 ?
                                <Alert className="mt-5" variant="info">
                                    No ticket found! Managers will add soon
                                </Alert> :
                                <div>Please select your stand
                                    <BuyCard date={matches.date} matchId={matchId} ticket={ticket} />
                                </div>
                            }

                        </div>
                    }
                </Col>
            </Row>

        </div>
    );
};

export default BuyTicket;
