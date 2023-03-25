import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "../../AxiosConfig"
import { Alert } from "react-bootstrap";
import Swal from "sweetalert2";

var pathMatch = "matches/";
var matchId = localStorage.getItem("idClickTicketByMatch");
var pathStand = "stands/stadium/"
var pathTicket = "match/tickets/";
const New = () => {
  const [dataMatch, setDataMatch] = useState([]);
  const [dataTicket, setDataTicket] = useState([]);
  const [stadiumId, setStadiumId] = useState([]);
  useEffect(
    function () {
      console.log(13, matchId, stadiumId)
      // Get Data Match
      axios
        .get(pathMatch + matchId)
        .then(function (data) {
          console.log("Test Data Match", data.data);
          // setData(data.data);
          setDataMatch(data.data);
          setStadiumId(data.data.stadiumId)
          getlistStand();
        })
        .catch(function (err) {
          console.log(32, err);
        });


    }, [stadiumId]
  )
  function getlistStand() {
    axios
      .get(pathStand + stadiumId)
      .then(function (data) {
        console.log("Test List Stand", data.data);
        setDataTicket(data.data);
      })
      .catch(function (err) {
        console.log(32, err);
      });
  }
  const [formValue, setFormValue] = useState({
    idMatch: matchId,
    idArea: "",
    amount: "",
    price: ""
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    console.log("Test onchange :" + name + " - Value: " + value)
  };

  const { idArea, amount, price } = formValue;

  function showAlert() {
    Swal.fire({
      title: "Create Success",
      text: "Ticket amount: " + amount + " with price: " + price,
      icon: "success",
      confirmButtonText: "OK",
    }).then(function () {
      window.location.href = "../ticket"
    });
  }

  function showError(text) {
    Swal.fire({
      title: "Oops...",
      text: text,
      icon: "error",
      confirmButtonText: "OK",
    })
  }

  function showWarning(text) {
    Swal.fire({
      title: "Please !",
      text: text,
      icon: "info",
      confirmButtonText: "OK",
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (idArea == null || idArea == 0) showWarning("Please select a stand!")
    else {
      //To do code here
      axios.post(pathTicket + matchId, {
        "standId": idArea,
        "matchId": matchId,
        "price": price,
        "quantity": amount
      })
        .then(response => {
          showAlert()
        })
        .catch(error => {
          showError(error)
          console.log(error);
        });
    }
  }

  const form = (

    <div className="bottom">
      <div className="right">
        <form onSubmit={handleSubmit}>

          <div className="formInput" >
            <label>Match</label>
            <input type="text"
              value={dataMatch.nameHomeClub + " -  vs  - " + dataMatch.nameAwayClub} disabled />
          </div>

          <div className="formInput" >
            <label> Date </label>
            <input type="text"
              value={dataMatch.date} disabled />
          </div>


          <div className="formInput" >
            <label> Stadium </label>
            <input type="text"
              value={dataMatch.nameStadium} disabled />
          </div>




          <div className="formInput" >
            <label>Amount</label>
            <input type="number"
              name="amount"
              onChange={handleChange} required />
          </div>

          <div className="formInput" >
            <label> Stand </label>
            <select name="idArea" required
              onChange={handleChange}>
              <option value={0} >-- SELECT STAND --</option>
              {dataTicket.map((entity) => (
                <option value={entity._id} id={entity._id}>{entity.name}</option>
              ))}
            </select>
          </div>

          <div className="formInput" >
            <label>Price</label>
            <input type="number"
              name="price"
              onChange={handleChange} required />
          </div>


          <div className="btnSend">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>New Ticket</h1>
        </div>
        {dataTicket.length == 0 ?
          <Alert className="mt-5" variant="info">
            There no stand for this stadium
          </Alert>
          : form}
      </div>
    </div>
  );
};

export default New;