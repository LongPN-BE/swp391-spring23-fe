import "./update.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "../../AxiosConfig";
import moment from "moment";

//path
var pathClub = "clubs/";
var pathStadium = "stadiums/";
var pathTournament = "tournaments/";
var pathRound = "rounds/";
var pathMatch = "matches/";
const UpdateMatch = () => {
  //data--------------------------------------------------------
  const [dataTournament, setDataTournament] = useState([]);
  const [DataRound, setDataRound] = useState([]);
  const [dataClub, setDataClub] = useState([]);
  const [dataStadium, setDataStadium] = useState([]);
  const [data, setData] = useState([]);
  const [homeClubId, setHomeClubId] = useState();
  const [awayClubId, setAwayClubId] = useState();
  const [roundId, setRoundId] = useState();
  const [stadiumId, setStadiumId] = useState();
  const [date, setDate] = useState();

  var id = localStorage.getItem("editMatchId");
  const [formValue, setFormValue] = useState({
    stadiumId: "",
    date: ""
  });
  //useEffect
  useEffect(
    function () {
      //Match
      axios.get(pathMatch + id)
        .then(function (respone) {
          console.log("test data ", data.data);
          setData(respone.data);
          setHomeClubId(respone.data.homeClubId)
          setAwayClubId(respone.data.awayClubId)
          setStadiumId(respone.data.stadiumId)
          setDate(respone.data.date)
          console.log("testtt: " + homeClubId + awayClubId + stadiumId + date)
        })
        .catch(function (err) {
          console.log(32, err);
        });
      // get data api Club
      axios.get(pathClub)
        .then(function (data) {
          console.log(data.data);
          setDataClub(data.data);
          // console.log(list);
        })
        .catch(function (err) {
          console.log(32, err);
        });

      //get data api Stadium
      axios.get(pathStadium)
        .then(function (data) {
          console.log(data.data);
          setDataStadium(data.data);
          // console.log(list);
        })
        .catch(function (err) {
          console.log(32, err);
        });
    },
    []
  );


  //handle Change Search round by Tournament-----------------------------------------------------
  function handleSubmit(event) {
    event.preventDefault();
    //To do code here
    alert("Update matchs: "
      + "\n -Club home: " + homeClubId
      + "\n- club Away:" + awayClubId
      + "\n- club StadiumId:" + stadiumId
      + "\n- club Time Start:" + date)
    axios.put(pathMatch + id, {
      "homeClubId": homeClubId,
      "awayClubId": awayClubId,
      "stadiumId": stadiumId,
      "date": date
    })
      .then(response => {
        alert("Update success")
        console.log(response.data)
        //Go to club page
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
          <h1>Update match</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              {/* Club Home */}
              <div className="formInput" >
                <label>Home</label>
                <select disabled name="homeClubId" value={homeClubId} onChange={(e) => setHomeClubId(e.target.value)}>
                  {dataClub.map((entity) => (
                    <option value={entity._id} key={entity._id} id={entity._id}>{entity.name}</option>
                  ))
                  }
                </select>
              </div>

              {/* Club Visitor */}
              <div className="formInput" >
                <label>Away</label>
                <select name="awayClubId" disabled
                  value={awayClubId} onChange={(e) => setAwayClubId(e.target.value)} >
                  {dataClub.map((entity) => (
                    <option value={entity._id} key={entity._id} id={entity._id}>{entity.name}</option>
                  ))
                  }
                </select>
              </div>

              {/* Stadium for match */}
              <div className="formInput" >
                <label>Stadium</label>
                <select name="stadiumId"
                  value={stadiumId}
                  onChange={(e) => setStadiumId(e.target.value)}>
                  {dataStadium.map((entity) => (
                    <option value={entity._id} key={entity._id} id={entity._id}>{entity.name}</option>
                  ))
                  }
                </select>
              </div>

              {/* Date */}
              <div className="formInput" >
                <label>Date</label>
                <input type="date"
                  value={moment(date).format('yyyy-MM-DD')}
                  name="date"
                  onChange={(e) => setDate(e.target.value)} />
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

export default UpdateMatch;