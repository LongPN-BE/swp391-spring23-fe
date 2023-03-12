import "./update.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "../../AxiosConfig";

var ticketId = localStorage.getItem("editTicketId");
var matchId = localStorage.getItem("idClickTicketByMatch")
var pathUpdate = "match/tickets/";
const UpdateTicket = () => {
    //data--------------------------------------------------------

    const [quantity, setQuantity] = useState();
    const [price, setPrice] = useState();
    const [matchId, setMatchId] = useState();
    const [stand, setStand] = useState([]);
    const [standId, setStandId] = useState();
    const [status, setStatus] = useState();

    //useEffect
    useEffect(
        function () {
            //get data match by id
            axios.get(pathUpdate + matchId + "/" + ticketId)
                .then(function (data) {
                    console.log("Test search ticket by id", data.data);
                    setMatchId(data.data.matchId);
                    setStandId(data.data.standId);
                    setStand(data.data.nameStand);
                    setQuantity(data.data.quantity);
                    setPrice(data.data.price);
                    setStatus(data.data.status)
                })
                .catch(function (err) {
                    console.log(32, err);
                });
        },
        []
    );
    //check data logs
    console.log("================================");
    console.log("Ticket ID :", ticketId);
    console.log("Match ID :", matchId);
    console.log("Stand ID :", standId);
    console.log("Stand :", stand)
    console.log("Quantity onchange :", quantity);
    console.log("Price onchange :", price);
    console.log("Status :", status);


    //handle Change Search round by Tournament-----------------------------------------------------
    function handleSubmit(event) {
        event.preventDefault();
        //To do code here
        axios.put(pathUpdate + matchId + "/" + ticketId, {
            "matchId": matchId,
            "standId": standId,
            "nameStand": stand,
            "quantity": quantity,
            "price": price,
            "status": status
        })
            .then(response => {
                alert("Success")
                console.log(quantity + " " + standId + " " + ticketId + " " + matchId + " " + price)
                return window.location.href = "../ticket"
                //Go to club page
            })
            .catch(error => {
                alert(error)
                console.log(error);
            });

        //end to do code
    }

    return (
        <div className="update">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Update Ticket</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={handleSubmit}>
                            {/* Club Home */}
                            <div className="formInput" >
                                <label>Ticket ID</label>
                                <input type="text" defaultValue={ticketId} disabled />
                            </div>

                            <div className="formInput" >
                                <label> Stand </label>
                                <input type="text" defaultValue={stand} disabled />
                            </div>

                            {/* Club Visitor */}
                            <div className="formInput" >
                                <label>Amount</label>
                                <input type="number" defaultValue={quantity} onChange={e => setQuantity(e.target.value)} />
                            </div>

                            {/* Stadium for match */}
                            <div className="formInput" >
                                <label>Price</label>
                                <input type="number" defaultValue={price} onChange={e => setPrice(e.target.value)} />
                            </div>

                            <div className="btnSend">
                                <button type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateTicket;
