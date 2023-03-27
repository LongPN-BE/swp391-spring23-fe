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
    const [total, setTotal] = useState();
    const username = currentUser.username.charAt(0).toUpperCase() + currentUser.username.slice(1);

    useEffect(
        function () {
            axios.get(path + orderId)
                .then(function (response) {
                    setData(response.data);
                    console.log(response.data)
                })
            axios.get("order/" + orderId)
                .then(function (response) {
                    setTotal(response.data.totalPrice.toLocaleString())
                    console.log("data Order check:", response.data)
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
                    <div className="newContainer mt-3 ">
                        <div className="container mt-6 mb-7">
                            <div className="row justify-content-center">
                                <div className="col-lg-12 col-xl-7">
                                    <div className="card">
                                        <div className="card-body p-5">
                                            <h2>
                                                Hey {username},
                                            </h2>
                                            <p className="fs-sm">
                                                This is the receipt for a payment of <strong>{total}</strong> (VNĐ) you made to V-League Ticket.
                                            </p>

                                            <div className="pt-2 mt-4">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="text-muted mb-2">Payment No.</div>
                                                        <strong>#{orderId}</strong>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-top border-gray-200 mt-4 py-4">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="text-muted mb-2">Client </div>
                                                        <strong>
                                                            {currentUser.username}
                                                        </strong>
                                                        <p className="fs-sm">
                                                            #{currentUser._id}
                                                            <br />
                                                            <a href="#!" className="text-purple">{currentUser.email}
                                                            </a>
                                                        </p>
                                                    </div>
                                                    <div className="col-md-6 text-md-end">
                                                        <div className="text-muted mb-2">Payment To</div>
                                                        <strong>
                                                            VPF Corp.
                                                        </strong>
                                                        <p className="fs-sm">
                                                            3th Floor, Hadico Tower, Pham Hung Street, Nam Tu Liem, Hanoi
                                                            <br />
                                                            <a href="#!" className="text-purple">info@vpf.com
                                                            </a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {Array.from(data).map((x) => <DetailCard key={x._id} data={x} />)}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserOrderDetails;
