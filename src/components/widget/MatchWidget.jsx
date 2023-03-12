import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import SportsIcon from '@mui/icons-material/Sports';
import { Link } from "react-router-dom";
import axios from "../../AxiosConfig";
import { useState, useEffect } from "react";

const Widget = () => {

    const [data, setData] = useState([]);
    useEffect(
        function () {
            axios.get("matches/")
                .then(function (data) {
                    console.log("match", data.data);
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
                <span className="title">MATCHES</span>
                <span className="counter">
                    {data.length}
                </span>
                <Link to="/match" style={{ textDecoration: "none", color: "black" }}>
                    <span className="link">Recent matches</span>
                </Link>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUpIcon />
                    5%
                </div>
                <SportsIcon
                    className="icon"
                    style={{
                        backgroundColor: "#9AECDB",
                        color: "#00b894",
                    }}
                />
            </div>
        </div>
    );
};

export default Widget;
