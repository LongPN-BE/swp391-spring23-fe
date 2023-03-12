import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const New = () => {

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>New user</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput" >
                <label>Email</label>
                <input type="text" placeholder="john_doe@gmail.com" />
              </div>

              <div className="formInput" >
                <label>Firstname</label>
                <input type="text" placeholder="John" />
              </div>

              <div className="formInput" >
                <label>Lastname</label>
                <input type="text" placeholder="Doe" />
              </div>

              <div className="formInput" >
                <label>Phone</label>
                <input type="text" placeholder="0838-228-607" pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}" />
              </div>
            </form>
            <div className="btnSend">
              <button>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
