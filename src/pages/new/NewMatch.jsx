import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "../../AxiosConfig";

//path
var pathClub = "clubs/";
var pathStadium = "stadiums/";
var pathTournament = "tournaments/";
var pathRound = "rounds/";
var pathMatch = "matches/";
const New = () => {
      //data--------------------------------------------------------
  const [dataTournament, setDataTournament] = useState([]);
  const [DataRound, setDataRound] = useState([]);
  const [dataClub, setDataClub] = useState([]);
  const [dataStadium, setDataStadium] = useState([]);
  const [formValue, setFormValue] = useState({
    clubHomeId: "",
    clubVisitorId: "",
    roundId: "",
    stadiumId: "",
    capacity: "",
    timeStart: ""
  });
  //useEffect
  useEffect(
    function () {
      //get data api Club
      axios.get(pathClub)
        .then(function (data) {
          console.log(data.data);
          setDataClub(data.data);
        })
        .catch(function (err) {
          console.log(32, err);
        });

      //get data api Stadium
      axios.get(pathStadium)
        .then(function (data) {
          console.log(data.data);
          setDataStadium(data.data);
        })
        .catch(function (err) {
          console.log(32, err);
        });
      //get data api Tournament
      axios
        .get(pathTournament)
        .then(function (data) {
          console.log(18, data.data);
          setDataTournament(data.data);
        })
        .catch(function (err) {
          console.log(32, err);
        });
    },
    []
  );
  //handle Change Value--------------------------------------------------------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "tournamentId") {
      axios
        .get(pathRound + value)
        .then(function (data) {
          console.log(data.data);
          setDataRound(data.data);
          // console.log(list);
        })
        .catch(function (err) {
          console.log(32, err);
        });
    }
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const { homeClubId, awayClubId, roundId, stadiumId, date } = formValue;
  //handle Change Search round by Tournament-----------------------------------------------------
  function handleSubmit(event) {
    event.preventDefault();
    //To do code here
    alert("Add New matchs: "
      + "\n -Club home: " + homeClubId
      + "\n- club Away:" + awayClubId
      + "\n- club StadiumId:" + stadiumId
      + "\n- club RoundId:" + roundId
      + "\n- club Time Start:" + date)
    axios.post(pathMatch, {
      "homeClubId": homeClubId,
      "awayClubId": awayClubId,
      "roundId": roundId,
      "stadiumId": stadiumId,
      "date": date
    })
      .then(response => {
        alert("Add success")
        return window.location.href = "../match"
      })
      .catch(error => {
        alert(error)
        console.log(error);
      });

    //end to do code
  }



  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>New match</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              {/* Club Home */}
              <div className="formInput" >
                <label>Home</label>
                <select name="homeClubId"
                  onClick={handleChange}>
                  {dataClub.map((entity) => (
                    <option value={entity._id} id={entity._id}>{entity.name}</option>
                  ))
                  }
                </select>
              </div>

              {/* Club Visitor */}
              <div className="formInput" >
                <label>Away</label>
                <select name="awayClubId"
                  onClick={handleChange}>
                  {dataClub.map((entity) => (
                    <option value={entity._id} id={entity._id}>{entity.name}</option>
                  ))
                  }
                </select>
              </div>

              {/* Stadium for match */}
              <div className="formInput" >
                <label>Stadium</label>
                <select name="stadiumId"
                  onClick={handleChange}>
                  {dataStadium.map((entity) => (
                    <option value={entity._id} id={entity._id}>{entity.name}</option>
                  ))
                  }
                </select>
              </div>

              {/* Date */}
              <div className="formInput" >
                <label>Date</label>
                <input type="Date"
                  name="date"
                  onChange={handleChange} />
              </div>


              {/* Tournament */}
              <div className="formInput"
                onChange={handleChange}>
                <label>Tournament</label>
                <select name="tournamentId"
                  onClick={handleChange}>
                  {dataTournament.map((entity) => (
                    <option value={entity._id} id={entity._id}>{entity.name}</option>
                  ))
                  }
                </select>
              </div>

              {/* Round */}
              <div className="formInput" >
                <label>Round</label>
                <select name="roundId"
                  onClick={handleChange}>
                  {DataRound.map((entity) => (
                    <option value={entity._id} id={entity._id}>{entity.numberRound}</option>
                  ))
                  }
                </select>
              </div>


              <div className="btnSend">
                <button>Save</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default New;