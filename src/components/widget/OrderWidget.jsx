import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from "react-router-dom";
import axios from "../../AxiosConfig";
import { useState, useEffect } from "react";

const Widget = () => {

    const [data, setData] = useState([]);
    useEffect(
        function () {
            axios.get("order/")
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
                <span className="title">ORDERS</span>
                <span className="counter">
                    {data.length}
                </span>
                <Link to="/order" style={{ textDecoration: "none", color: "black" }}>
                    <span className="link">View all orders</span>
                </Link>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUpIcon />
                    5%
                </div>
                <ShoppingCartOutlinedIcon
                    className="icon"
                    style={{
                        backgroundColor: "rgba(218, 165, 32, 0.2)",
                        color: "goldenrod",
                    }}
                />
            </div>
        </div>
    );
};

export default Widget;
