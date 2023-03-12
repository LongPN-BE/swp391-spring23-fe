import "./table.scss";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import axios from "../../AxiosConfig";
import LoadingSpinner from "../../pages/LoadingWait/LoadingSpinner";

var path = "match/tickets/"

const ListStadium = () => {
    var matchId = localStorage.getItem("idClickTicketByMatch")

    const [data, setData] = useState([])
    const [isShow, setShow] = useState(true)
    //UseEffect here ----------------------------------------------------------------------------
    useEffect(
        function () {
            console.log(matchId)
            axios
                .get(path + matchId)
                .then(function (data) {
                    setData(data.data);
                    setShow(false)
                })
                .catch(function (err) {
                    console.log(32, err);
                });
        },
        []
    );

    //Handle Update here ----------------------------------------------------------------------------
    const handleUpdate = (id) => {
        localStorage.setItem("editTicketId", id);
        return window.location.href = "../ticket/updateTicket"
    };

    //Handle Sold Out here ----------------------------------------------------------------------------
    const handleDelete = (id) => {
        // setData(data.filter((item) => item.id !== id));
        console.log(id);
        axios.delete(path + matchId + "/" + id)
            .then(res => {
                console.log("check delete ", res);
                alert('Deleted ticket by id: ' + id);
                setData(data.filter((item) => item.id !== id));
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    //Form table here ----------------------------------------------------------------------------
    const render = (
        <div className="datatable">
            <div className="datatableTitle"><TableContainer component={Paper} className="table">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="tableCell">ID</TableCell>
                            <TableCell className="tableCell">Stand</TableCell>
                            <TableCell className="tableCell">Amount</TableCell>
                            <TableCell className="tableCell">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((value) => (
                            <TableRow key={value.id}>
                                <TableCell className="tableCell">
                                    <div className="cellWrapper">
                                        {value._id}
                                    </div>
                                </TableCell>
                                <TableCell className="tableCell">
                                    <div className="cellWrapper">
                                        {value.nameStand}
                                    </div>
                                </TableCell>

                                <TableCell className="tableCell">
                                    <div className="cellAction">
                                        <div className="cellWrapper">
                                            {value.quantity}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="tableCell">
                                    <div className="cellAction">
                                        <div className="cellWrapper">
                                            {value.price}VND
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="tableCell">
                                    <div className="cellAction">
                                        <Link to="" style={{ textDecoration: "none" }}>
                                            <div className="updateButton" onClick={e => (handleUpdate(value._id))} > Update</div>
                                        </Link>
                                        <Link to="" style={{ textDecoration: "none" }}>
                                            <div className="deleteButtonn" onClick={e => (handleDelete(value._id))} >Delete</div>
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
        </div>
    )

    //Loading page wait data here ----------------------------------------------------------------------------    
    //Render here ----------------------------------------------------------------------------
    return (
        <>
            {isShow ? <LoadingSpinner /> : render}
        </>

    );
};

export default ListStadium;