import "./table.scss";
import { DataGrid } from "@mui/x-data-grid";
import { clubColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../AxiosConfig";
import Update from "../../pages/Update/UpdateClub";
import LoadingSpinner from "../../pages/LoadingWait/LoadingSpinner";
import swal from 'sweetalert';
import Swal from "sweetalert2";

var path = "clubs";
const ListStadium = () => {
    const [isRender, setisRender] = useState(true);
    const [data, setData] = useState([]);
    const [formValue, setDataFormvalue] = useState();
    const [isShow, setisShow] = useState(true);

    //UseEffect load data ----------------------------------------------------------
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

    // Delete function ----------------------------------------------------------
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
            text: "Once deleted, you will not be able to recover this " + id,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(path + "/" + id)
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
    // Handle Update ----------------------------------------------------------
    const handleUpdate = (id) => {
        setDataFormvalue(id)
        setisShow(!isShow)
    };

    // Form action of data grid----------------------------------------------------------
    const actionColumn = [
        {
            field: "action",
            headerName: "",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <div>
                            <button
                                className="updateButton"
                                onClick={() => handleUpdate(params.row._id)}>
                                Update
                            </button>
                        </div>
                        <div>
                            <button className="deleteButtonn"
                                onClick={() => handleDelete(params.row._id)}>
                                Delete
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
            columns={clubColumns.concat(actionColumn)}
            getRowId={(row) => row._id}
            pageSize={8}
            rowsPerPageOptions={[8]} /></>
    )

    // Form check show loading if undefine data----------------------------------------------------------
    const loading = (<>
        <div className="datatableTitle">
            List Club
            <Link to="/club/newClub" >
                <button className="newButton">
                    Add New
                </button>
            </Link>
        </div>
        {isRender ? <LoadingSpinner /> : dataGrid}
    </>)

    // Form render here----------------------------------------------------------
    return (
        <div className="datatable">

            {isShow ? loading : <Update props={formValue} />}
        </div>
    );


};

export default ListStadium;