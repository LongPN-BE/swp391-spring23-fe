import "./profile.scss";
import Navbar from "../../components/landing/Navbar";
import Datatable from "../../components/table/TableGrid";
import { useState, useEffect, useContext } from "react";
import axios from "../../AxiosConfig";
import { AuthContext } from "../../context/AuthContext";
import moment from "moment";



const Profile = () => {
  const { currentUser } = useContext(AuthContext)


  return (
    <div>
      <Navbar />
      <div className="single">

        <div className="singleContainer">

          <div className="top">
            <div className="left">
              {/* <div className="editButton">Edit</div> */}
              <h1 className="title">Information</h1>
              <div className="item">
                <img
                  src="https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
                  alt=""
                  className="itemImg"
                />
                <div className="details">
                  <h1 className="itemTitle">{currentUser.username}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{currentUser.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">ROLE:</span>
                    {currentUser.isAdmin ? <span className="itemValue">ADMIN</span> : <span className="itemValue">USER</span>}

                  </div>
                  <div className="detailItem">
                    <span className="itemKey">CREATED AT:</span>
                    <span className="itemValue">
                      {moment(currentUser.createdAt).format('DD/MM/YYYY -  h:mm a')}
                    </span>
                  </div>
                  {/* <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">USA</span>
                </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="bottom">
            <h1 className="title">Last Transactions</h1>
            <Datatable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
