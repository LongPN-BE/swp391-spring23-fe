import "./table.scss";
import { DataGrid } from "@mui/x-data-grid";
import { oderColumns, userOrderColumns } from "../../datatablesource";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import axios from "../../AxiosConfig";
import LoadingSpinner from "../../pages/LoadingWait/LoadingSpinner";
import { useNavigate } from "react-router-dom";

var path = "order/user/";
const Datatable = () => {
    const userId = localStorage.getItem("userId")
    const [data, setData] = useState([]);
    const [isShow, setShow] = useState(true)
    const navigate = useNavigate();
    //UseEffect here ------------------------------------------------------------------------------
    useEffect(
        function () {
            axios.get(path + userId)
                .then(function (data) {
                    console.log(data.data);
                    setData(data.data);
                    setShow(false)
                })
                .catch(function (err) {
                    console.log(32, err);
                });
        },
        []
    );

    const handleDetails = (id) => {
        console.log("click orderDetails:", id)
        sessionStorage.setItem("onClickOrderDetail", id)
        return window.location.href = "profile/order-detail"
    }

    const actionColumn = [
        {
            field: "action",
            headerName: "",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <div>
                            <button
                                className="ticketButton"
                                onClick={() => handleDetails(params.row._id)}>
                                Details
                            </button>
                        </div>
                    </div>
                );
            },
        },
    ];

    // Form data grid----------------------------------------------------------
    const dataGrid = (
        <><DataGrid
            className="datagrid"
            rows={data}
            columns={userOrderColumns.concat(actionColumn)}
            getRowId={(row) => row._id}
            pageSize={8}
            rowsPerPageOptions={[8]} /></>
    )

    //Render here--------------------------------------------------------------------
    return (
        <><div className="datatable" >
            {isShow ? <div className="spinner"><LoadingSpinner /></div> : dataGrid}
        </div>
        </>
    );
};

export default Datatable;