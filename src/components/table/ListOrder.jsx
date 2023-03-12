import "./table.scss";
import { DataGrid } from "@mui/x-data-grid";
import { oderColumns } from "../../datatablesource";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import axios from "../../AxiosConfig";
import LoadingSpinner from "../../pages/LoadingWait/LoadingSpinner";
import Modal from "../../pages/orderDetails/OrderDetails";

var path = "order/";
const Datatable = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [isShow, setShow] = useState(true)
  //UseEffect here ------------------------------------------------------------------------------
  useEffect(
    function () {
      axios.get(path)
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

  const handleDetails = (id) => {
    console.log("click orderDetails:", id)
    sessionStorage.setItem("onClickOrderDetail", id)
    return window.location.href = "order/order-detail"
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
      columns={oderColumns.concat(actionColumn)}
      getRowId={(row) => row._id}
      pageSize={8}
      rowsPerPageOptions={[8]} /></>
  )

  //Render here--------------------------------------------------------------------
  return (
    <><div className="datatable">
      <div className="datatableTitle">
        List Order
      </div>
      {isShow ? <div className="spinner"><LoadingSpinner /></div> : dataGrid}
    </div>
    </>
  );
};

export default Datatable;