import "./table.scss";
import { DataGrid } from "@mui/x-data-grid";
import { stadiumColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../AxiosConfig";
import Update from "../../pages/Update/UpdateStadium"
import LoadingSpinner from "../../pages/LoadingWait/LoadingSpinner";

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
    const handleDelete = (id) => {
        console.log(id);
        axios.delete(path + id)
            .then(res => {
                console.log(res);
                alert('Deleted stadium by id: ' + id);
                setData(data.filter((item) => item.id !== id));
            })
            .catch(function (err) {
                console.log(err);
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