import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "../../AxiosConfig";
import Swal from "sweetalert2";

var path = "stadiums/";
const New = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    city: "",
    capcity: ""
  });

  //handle Change value
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const { name, city, capcity } = formValue;
  //function
  function showSucces() {
    Swal.fire({
      title: "Create Success",
      text: "Stadium name: " + name + " at " + city + " with capital " + capcity,
      icon: "success",
      confirmButtonText: "OK",
    }).then(function () {
      window.location.href = "../stadium"
    });
  }

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
    //To do code here
    axios.post(path, {
      "name": name,
      "city": city,
      "capcity": capcity
    })
      .then(response => {
        showSucces()
      })
      .catch(error => {
        showError(error)
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
          <h1>New Stadium</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>

              {/* Name of Stadium */}
              <div className="formInput" >
                <label>Name of Stadium</label>
                <input type="text"
                  name="name"
                  onChange={handleChange}
                  placeholder="Ho Chi Minh City FC" required />
              </div>

              {/* Location of Stadium */}
              <div className="formInput" >
                <label>Location of Stadium</label>
                <input type="text"
                  name="city"
                  onChange={handleChange}
                  placeholder="" required />
              </div>

              {/* Capcity */}
              <div className="formInput" >
                <label>Capcity</label>
                <input type="text"
                  name="capcity"
                  onChange={handleChange}
                  placeholder="" required />
              </div>

              {/* Button Send to add new */}
              <div className="btnSend">
                <button>Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
