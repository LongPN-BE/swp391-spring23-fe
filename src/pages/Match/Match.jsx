import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./match.scss";
import Table from "../../components/table/Table";
import { useState, useEffect } from "react";
import axios from "../../AxiosConfig";
import LoadingSpinner from "../LoadingWait/LoadingSpinner";
import '@fortawesome/fontawesome-free/css/all.min.css';

//path
var pathTournament = "tournaments/";
var pathRound = "rounds/";
var pathMatch = "matches/round/";
const Match = () => {
  //Const-----------------------------------------------------
  const [dataTournament, setDataTournament] = useState([]);
  const [DataRoundbyId, setDataRoundbId] = useState([]);
  const [dataRound, setDataRound] = useState([]);
  const rowsRound = dataRound;
  const rowsTournament = dataTournament;
  const [isShow, setShow] = useState(true)
  //useEffect-----------------------------------------------------
  useEffect(
    function () {
      axios
        .get(pathTournament)
        .then(function (data) {
          setDataTournament(data.data);
          handleChange();
        })
        .catch(function (err) {
          console.log(32, err);
        });
    },
    []
  );

  //handle Change Search round by Tournament-----------------------------------------------------
  const handleChange = (event) => {
    var select = document.querySelector('.NameTour');
    var value = select.options[select.selectedIndex].value;
    axios
      .get(pathRound + value)
      .then(function (data) {
        setDataRound(data.data);
        handleChangeRound(event)
      })
      .catch(function (err) {
        console.log(32, err);
      });
  }

  //handle Change search Match by Round-----------------------------------------------------
  const handleChangeRound = (event) => {
    setShow(true)
    var select = document.querySelector('.Round');
    var valueRound = select.options[select.selectedIndex].value;
    // localStorage.setItem("roundId", valueRound)
    axios
      .get(pathMatch + valueRound)
      .then(function (data) {
        setDataRoundbId(data.data)
        setShow(false)
      })
      .catch(function (err) {
        console.log(32, err);
      })
  }

  //-----------------------------------------------------------------------------------------------
  return (
    <div className="match">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="listContainer">
          <div className="listTitle" style={{ fontSize: "20px" }}>
            Tournament: </div>

          <div className="formInput1" >
            <select className="NameTour"
              onChange={handleChange}>
              {rowsTournament.map((entity) => (
                <option value={entity._id} id={entity._id} key={entity._id}>{entity.name}</option>
              ))
              }
            </select>
            <a className="button touch new-btn" href="/match/newTournament"><i className="fa-duotone fa-plus"></i></a>
          </div>
          <div className="listTitle" style={{ fontSize: "20px" }}>
            Round: </div>
          <div className="formInput" >

            <select className="Round"
              onChange={handleChangeRound}>
              {rowsRound.map((entity) => (
                <option value={entity._id} id={entity._id} key={entity._id}>{entity.numberRound}</option>
              ))}
            </select>
            <a className="button touch new-btn" href="/match/newRound"><i className="fa-duotone fa-plus"></i></a>
          </div>
          {isShow ? <LoadingSpinner /> : <Table props={DataRoundbyId} />}

        </div>
      </div >
    </div >
  );
};

export default Match;