import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Swal from "sweetalert2";
import { useState } from "react";
import axios from "../../AxiosConfig";

var pathTournament = "tournaments/";
const New = () => {
    const [formValue, setFormValue] = useState({
        name: "",
        year: ""
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

    const { name, year } = formValue;
    //function Handle Submit--------------------
    function showSuccess() {
        Swal.fire({
            title: "Create Success",
            text: "Tournament : " + name + " in " + year,
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

    function handleSubmit(event) {
        event.preventDefault();
        axios.post(pathTournament, {
            "year": year,
            "name": name
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

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>New tournament</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={handleSubmit}>

                            {/* Tournament Name */}
                            <div className="formInput" >
                                <label>Tournament Name</label>
                                <input type="text"
                                    name="name"
                                    onChange={handleChange}
                                    placeholder="V.League 1 - 2021"
                                    required />
                            </div>

                            {/* End Date */}
                            <div className="formInput" >
                                <label>Year</label>
                                <input type="text"
                                    name="year"
                                    onChange={handleChange}
                                    placeholder="2023"
                                    required
                                />
                            </div>


                            {/* Button Send to add new */}
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

export default New;
