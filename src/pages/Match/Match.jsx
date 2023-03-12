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
var roundId = null;
const Match = () => {
  //Const-----------------------------------------------------
  const [dataTournament, setDataTournament] = useState([]);
  const [DataRoundbyId, setDataRoundbId] = useState([]);
  const [dataRound, setDataRound] = useState([]);
  const [tournamentId, setTournamentId] = useState([]);
  const [roundId, setRoundId] = useState([]);
  const rowsRound = dataRound;
  const rowsTournament = dataTournament;
  const [isShow, setShow] = useState(true)
  //useEffect-----------------------------------------------------
  useEffect(
    function () {
      axios
        .get(pathTournament)
        .then(function (data) {
          console.log(18, data.data);
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
    localStorage.setItem("TournamentId", value)
    setTournamentId(value)
    console.log(value);
    //to do search
    axios
      .get(pathRound + value)
      .then(function (data) {
        console.log(40, data.data);
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
    localStorage.setItem("roundId", valueRound)
    setRoundId(valueRound)
    axios
      .get(pathMatch + valueRound)
      .then(function (data) {
        console.log(62, data.data);
        setDataRoundbId(data.data)
        setShow(false)
      })
      .catch(function (err) {
        console.log(32, err);
      })
  }
  //Handle delete here ----------------------------------------------------------------------
  // const handleDeleteTournament = (id) => {
  //   // setData(data.filter((item) => item.id !== id));
  //   console.log(id);
  //   axios.delete("tournaments/" + id)
  //     .then(res => {
  //       console.log("check delete ", res);
  //       alert('Deleted tournament by id: ' + id);
  //       // setData(data.filter((item) => item.id !== id));
  //     })
  //     .catch(function (err) {
  //       console.log(err);
  //     });
  // };
  // //Handle delete here ----------------------------------------------------------------------
  // const handleDeleteRound = (id) => {
  //   // setData(data.filter((item) => item.id !== id));
  //   console.log(id);
  //   axios.delete("rounds/" + id)
  //     .then(res => {
  //       console.log("check delete ", res);
  //       alert('Deleted round by id: ' + id);
  //       // setData(data.filter((item) => item.id !== id));
  //     })
  //     .catch(function (err) {
  //       console.log(err);
  //     });
  // };

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
            <a className="button touch edit-btn" href="/match/updateTournament"><i className="fa-solid fa-pen"></i></a>
            {/* onClick={handleDeleteTournament(tournamentId)}*/}
            <a className="button touch delete-btn" href="#" ><i className="fa-solid fa-trash"></i></a>
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
            {/* <a className="button touch edit-btn" href="#"><i className="fa-solid fa-pen"></i></a> */}
            {/*onClick={handleDeleteRound(roundId)} */}
            <a className="button touch delete-btn" href="#"><i className="fa-solid fa-trash"></i></a>
          </div>
          {isShow ? <LoadingSpinner /> : <Table props={DataRoundbyId} />}

        </div>
      </div >
    </div >
  );
};

export default Match;