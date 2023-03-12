import "./update.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "../../AxiosConfig";


var pathTournament = "tournaments/";
var pathRound = "rounds/";
const Update = () => {
    const roundId = localStorage.getItem("roundId")
    const tournamentId = localStorage.getItem("TournamentId")
    //Tournament list
    useEffect(
        function () {
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
    };

    const { roundname, selectsTournament } = formValue;
    //function
    function handleSubmit(event) {
        event.preventDefault();
        //To do code here
        alert("Update Round : " + roundname + "-" + selectsTournament)

        axios.put(pathRound + roundId, {
            "numberRound": roundname,
            "tournamentId": selectsTournament
        })
            .then(response => {
                alert("Update success")
                //Go to club page
                return window.location.href = "../match"
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
                    <h1>Update Round</h1>
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
                                    value={tournamentId}
                                    onChange={handleChange}>
                                    {data.map((entity) => (
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

export default Update;
