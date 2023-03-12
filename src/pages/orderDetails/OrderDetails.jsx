import React, { useEffect } from "react";
import { useState } from "react";
import "./orderDetails.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "../../AxiosConfig";
import DetailCard from "../../components/detailCard/DetailCard";


var orderId = sessionStorage.getItem("onClickOrderDetail");
var path = "orderDetail/order/"
const OrderDetails = () => {
    const [data, setData] = useState([]);


    useEffect(
        function () {
            axios.get(path + orderId)
                .then(function (response) {
                    setData(response.data);
                    console.log(response.data)
                })
                .catch(function (err) {
                    console.log(32, err);
                });
        },
        []
    );

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <div className="top">
                    <h1>ORDER DETAIL </h1>
                </div>
                <div className="top">
                    <p>ORDER ID: {orderId}</p>
                </div>
                {Array.from(data).map((x) => <DetailCard key={x._id} data={x} />)}
            </div>
        </div>
    );
};

export default OrderDetails;
