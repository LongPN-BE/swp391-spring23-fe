import React from "react";
import "./orderDetails.scss"
import axios from "../../AxiosConfig";
import DetailCard from "../../components/detailCard/DetailCard";
import Navbar from "../../components/landing/Navbar";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import moment from "moment";



var orderId = sessionStorage.getItem("onClickOrderDetail");
var path = "orderDetail/order/"
const UserOrderDetails = () => {
    const { currentUser } = useContext(AuthContext)
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
        <div>
            <Navbar />
            <div className="single">

                <div className="singleContainer">

                    <div className="top">
                        <div className="left">
                            {/* <div className="editButton">Edit</div> */}
                            <h1 className="title">Information</h1>
                            <div className="item">
                                <img
                                    src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
                                    alt=""
                                    className="itemImg"
                                />
                                <div className="details">
                                    <h1 className="itemTitle">{currentUser.username}</h1>
                                    <div className="detailItem">
                                        <span className="itemKey">Email:</span>
                                        <span className="itemValue">{currentUser.email}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">ROLE:</span>
                                        {currentUser.isAdmin ? <span className="itemValue">ADMIN</span> : <span className="itemValue">USER</span>}

                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">CREATED AT:</span>
                                        <span className="itemValue">
                                            {moment(currentUser.createdAt).format('DD/MM/YYYY -  h:mm a')}
                                        </span>
                                    </div>
                                    {/* <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">USA</span>
                </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <h1 className="title">ORDER DETAIL</h1>
                        <div className="new">
                            <div className="newContainer">
                                <div className="top">
                                    <p>ORDER ID: {orderId}</p>
                                </div>
                                {Array.from(data).map((x) => <DetailCard key={x._id} data={x} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserOrderDetails;
