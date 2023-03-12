import "./update.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "../../AxiosConfig";

var path = "tournaments/";
const Update = () => {
    const [formValue, setFormValue] = useState({
        tournamentname: "",
        year: ""
    });
    const id = localStorage.getItem("TournamentId");

    useEffect(
        function () {
            axios
                .get(path + id)
                .then(function (data) {
                    console.log(data.data);
                    year = data.data.year;
                    tournamentname = data.data.name;
                })
                .catch(function (err) {
                    console.log(32, err);
                });
        }
    )


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

    const { tournamentname, year } = formValue;
    //function
    function handleSubmit(event) {
        event.preventDefault();
        //To do code here
        alert("Add New Tournament : " + tournamentname + "-" + year)
        axios.put(path + id, {
            "year": year,
            "name": tournamentname
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
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Update tournament</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={handleSubmit}>

                            {/* Tournament Name */}
                            <div className="formInput" >
                                <label>Tournament Name</label>
                                <input type="text"
                                    name="tournamentname"
                                    value={tournamentname}
                                    onChange = {handleChange}/>
                            </div>

                            {/* Year */}
                            <div className="formInput" >
                                <label>Year</label>
                                <input type="number"
                                    name="year"
                                    value={year}
                                    onChange={handleChange}/>
                            </div>

                            {/* Button Send */}
                            <div className="btnSend">
                                <button>Save</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Update;
