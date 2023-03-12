import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "../../AxiosConfig";

var path = "stands/";

const NewStand = () => {
    const idStandStadium = localStorage.getItem("idStandStadium")
    const [stadium, setStadium] = useState([]);

    useEffect(
        function () {
            axios
                .get("stadiums/" + idStandStadium)
                .then(function (respone) {
                    setStadium(respone.data);
                    console.log(respone.data)
                })
                .catch(function (err) {
                    console.log(32, err);
                });
        },
        []
    );

    const [formValue, setFormValue] = useState({
        name: "",
        quantitySeat: "",
        stadiumId: ""
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

    const { name, quantitySeat } = formValue;
    //function
    function handleSubmit(event) {
        event.preventDefault();
        //To do code here
        alert("Add New Round : " + name + "-" + quantitySeat + "-" + idStandStadium)
        axios.post(path + idStandStadium, {
            "name": name,
            "quantitySeat": quantitySeat,
            "stadiumId": idStandStadium
        })
            .then(response => {
                alert("Add success")
                //Go to Stadium page
                return window.location.href = "/standbystadium"
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
                    <h1>New Stand</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={handleSubmit}>

                            {/* Name of Stadium */}
                            <div className="formInput" >
                                <label>Stadium</label>
                                <input type="text"
                                    disabled
                                    defaultValue={stadium.name}
                                    placeholder="Ho Chi Minh City FC" />
                            </div>

                            {/* Name */}
                            <div className="formInput" >
                                <label>Name Of Stand</label>
                                <input type="text"
                                    name="name"
                                    onChange={handleChange}
                                    placeholder="" />
                            </div>

                            {/* Seat Quantity */}
                            <div className="formInput" >
                                <label>Seat Quantity</label>
                                <input type="number"
                                    name="quantitySeat"
                                    onChange={handleChange}
                                    placeholder="" />
                            </div>



                            {/* Button Send to add new */}
                            <div className="btnSend">
                                <button>Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewStand;
