import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";
import axios from "../../AxiosConfig";
import { useState, useEffect } from "react";

const Widget = () => {

    const [data, setData] = useState([]);
    useEffect(
        function () {
            axios.get("users")
                .then(function (data) {
                    console.log(data.data);
                    setData(data.data);
                    // console.log(list);
                })
                .catch(function (err) {
                    console.log(32, err);
                });
        },
        []
    );

    //temporary

    return (
        <div className="widget">
            <div className="left">
                <span className="title">USERS</span>
                <span className="counter">
                    {data.length}
                </span>
                <Link to="/users" style={{ textDecoration: "none", color: "black" }}>
                    <span className="link">See all users</span>
                </Link>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUpIcon />
                    1%
                </div>
                <PersonIcon
                    className="icon"
                    style={{
                        backgroundColor: "#74b9ff",
                        color: "#0984e3",
                    }}
                />
            </div>
        </div>
    );
};

export default Widget;
