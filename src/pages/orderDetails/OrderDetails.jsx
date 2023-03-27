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
    const [dataOrder, setDataOrder] = useState([]);
    const [total, setTotal] = useState();
    const [customer, setCustomer] = useState([]);

    useEffect(
        function () {
            axios.get(path + orderId)
                .then(function (response) {
                    setData(response.data);
                    console.log("order ID check:", response.data)
                })
            axios.get("order/" + orderId)
                .then(function (response) {
                    setDataOrder(response.data);
                    setTotal(response.data.totalPrice.toLocaleString())
                    console.log("data Order check:", response.data)
                    axios.get("users/" + response.data.customerId)
                        .then(function (response) {
                            setCustomer(response.data)
                            console.log("data customer:", response.data)
                        })
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
            <div className="newContainer mt-3 ">
                <div className="container mt-6 mb-7">
                    <div className="row justify-content-center">
                        <div className="col-lg-12 col-xl-7">
                            <div className="card">
                                <div className="card-body p-5">

                                    <div className="mt-4">
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
                                                    {customer.username}
                                                </strong>
                                                <p className="fs-sm">
                                                    #{customer._id}
                                                    <br />
                                                    <a href="#!" className="text-purple">{customer.email}
                                                    </a>
                                                </p>
                                            </div>
                                            {/* <div className="col-md-6 text-md-end">
                                                <div className="text-muted mb-2">Payment To</div>
                                                <strong>
                                                    Themes LLC
                                                </strong>
                                                <p className="fs-sm">
                                                    9th Avenue, San Francisco 99383
                                                    <br />
                                                    <a href="#!" className="text-purple">themes@email.com
                                                    </a>
                                                </p>
                                            </div> */}
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
    );
};

export default OrderDetails;
