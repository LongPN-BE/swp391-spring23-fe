import "./update.scss";
import { useState, useEffect } from "react";
import axios from "../../AxiosConfig";
import Swal from "sweetalert2";

var path = "stadiums/";
const UpdateStadium = (props) => {


  useEffect(
    function () {
      axios
        .get(path + props.props)
        .then(function (data) {
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

  // Handle Submit --------------------------------------------
  function showError(text) {
    Swal.fire({
      title: 'Oops...',
      text: text,
      icon: "error",
      confirmButtonText: "OK",
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    Swal.fire({
      title: 'Do you want to save the ' + stadiumName + ' changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(path + stadiumId, {
          "capcity": capacity,
          "_id": stadiumId,
          "city": location,
          "name": stadiumName
        })
          .then(response => {
            Swal.fire('Saved!', '', 'success')
              .then(response => { window.location.href = "../stadium" })
          })
          .catch(error => {
            showError(error)
            console.log(error);
          });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
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
                <input type="text" placeholder="Stadium Name" name="stadiumName" value={stadiumName} onChange={e => setStadiumName(e.target.value)} required />
              </div>

              <div className="formInput" >
                <label>Localtion</label>
                <input type="text" placeholder="Location" name="location" value={location} onChange={e => setLocation(e.target.value)} required />
              </div>

              <div className="formInput" >
                <label>Capacity</label>
                <input type="text" placeholder="Capacity" name="capacity" value={capacity} onChange={e => setCapacity(e.target.value)} required />
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
