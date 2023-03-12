import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
//Add new
import NewRound from "./pages/new/NewRound"
import NewTournament from "./pages/new/NewTournament"
import NewMatch from "./pages/new/NewMatch"
import NewUser from "./pages/new/NewUser";
import NewStadium from "./pages/new/NewStadium";
import NewClub from "./pages/new/NewClub";
import NewTicket from "./pages/new/NewTicket";
import NewStand from "./pages/new/NewStand";

//View List
import List from "./pages/list/List";
import Profile from "./pages/profile/Profile"
import Stadium from "./pages/Stadium/Stadium"
import Match from "./pages/Match/Match"
import Club from "./pages/Club/Club"
import TicketByMatch from "./pages/Ticket/Ticket"
import Ticket from "./pages/Ticket/Ticket"
import Order from "./pages/order/Order"
import OrderDetails from "./pages/orderDetails/OrderDetails";
import UserOrderDetails from "./pages/orderDetails/UserOrderDetail";
import StandByStadium from "./pages/Stand/Stand";

//Update
import UpdateMatch from "./pages/Update/UpdateMatch"
import UpdateStadium from "./pages/Update/UpdateStadium";
import UpdateRound from "./pages/Update/UpdateRound";
import UpdateStand from "./pages/Update/UpdateStand";
import UpdateTournament from "./pages/Update/UpdateTournament";
import UpdateClub from "./pages/Update/UpdateClub";
import UpdateUser from "./pages/Update/UpdateUser";
import UpdateTicket from "./pages/Update/UpdateTicket";
//More libary
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { stadiumInput, userInputs, clubInput } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Landing from "./pages/Landing/Landing";
import BuyTicket from "./pages/BuyTicket/buyTicket";
import Single from "./pages/single/Single";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext);


  const RequiredAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  console.log(currentUser);

  const RequiredAdmin = ({ children }) => {
    return currentUser.isAdmin ? children : <Navigate to="/" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* Admin */}
            <Route path="admin">
              <Route index element={<RequiredAdmin><Home /></RequiredAdmin>} />
            </Route>

            {/* Match */}
            <Route path="match">
              <Route index element={<RequiredAdmin><Match /></RequiredAdmin>} />
              <Route path="updateMatch" element={<RequiredAdmin><UpdateMatch /></RequiredAdmin>} />
              <Route path="updateRound" element={<RequiredAdmin><UpdateRound /></RequiredAdmin>} />
              <Route path="updateTournament" element={<RequiredAdmin><UpdateTournament /></RequiredAdmin>} />
              <Route path="newMatch" element={<RequiredAdmin><NewMatch /></RequiredAdmin>} />
              <Route path="newRound" element={<RequiredAdmin><NewRound /></RequiredAdmin>} />
              <Route path="newTournament" element={<RequiredAdmin><NewTournament /></RequiredAdmin>} />
            </Route>


            {/* Ticket  By Match*/}
            <Route path="ticketbymatch">
              <Route index element={<RequiredAuth><TicketByMatch /></RequiredAuth>} />
            </Route>

            {/* Stand  By Stadium*/}
            <Route path="standbystadium">
              <Route index element={<RequiredAdmin><StandByStadium /></RequiredAdmin>} />
              <Route path="newStand" element={<RequiredAdmin><NewStand /></RequiredAdmin>} />
              <Route path="updateStand" element={<RequiredAdmin><UpdateStand /></RequiredAdmin>} />
            </Route>


            {/* Ticket  */}
            <Route path="ticket">
              <Route index element={<RequiredAdmin><Ticket /></RequiredAdmin>} />
              <Route path="updateTicket" element={<RequiredAdmin><UpdateTicket /></RequiredAdmin>} />
              <Route path="newTicket" element={<RequiredAdmin><NewTicket /></RequiredAdmin>} />
            </Route>

            {/* User */}
            <Route path="users">
              <Route index element={<RequiredAdmin><List /></RequiredAdmin>} />
              <Route path="updateUser" element={<RequiredAdmin><UpdateUser /></RequiredAdmin>} />
            </Route>

            {/* Order */}
            <Route path="order">
              <Route index element={<RequiredAdmin><Order /></RequiredAdmin>} />
              <Route path="order-detail" element={<RequiredAdmin><OrderDetails /></RequiredAdmin>} />

            </Route>

            {/* Profile */}
            <Route path="profile">
              <Route index element={<RequiredAuth><Profile /></RequiredAuth>} />
              <Route path="order-detail" element={<RequiredAuth><UserOrderDetails /></RequiredAuth>} />
            </Route>

            {/* Stadium */}
            <Route path="stadium">
              <Route index element={<RequiredAdmin><Stadium /></RequiredAdmin>} />
              <Route path="updateStadium" element={<RequiredAdmin><UpdateStadium /></RequiredAdmin>} />
              <Route path="newStadium" element={<RequiredAdmin><NewStadium /></RequiredAdmin>} />
            </Route>

            {/* Buy Ticket */}
            <Route path="purchase">
              <Route index element={<RequiredAuth><BuyTicket /></RequiredAuth>} />
            </Route>


            {/* Club */}
            <Route path="club">
              <Route index element={<RequiredAdmin><Club /></RequiredAdmin>} />
              <Route path="updateClub" index element={<RequiredAdmin><UpdateClub /></RequiredAdmin>} />
              <Route path="newClub" element={<RequiredAdmin><NewClub /></RequiredAdmin>} />
            </Route>



          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
