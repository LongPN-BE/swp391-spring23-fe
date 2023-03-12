import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/table/ListClub"
import "./club.scss";

const club = () => {
    return (
      <div className="list">
        <Sidebar/>
        <div className="listContainer">
          <Navbar/>
          <Datatable/>
        </div>
      </div>
    )
  }

export default club;