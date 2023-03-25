import "./update.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "../../AxiosConfig";
import Swal from "sweetalert2";

var ticketId = localStorage.getItem("editTicketId");
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

    //handle Change Search round by Tournament-----------------------------------------------------
    function showError(text) {
        Swal.fire({
            title: 'Oops...',
            text: text,
            icon: "error",
            confirmButtonText: "OK",
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        Swal.fire({
            title: 'Do you want to save the ' + ticketId + ' changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(pathUpdate + matchId + "/" + ticketId, {
                    "matchId": matchId,
                    "standId": standId,
                    "nameStand": stand,
                    "quantity": quantity,
                    "price": price,
                    "status": status
                }).then(response => {
                    Swal.fire('Saved!', '', 'success')
                        .then(response => { window.location.href = "../ticket" })
                })
                    .catch(error => {
                        showError(error)
                        console.log(error);
                    });
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
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
                                <input type="number" defaultValue={quantity} onChange={e => setQuantity(e.target.value)} required />
                            </div>

                            {/* Stadium for match */}
                            <div className="formInput" >
                                <label>Price</label>
                                <input type="number" defaultValue={price} onChange={e => setPrice(e.target.value)} required />
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
