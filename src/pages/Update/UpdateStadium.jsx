import "./update.scss";
import { useState, useEffect } from "react";
import axios from "../../AxiosConfig";



const UpdateStadium = (props) => {
  console.log(7, props)


  var path = "stadiums/";
  useEffect(
    function () {
      axios
        .get(path + props.props)
        .then(function (data) {
          console.log("data", data.data);
          setStadiumId(data.data._id)
          setStadiumName(data.data.name)
          setCapacity(data.data.capcity)
          setLocation(data.data.city)
        })
        .catch(function (err) {
          console.log(32, err);
        });
    },
    []
  );

  const [stadiumName, setStadiumName] = useState();
  const [stadiumId, setStadiumId] = useState();
  const [capacity, setCapacity] = useState();
  const [location, setLocation] = useState();


  function handleSubmit(event) {
    event.preventDefault();
    //To do code here
    alert("Update Stadium: " + stadiumId + " - " + stadiumName + " - " + capacity + " - " + location)
    axios.put(path + stadiumId, {
      "capcity": capacity,
      "_id": stadiumId,
      "city": location,
      "name": stadiumName
    })
      .then(response => {
        alert("Updated")
        //Go to club page
        return window.location.href = "../stadium"
      })
      .catch(error => {
        alert(error)
        console.log(error);
      });
    //end to do code
  }



  return (
    <div className="update">
      {/* <Sidebar /> */}
      <div className="newContainer">
        {/* <Navbar /> */}
        <div className="top">
          <h1>Update Stadium</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput" >
                <label>Name</label>
                <input type="text" placeholder="Stadium Name" name="stadiumName" value={stadiumName} onChange={e => setStadiumName(e.target.value)} />
              </div>

              <div className="formInput" >
                <label>Localtion</label>
                <input type="text" placeholder="Location" name="location" value={location} onChange={e => setLocation(e.target.value)} />
              </div>

              <div className="formInput" >
                <label>Capacity</label>
                <input type="text" placeholder="Capacity" name="capacity" value={capacity} onChange={e => setCapacity(e.target.value)} />
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

export default UpdateStadium;
