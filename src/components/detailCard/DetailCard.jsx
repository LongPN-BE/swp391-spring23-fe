import React, { useEffect } from "react";
import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "../../AxiosConfig";
import moment from "moment";


const DetailCard = (data) => {
    const [dataTicket, setDataTicket] = useState([]);
    const [dataMatch, setDataMatch] = useState([]);
    const [price, setPrice] = useState();
    const total = data.data.total.toLocaleString();
    useEffect(
        function () {
            axios.get("match/tickets/:matchId/" + data.data.ticketTypeId)
                .then(function (response) {
                    setDataTicket(response.data);
                    setPrice(response.data.price.toLocaleString());
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


        <div>
            <table className="table border-bottom border-gray-200 mt-3">
                <thead>
                    <tr>
                        <th scope="col" className="fs-sm text-dark text-uppercase-bold-sm px-0">Infomation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="px-0">Match:</td>
                        <td className="text-end px-0">{dataMatch.nameHomeClub} - {dataMatch.nameAwayClub}</td>
                    </tr>
                    <tr>
                        <td className="px-0">Stadium:</td>
                        <td className="text-end px-0">{dataMatch.nameStadium}</td>
                    </tr>
                    <tr>
                        <td className="px-0">Date:</td>
                        <td className="text-end px-0">{moment(dataMatch.date).format('DD/MM/YYYY')}</td>
                    </tr>
                    <tr>
                        <td className="px-0">Time:</td>
                        <td className="text-end px-0">{moment(dataMatch.date).format('h:mm A')}</td>
                    </tr>
                    <tr>
                        <td className="px-0">Stand:</td>
                        <td className="text-end px-0">{dataTicket.nameStand}</td>
                    </tr>
                    <tr>
                        <td className="px-0">Amount:</td>
                        <td className="text-end px-0">{data.data.amount}</td>
                    </tr>
                    <tr>
                        <td className="px-0">Price:</td>
                        <td className="text-end px-0">{price} VNĐ</td>
                    </tr>
                </tbody>
            </table>

            <div className="mt-5">
                <div className="d-flex justify-content-end">
                    <p className="text-muted me-3">Subtotal:</p>
                    <span>{total} VNĐ</span>
                </div>
                <div className="d-flex justify-content-end">
                    <p className="text-muted me-3">Discount:</p>
                    <span>0 VNĐ</span>
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <h5 className="me-3">Total:</h5>
                    <h5 className="text-success">{total} VNĐ</h5>
                </div>
            </div>
        </div>

    );
};

export default DetailCard;