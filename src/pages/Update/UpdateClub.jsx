import "./update.scss";
import axios from "../../AxiosConfig";
import { useState, useEffect } from "react";


var path = "clubs/";
var pathStadium = "stadiums/";
const UpdateClub = (props) => {
    const [dataStadium, setDataStadium] = useState([]);
    const [logo, setLogo] = useState([]);
    const [clubId, setClubId] = useState();
    const [stadiumId, setStadiumId] = useState();
    const [clubName, setClubName] = useState();
    const [location, setLocation] = useState();

    useEffect(
        function () {
            //data club
            axios.get(path + "/" + props.props)
                .then(function (data) {
                    console.log("data", data.data);
                    setClubId(data.data._id)
                    setClubName(data.data.name)
                    setLogo(data.data.logo)
                    setStadiumId(data.data.stadiumId)
                    setLocation(data.data.location)
                })
                .catch(function (err) {
                    console.log(32, err);
                });

            //data stadium
            axios.get(pathStadium)
                .then(function (data) {
                    console.log(data.data);
                    setDataStadium(data.data);
                })
                .catch(function (err) {
                    console.log(32, err);
                });
        },
        []
    );



    function handleSubmit(event) {
        event.preventDefault();
        //To do code here
        alert("Update Club : " + clubId + " - " + clubName + " - " + location + " - " + stadiumId + " - " + logo)
        axios.put(path + clubId, {
            "name": clubName,
            "location": location,
            "logo": logo,
            "stadiumId": stadiumId
        })
            .then(response => {
                alert("Updated")
                //Go to club page
                return window.location.href = "../club"
            })
            .catch(error => {
                alert(error)
                console.log(error);
            });
    }

    return (
        <div className="update">
            <div className="newContainer">
                <div className="top">
                    <h1>Update club</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={handleSubmit}>
                            <div className="formInput" >
                                <label>Name</label>
                                <input id="txtNameClub" type="text" name="name" placeholder="Name of club" value={clubName} onChange={e => setClubName(e.target.value)} required/>
                            </div>

                            <div className="formInput" >
                                <label>Location</label>
                                <input id="txtLocation" type="text" name="location" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required/>
                            </div>

                            {/* Stadium for club */}
                            <div className="formInput" >
                                <label>Stadium</label>
                                <select name="stadiumId"
                                    value={stadiumId}
                                    onChange={e => setStadiumId(e.target.value)}>
                                    {dataStadium.map((entity) => (
                                        <option value={entity._id} id={entity._id}>{entity.name}</option>
                                    ))
                                    }
                                </select>
                            </div>

                            <div className="formInput" >
                                <label>Logo</label>
                                <input id="txtLogoUrl" type="text" name="logo" placeholder="Logo url" value={logo} onChange={e => setLogo(e.target.value)} required/>
                            </div>


                            <div className="btnSend">
                                <button type="submit" >Save</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateClub;
