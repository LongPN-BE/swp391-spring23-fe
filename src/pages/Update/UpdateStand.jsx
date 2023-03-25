import "./update.scss";
import { useEffect, useState } from "react";
import axios from "../../AxiosConfig";
import { Col } from "react-bootstrap";
import StadiumMap from "./stadium-map.png"
import Swal from "sweetalert2";

var path = "stands/";
const UpdateStand = (props) => {
    const idStandStadium = localStorage.getItem("idStandStadium")
    const [stadium, setStadium] = useState([]);

    useEffect(
        function () {
            axios
                .get("stadiums/" + idStandStadium)
                .then(function (respone) {
                    setStadium(respone.data);
                })
                .catch(function (err) {
                    console.log(32, err);
                });

            axios
                .get("stands/" + props.props)
                .then(function (respone) {
                    setFormValue({
                        name: respone.data.name,
                        quantitySeat: respone.data.quantitySeat,
                        stadiumId: respone.data.stadiumId
                    })
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
            title: 'Do you want to save the ' + name + ' changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(path + props.props, {
                    "name": name,
                    "quantitySeat": quantitySeat,
                    "stadiumId": idStandStadium
                })
                    .then(response => {
                        Swal.fire('Saved!', '', 'success')
                            .then(response => { window.location.href = "/standbystadium" })
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
            <div className="newContainer">
                <div className="top">
                    <h1>Update Stand</h1>
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
                                    placeholder="Ho Chi Minh City FC" required />
                            </div>

                            {/* Name */}
                            <div className="formInput" >
                                <label>Name Of Stand</label>
                                <input type="text"
                                    name="name"
                                    value={name}
                                    onChange={handleChange}
                                    placeholder="" required />
                            </div>

                            {/* Seat Quantity */}
                            <div className="formInput" >
                                <label>Seat Quantity</label>
                                <input type="number"
                                    name="quantitySeat"
                                    value={quantitySeat}
                                    onChange={handleChange}
                                    placeholder="" required />
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

export default UpdateStand;
