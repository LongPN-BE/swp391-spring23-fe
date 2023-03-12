import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import ListTicket from "../../components/table/ListTicketByMatch"
import { Link } from "react-router-dom";
import "./ticket.scss";
import { useEffect, useState } from "react";
import axios from "../../AxiosConfig";
import LoadingSpinner from "../LoadingWait/LoadingSpinner";
import moment from "moment";

var path = "matches/";
const Ticket = () => {
  var id = localStorage.getItem("idClickTicketByMatch");
  const [isloading, setloading] = useState(true);
  const [data, setData] = useState([])

  //UseEffect here ---------------------------------------------------------------------------------------------
  useEffect(
    function () {
      //Load Match
      localStorage.removeItem("editTicketId");
      axios
        .get(path + id)
        .then(function (data) {
          console.log("test data ", data.data);
          setData(data.data)
          setloading(false);
        })
        .catch(function (err) {
          console.log(32, err);
        });
    },
    []
  );
  //Form data tag ticket here ---------------------------------------------------------------------------------------------
  const renderTicket = (
    <>
      <div className="single">
        <div className="singleContainer">
          <div className="top">
            <div className="left">
              <h1 className="title">Home Club</h1>
              <div className="itemImg">
                <img src={data.logoHomeClub} />
              </div>
              <div className="item">
                <div className="details">
                  <h1 className="itemTitle" name="clubHome">{data.nameHomeClub}</h1>
                </div>
              </div>
            </div>
            <div className="right">
              <h1 className="title">Visitor Club</h1>
              <img
                src={data.logoAwayClub}
                alt=""
                className="itemImg"
              />
              <h1 className="itemTitle" name="clubVisitor">{data.nameAwayClub}</h1>

            </div>
          </div>
          <div className="top">
            <div className="left">
              <div className="detailItem">
                <span className="itemKey">Stadium: </span>
                <span className="itemValue">
                  {data.nameStadium}
                </span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Date: </span>
                <span className="itemValue">{moment(data.date).format('DD/MM/YYYY -  h:mm a')}</span>
              </div>
            </div>
          </div>

          <div className="bottom">
            <div className="left">
              <Link to="/ticket/newTicket" className="link">
                <button className="editButton">
                  Add New
                </button>
              </Link>
            </div>
            <h1 className="title">List Ticket</h1>
            <ListTicket />
          </div>
        </div>
      </div>
    </>
  );
  //Render here ---------------------------------------------------------------------------------------------
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        {isloading ? <LoadingSpinner /> : renderTicket}
      </div >
    </div >
  );
};

export default Ticket;