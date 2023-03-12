import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "../../AxiosConfig";

var pathTournament = "tournaments/";
const New = () => {
    const [formValue, setFormValue] = useState({
        tournamentname: "",
        year : ""
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

    const { tournamentname, year } = formValue;
    //function
    function handleSubmit(event) {
        event.preventDefault();
        //To do code here
        alert("Add New Tournament : " + tournamentname + "-" + year)
        axios.post(pathTournament, {
            "year": year,
            "name": tournamentname
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
                    <h1>New tournament</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={handleSubmit}>

                            {/* Tournament Name */}
                            <div className="formInput" >
                                <label>Tournament Name</label>
                                <input type="text"
                                name="tournamentname"
                                onChange={handleChange}
                                 placeholder="V.League 1 - 2021" />
                            </div>

                            {/* End Date */}
                            <div className="formInput" >
                            <label>Year</label>
                                <input type="text"
                                name="year"
                                onChange={handleChange}
                                 placeholder="2023" />
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
