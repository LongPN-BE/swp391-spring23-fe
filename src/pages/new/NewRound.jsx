import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "../../AxiosConfig";


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
    };

    const { roundname, selectsTournament } = formValue;
    //function
    function handleSubmit(event) {
        event.preventDefault();
        //To do code here
        alert("Add New Round : " + roundname + "-" + selectsTournament)

        axios.post(pathRound, {
            "numberRound": roundname,
            "tournamentId": selectsTournament
        })
            .then(response => {
                alert("Add success")
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
