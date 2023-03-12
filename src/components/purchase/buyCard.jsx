import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from "../../AxiosConfig";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import moment from 'moment';



const BuyCard = ({ ticket, date, matchId, showDetails = true }) => {
    const customerId = localStorage.getItem("userId");
    const token = localStorage.getItem("access_token")
    const [price, setPrice] = useState();
    const [orderId, setOrderId] = useState();
    const [amount, setAmount] = useState();
    const [ticketTypeId, setTicketTypeId] = useState();
    const [stand, setStand] = useState();
    const navigate = useNavigate();


    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name == "stand") {
            axios
                .get("match/tickets/" + matchId + "/" + value)
                .then(function (response) {
                    console.log(response.data);
                    setPrice(response.data.price);
                    setTicketTypeId(response.data._id)
                })
                .catch(function (err) {
                    console.log(32, err);
                });
        }
    };




    //handle Change Search round by Tournament-----------------------------------------------------
    function handleSubmit(event) {
        event.preventDefault();
        if (amount > 0) {
            axios.post("/order", { "customerId": customerId })
                .then(response => {
                    console.log("test create order:" + response.data)
                    console.log("test amount: " + amount)
                    setOrderId(response.data._id)
                    console.log("test orderid :" + orderId)
                    axios.post("/orderDetail", {
                        "ticketTypeId": ticketTypeId,
                        "orderId": response.data._id,
                        "amount": amount
                    }).then(response => {
                        console.log("test create order detail: " + response.data)
                        alert("orderDetail create successfully :" + response.data._id)
                        localStorage.removeItem("onClickMatch")
                        navigate("/")
                    })
                })

                .catch(error => {
                    alert(error)
                    console.log(error);
                });
        } else alert("Quantity at least 1.")

        //end to do code
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
                                        //onClick={handleChange}
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
                                        <select name="stand" className='purchase-input form-control' required
                                            onChange={handleChange}
                                        >
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
                                        //onClick={handleChange}
                                        >
                                            <option value={price}>{price}</option>
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
                                TOTAL :
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
