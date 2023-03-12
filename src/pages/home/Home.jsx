import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";
import Table from "../../components/table/Table";
import { useState, useEffect } from "react";
import axios from "../../AxiosConfig";
import OrderWidget from "../../components/widget/OrderWidget"
import MatchWidget from "../../components/widget/MatchWidget"
import UserWidget from "../../components/widget/UserWidget"

var path = "matchs/";
const Home = () => {
  const [data, setData] = useState([]);
  // //load data page list match defaul
  useEffect(
    function () {
      axios.get("matches/")
        .then(function (data) {
          console.log(data.data);
          setData(data.data);
          // console.log(list);
        })
        .catch(function (err) {
          console.log(32, err);
        });
    },
    []
  );


  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="widgets">
          <UserWidget />
          <OrderWidget />
          <MatchWidget />
        </div>
        {/* <div className="listTitle" style={{ fontSize: "20px" }}>Tournament: NIGHT WOLF V.LEAGUE 1 - 2022</div>
          <div className="listTitle" style={{ fontSize: "20px" }}>Round: 01</div> */}
        <Table props={data} />
      </div>
    </div>
  );
};

export default Home;
