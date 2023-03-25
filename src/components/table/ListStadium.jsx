import "./table.scss";
import { DataGrid } from "@mui/x-data-grid";
import { stadiumColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../AxiosConfig";
import Update from "../../pages/Update/UpdateStadium"
import LoadingSpinner from "../../pages/LoadingWait/LoadingSpinner";
import swal from 'sweetalert';
import Swal from "sweetalert2";

var path = "stadiums/";
const ListStadium = () => {
    const [isRender, setisRender] = useState(true);
    const [isShow, setisShow] = useState(true);
    const [formvalue, setDataFormvalue] = useState();
    const [data, setData] = useState([]);

    //UseEffect here ----------------------------------------------------------------------------
    useEffect(
        function () {
            axios
                .get(path)
                .then(function (data) {
                    setData(data.data);
                    setisRender(false)
                })
                .catch(function (err) {
                    console.log(32, err);
                });
        },
        []
    );

    //Handle Delete here ----------------------------------------------------------------------------
    function showError(text) {
        Swal.fire({
            title: "Oops...",
            text: text,
            icon: "error",
            confirmButtonText: "OK",
        })
    }
    const handleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this " + id + "!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(path + id)
                        .then(res => {
                            swal("Poof! " + id + " has been deleted!", {
                                icon: "success",
                            });
                            window.location.reload();
                        })
                        .catch(function (err) {
                            showError(err);
                        });
                } else {
                    swal(id + " is safe!");
                }
            });
    };

    //Handle Update here ----------------------------------------------------------------------------
    const handleUpdate = (id) => {
        setDataFormvalue(id)
        setisShow(!isShow)
    };

    const handleStand = (id) => {
        localStorage.setItem("idStandStadium", id)
        return window.location.href = "/standbystadium"
    };

    //Form action here ----------------------------------------------------------------------------
    const actionColumn = [
        {
            field: "action",
            headerName: "",
            width: 300,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <div>
                            <button
                                className="ticketButton"
                                onClick={() => handleStand(params.row._id)}>
                                Stand
                            </button>
                        </div>
                        <div>
                            <button
                                className="updateButton"
                                onClick={() => handleUpdate(params.row._id)}>
                                Update
                            </button>
                        </div>

                        <div>
                            <button
                                className="deleteButtonn"
                                onClick={() => handleDelete(params.row._id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                );
            },
        },
    ];

    //Form data grid here ----------------------------------------------------------------------------
    const dataGrid = (
        <> <DataGrid
            className="datagrid"
            rows={data}
            columns={stadiumColumns.concat(actionColumn)}
            getRowId={(row) => row._id}
            pageSize={8}
            rowsPerPageOptions={[8]} /></>
    )

    //Check show loading wait here ----------------------------------------------------------------------------
    const loading = (<>
        <div className="datatableTitle">
            List Stadium
            <Link to="/stadium/newStadium" className="newButton">
                Add New
            </Link>
        </div>
        {isRender ? <LoadingSpinner /> : dataGrid}</>)

    //Render here ----------------------------------------------------------------------------
    return (
        <div className="datatable">
            {isShow ? loading : <Update props={formvalue} />}
        </div>
    );
};

export default ListStadium;