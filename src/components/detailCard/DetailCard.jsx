import React, { useEffect } from "react";
import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "../../AxiosConfig";
import moment from "moment";

const DetailCard = (data) => {
    const [dataTicket, setDataTicket] = useState([]);
    const [dataMatch, setDataMatch] = useState([]);
    useEffect(
        function () {
            axios.get("match/tickets/:matchId/" + data.data.ticketTypeId)
                .then(function (response) {
                    setDataTicket(response.data);
                    console.log(response.data)
                    axios.get("matches/" + response.data.matchId)
                        .then(function (response) {
                            console.log("data match: ", response.data)
                            setDataMatch(response.data)
                        })
                })
                .catch(function (err) {
                    console.log(32, err);
                });
        },
        []
    );
    console.log("test card ", data)
    return (

        <div className="bottom">

            <div className="right">
                <p>Ticket ID: {data.data._id}</p>
                <div>
                    <div className="formInput" >
                        <label>MATCH: {dataMatch.nameHomeClub} - VS - {dataMatch.nameAwayClub}</label>
                    </div>
                    <div className="formInput" >
                        <label>STADIUM: {dataMatch.nameStadium}</label>
                    </div>
                    <div className="formInput" >
                        <label>DATE: {moment(dataMatch.date).format('DD/MM/YY')}</label>
                    </div>
                    <div className="formInput" >
                        <label>TIME: {moment(dataMatch.date).format('h:mm A')}</label>
                    </div>

                    <div className="formInput" >
                        <label>Stand: {dataTicket.nameStand}</label>
                    </div>


                    <div className="formInput" >
                        <label>Amount: {data.data.amount}</label>
                    </div>

                    <div className="formInput" >
                        <label>Price: {dataTicket.price} VNĐ</label>
                    </div>
                    <hr />

                    <div className="formInput" >
                        <label>Total: {data.data.total} VNĐ</label>
                    </div>


                </div>
            </div>

        </div>

    );
};

export default DetailCard;