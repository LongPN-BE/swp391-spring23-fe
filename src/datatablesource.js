import moment from "moment";
//const of user
export const userColumns = [
  {
    field: "_id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "username",
    headerName: "Name",
    width: 150,
  },
  {
    field: "email",
    headerName: "email",
    width: 250,
  },
  {
    field: "createdAt",
    headerName: "Date Created",
    valueFormatter: params =>
      moment(params?.value).format("DD/MM/YYYY hh:mm A"),
    width: 170,
  }
];

//const of club
export const clubColumns = [
  {
    field: "_id",
    headerName: "ID",
    width: 70,
  },
  {
    field: "name",
    headerName: "Name",
    width: 300,
  },
  {
    field: "location",
    headerName: "Localtion",
    width: 200,
  },
  {
    field: "nameStadium",
    headerName: "Stadium",
    width: 250,
  },
  {
    field: "logo",
    headerName: "Logo",
    width: 150,
    renderCell: (img) => {
      return (
        <div className="allImage">
          <img style={{ width: "32px", height: "32px", borderRadius: "50%", marginRight: "10px", objectFit: "cover" }}
            src={img.value} alt="" className="image" />
        </div>
      );
    },
  }
];

//const of stadium
export const stadiumColumns = [
  {
    field: "_id",
    headerName: "ID",
    width: 250,
  },
  {
    field: "name",
    headerName: "Name",
    width: 250,
  },
  {
    field: "city",
    headerName: "Localtion",
    width: 200,
  },
  {
    field: "capcity",
    headerName: "Capacity",
    width: 100,
  }
];

export const standColums = [
  {
    field: "_id",
    headerName: "ID",
    width: 250,
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "quantitySeat",
    headerName: "Seat Quantity",
    width: 120,
  },
];


//const of ticket list
export const ticketColumns = [
  {
    field: "_id",
    headerName: "ID",
    width: 70,
  },
  {
    field: "nameStand",
    headerName: "Stand",
    width: 120,
  },
  {
    field: "quantity",
    headerName: "Account",
    width: 120,
  },
  {
    field: "price",
    headerName: "Ticket",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

//const of oder list
export const oderColumns = [
  {
    field: "_id",
    headerName: "Order ID",
    width: 200,
  },
  {
    field: "name",
    headerName: "Username",
    width: 100,
  },
  {
    field: "totalPrice",
    headerName: "Total Payment",
    width: 150,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];

export const userOrderColumns = [
  {
    field: "_id",
    headerName: "Order ID",
    width: 300,
  },
  {
    field: "name",
    headerName: "Username",
    width: 100,
  },
  {
    field: "date",
    headerName: "Time",
    width: 100,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 100,
  },
  {
    field: "totalPrice",
    headerName: "Total Payment",
    width: 150,
  }
];


//Match Colums
export const matchColumns = [
  {
    field: "_id",
    headerName: "ID",
    width: 70,

  },
  {
    field: "logoHomeClub",
    headerName: "-",
    width: 45,
    renderCell: (img) => {
      return (
        <div className="allImage">
          <img style={{ width: "32px", height: "32px", borderRadius: "50%", marginRight: "10px", objectFit: "cover" }}
            src={img.value} alt="" className="image" />
        </div>
      );
    },
  },
  {
    field: "nameHomeClub",
    headerName: "Home",
    width: 190,
  },
  {
    field: "logoAwayClub",
    headerName: "-",
    width: 45,
    renderCell: (img) => {
      return (
        <div className="allImage">
          <img style={{ width: "32px", height: "32px", borderRadius: "50%", marginRight: "10px", objectFit: "cover" }}
            src={img.value} alt="" className="image" />
        </div>
      );
    },
  },
  {
    field: "nameAwayClub",
    headerName: "Away",
    width: 190,
  },
  {
    field: "nameStadium",
    headerName: "Stadium",
    width: 180,
  },
  {
    field: "date",
    headerName: "Date",
    valueFormatter: params =>
      moment(params?.value).format("DD/MM/YYYY hh:mm A"),
    width: 130,
  },
];