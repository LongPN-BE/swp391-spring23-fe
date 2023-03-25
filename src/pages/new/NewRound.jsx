import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "../../AxiosConfig";
import Swal from "sweetalert2";

var pathTournament = "tournaments/";
var pathRound = "rounds/";
const New = () => {
    //Tournament list
    useEffect(
        function getTournament() {
            axios
                .get(pathTournament)
                .then(function (data) {
                    console.log(data.data);
                    setData(data.data);
                })
                .catch(function (err) {
                    console.log(32, err);
                });
        },
        []
    );
    const [data, setData] = useState([]);
    const rowsTournament = data;

    //State Round
    const [formValue, setFormValue] = useState({
        roundname: "",
        selectsTournament: ""
    });

    //handle Change value
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
        console.log("Test onchange :" + name + " - Value: " + value)
    };

    const { roundname, selectsTournament } = formValue;
    //function Handle Submit--------------------
    function showSuccess() {
        Swal.fire({
            title: "Create Success",
            text: "Round : " + roundname,
            icon: "success",
            confirmButtonText: "OK",
        }).then(function () {
            window.location.href = "../match"
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
        if (roundname == null || selectsTournament == null || selectsTournament == 0) showWarning("Please fill in this form!")
        if (roundname == 0) showWarning("Round number must be greater than 0")
        else {
            axios.post(pathRound, {
                "numberRound": roundname,
                "tournamentId": selectsTournament
            })
                .then(response => {
                    showSuccess()
                })
                .catch(error => {
                    showError(error)
                    console.log(error);
                });
            //end to do code
        }
    }

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>New Round</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={handleSubmit}>

                            {/* Round name */}
                            <div className="formInput" >
                                <label>Round name</label>
                                <input type="number"
                                    name="roundname"
                                    onChange={handleChange}
                                    placeholder="EX: 1" />
                            </div>

                            {/* Tournament */}
                            <div className="formInput" >
                                <label>Tournament</label>
                                <select name="selectsTournament"
                                    onChange={handleChange}>
                                    <option value={0}> -- SELECT TOURNAMENT -- </option>
                                    {rowsTournament.map((entity) => (
                                        <option value={entity._id} id={entity._id}>{entity.name}</option>
                                    ))
                                    }
                                </select>
                            </div>

                            {/* Button Send to add new */}
                            <div className="btnSend">
                                <button>Save Round</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default New;
