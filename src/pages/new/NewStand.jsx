import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "../../AxiosConfig";
import { Col } from "react-bootstrap";
import StadiumMap from "./stadium-map.png"
import Swal from "sweetalert2";
import { standInput } from "../../formSource";

var path = "stands/";
const NewStand = () => {
    var idStandStadium = localStorage.getItem("idStandStadium")
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
        [idStandStadium]
    );

    const [formValue, setFormValue] = useState({
        name: "",
        quantitySeat: "",
        stadiumId: ""
    });

    //handle Change value
    const handleChange = (e) => {
        setFormValue((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const { name, quantitySeat } = formValue;
    //function
    function showSuccess() {
        Swal.fire({
            title: "Create Success",
            text: "Stand : " + name + " with quantity seat :" + quantitySeat,
            icon: "success",
            confirmButtonText: "OK",
        }).then(function () {
            window.location.href = "/standbystadium"
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
        //To do code here
        axios.post(path + idStandStadium, {
            "name": name,
            "quantitySeat": quantitySeat,
            "stadiumId": idStandStadium
        })
            .then(response => {
                showSuccess();
            })
            .catch(error => {
                showError(error);
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
                <Col xs={12} md={12}>
                    <div className="stadium-map">
                        <img src={StadiumMap} alt="" />
                    </div>
                </Col>
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

                            {standInput.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        onChange={handleChange}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        id={input.id}
                                        required
                                    />
                                </div>
                            ))}



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
