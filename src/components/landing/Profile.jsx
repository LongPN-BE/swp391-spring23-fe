import "./Profile.scss";
import { PopupMenu } from "react-simple-widgets";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

//npm install formik
//npm install react-simple-widgets
const Profile = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem("user")
    const { currentUser, dispatch } = useContext(AuthContext)



    const handleLogout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("access_token")
        console.log("user is logged out")
        window.location.href = "/"
    }




    return (
        <div id="app">
            <div className="text-end">
                <PopupMenu>
                    <button className="btn-primary">
                        <small> Profile</small>
                    </button>

                    <div className="card text-start">
                        <div className="card-body px-4 py-4">
                            <div id="circle-avatar" className="text-center mx-auto mb-4">
                                <span>A</span>
                            </div>

                            <h5 className="text-center mb-0">{currentUser.name}</h5>
                            <p className="text-center mb-2">{currentUser.email}</p>

                            <hr />

                            <p
                                className="mb-0"
                                style={{ color: "#bebebe", fontWeight: "bold", fontSize: 12 }}
                            >
                                ROLES
                            </p>
                            <p style={{ fontSize: 12 }}>
                                {currentUser.isAdmin ? "Admin" : "User"}
                            </p>

                            <hr className="mb-0" style={{ margin: "0 -24px 0" }} />

                            <div
                                className="list-group list-group-flush"
                                style={{ margin: "0 -24px 0" }}
                            >
                                <button className="list-group-item list-group-item-action px-4">
                                    <a className="profile-btn" href="/profile">Profile</a>
                                </button>

                            </div>

                            <hr style={{ margin: "0 -24px 24px" }} />

                            <div className="d-grid">
                                <a href="/" className="btn btn-primary">
                                    <span onClick={handleLogout}>Logout</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </PopupMenu>
            </div>
        </div>
    );
}
export default Profile;