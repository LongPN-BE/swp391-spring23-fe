import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/table/ListStand"


const Stand = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Datatable />
            </div>
        </div>
    )
};

export default Stand;