import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from "../../AxiosConfig";
import moment from 'moment';
import Swal from 'sweetalert2';



const BuyCard = ({ ticket, date, matchId, showDetails = true }) => {
    const customerId = localStorage.getItem("userId");
    const [price, setPrice] = useState();
    const [amount, setAmount] = useState();
    const [ticketTypeId, setTicketTypeId] = useState();
    const [subPrice, setSubPrice] = useState();
    const [stand, setStand] = useState();
    const navigate = useNavigate();


    const handleChange = (event) => {
        const { name, value } = event.target;
        if (value == 0 || value == null) {
            setStand(value)
            setSubPrice(0)
            setPrice(0)
        }
        else {
            axios
                .get("match/tickets/" + matchId + "/" + value)
                .then(function (response) {
                    setStand(value)
                    setPrice(response.data.price.toLocaleString());
                    setSubPrice(response.data.price)
                    setTicketTypeId(response.data._id)
                })
                .catch(function (err) {
                    console.log(32, err);
                });
        }

    };




    //handle-----------------------------------------------------
    function showSuccess(text) {
        Swal.fire({
            title: "Buy Success",
            text: text,
            icon: "success",
            confirmButtonText: "OK",
        }).then(function () {
            window.location.href = "/"
        });
    }

    function showError(text) {
        Swal.fire({
            title: "Oops...",
            text: text,
            icon: "error",
            confirmButtonText: "OK",
        })
    }

    function showWarning(text) {
        Swal.fire({
            title: "Please !",
            text: text,
            icon: "info",
            confirmButtonText: "OK",
        })
    }
    function handleSubmit(event) {
        event.preventDefault();
        if (stand == 0 || stand == null) {
            showWarning("Please pick your stand");
        } else if (amount > 4) {
            showWarning("Buy too much! Avalible 4 ticket/person.. ");
        }
        else {
            axios.post("/order", { "customerId": customerId })
                .then(response => {
                    axios.post("/orderDetail", {
                        "ticketTypeId": ticketTypeId,
                        "orderId": response.data._id,
                        "amount": amount
                    }).then(response => {
                        if (amount == 1) {
                            showSuccess(amount + " Ticket")
                        } else {
                            showSuccess(amount + " Tickets")
                        }
                    })
                })
                .catch(error => {
                    showError(error)
                    console.log(error);
                });
        }
    }

    const TotalFunc = (price, amount) => {
        return (price * amount).toLocaleString();
    }



    return (

        <div className=" w-md-50 p-3 mt-1 mb-3">

            {/* 2 Teams  */}
            <Row className="buyBox w-md-50 p-3 shadow-lg rounded-4 mb-3">
                <form onSubmit={handleSubmit}>
                    <Row className="justify-content-center mt-3">

                        <Col className="d-flex flex-column justify-content-center align-items-center sh">
                            <div>
                                <div className="pt-3" >
                                    <div className="" >
                                        <label>MATCH DATE</label>
                                        <select className="purchase-input form-control" disabled
                                        >
                                            <option> {moment(date).format('DD/MM/YYYY -  h:mm a')}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="pt-3" >
                                    <div className="" >
                                        <label>QUANTITY</label>
                                        <input className="purchase-input form-control" type="number" name="amount" min={1} max={30}
                                            onChange={(e) => setAmount(e.target.value)} required />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col className="d-flex flex-column justify-content-center align-items-center">
                            <div>
                                <div className="pt-3" >
                                    <div className="" >
                                        <label>STAND</label>
                                        <select name="stand" className='purchase-input form-control' onChange={handleChange}>
                                            <option value={0}>- Please pick your stand -</option>
                                            {ticket.map((x) => (
                                                <option className='purchase-input form-control' key={x._id} value={x._id} required>{x.nameStand}</option>
                                            ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="pt-3" >
                                    <div className="" >
                                        <label>PRICE</label>
                                        <select name="stand" className='purchase-input form-control'
                                            disabled
                                        >
                                            <option value={price}>{price} VNĐ</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <hr className=" mt-5 w-50 mx-auto" />
                    </Row>

                    {/* Date */}
                    <Row className="justify-content-center text-center">
                        <Col className="d-flex  justify-content-center align-items-center">
                            <h5 className="mt-3 ms-1 fw-bold">
                                TOTAL : {TotalFunc(subPrice, amount)} VNĐ
                            </h5>
                        </Col>
                    </Row>
                    {showDetails && (
                        <Row>
                            <Col className="d-flex  justify-content-end align-items-center">
                                <Button
                                    // as={Link}
                                    // to={`/matches/${match.id}`}
                                    className="purchase-btn px-3 rounded-3"
                                    type='submit'
                                >
                                    Purchase
                                </Button>
                            </Col>
                        </Row>
                    )}
                </form>
            </Row>

        </div>




    );
};

export default BuyCard;
