import { useContext, useEffect, useState } from "react";
import "./register.scss";
import axios from "../../AxiosConfig";
import { useNavigate } from "react-router-dom";
import background from "./backgroundLogin.jpeg"

const Register = () => {
    const [error, setError] = useState(false);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [confirm, setConfirm] = useState();
    const navigate = useNavigate()

    useEffect(
        function () {
            const user = localStorage.getItem("user")
            if (user != "null") {
                navigate("/")
            }
        },
        []
    );

    const handleConfirm = (pw, conf) => {
        if (pw == conf) {
            return true
        } else return false
    }

    console.log("==================")
    console.log("username onchange: ", username)
    console.log("email onchange: ", email)
    console.log("password onchange: ", password)
    console.log("confirm onchange: ", confirm)


    const handleRegister = (e) => {
        e.preventDefault();
        if (handleConfirm(password, confirm)) {
            axios.post("auth/register", {
                "username": username,
                "password": password,
                "email": email,
            }).then(response => {
                alert("User has been created!", response.data._id)
                console.log(response.data)
            }).catch(error => {
                alert(error)
                console.log(error);
            });
        } else alert("Confirmation password does not match! Please try again")
    };



    return (
        <section>

            <div className="content-wrapper">
                <div className="content">
                    <div className="signup-wrapper shadow-box">

                        <div className="signup-form ">
                            <div className="wrapper-2">
                                <div className="form-title">Sign up today!</div>
                                <div className="form">
                                    <form onSubmit={handleRegister}>
                                        <div className="content-item">
                                            <label>Username </label>
                                            <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} required />

                                        </div>

                                        <div className="content-item">
                                            <label>email address</label>
                                            <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} required />

                                        </div>

                                        <div className="content-item">

                                            <label>Password</label>
                                            <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required />

                                        </div>
                                        <div className="content-item">

                                            <label>Password confirmation</label>
                                            <input type="password" name="password-con" onChange={(e) => setConfirm(e.target.value)} required />
                                        </div>


                                        <button type="submit" className="signup">SIGN UP </button>
                                        <a href="/login" className="loginbtn">login</a>
                                    </form>
                                </div>
                            </div>

                        </div>
                        <div className="company-details ">
                            <img src={background} alt="" />
                            <div className="shadow"></div>
                            <div className="wrapper-1">
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>

    );
};

export default Register;