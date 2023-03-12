import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../AxiosConfig";
import LoadingSpinner from "../../pages/LoadingWait/LoadingSpinner";

var path = "users";
const Datatable = () => {

  const [isShow, setShow] = useState(true)
  //load data
  useEffect(
    function () {
      axios
        .get(path)
        .then(function (data) {
          console.log(data.data);
          setData(data.data);
          setShow(false)
          // console.log(list);
        })
        .catch(function (err) {
          console.log(32, err);
        });

        var  x =5;
        
    },
    []
  );

  const [data, setData] = useState([]);

  // xóa
  const handleDelete = (email) => {
    setData(data.filter((item) => item.email !== email));
    console.log(email)
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/updateUser" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const render = (
    <>

      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns}
        getRowId={(row) => row._id}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </>);
  return (
    <><div className="datatable">
      <div className="datatableTitle">
        List user
      </div>
      {isShow ? <div className="spinner"><LoadingSpinner /></div> : render}
    </div>
    </>
  );
};

export default Datatable;