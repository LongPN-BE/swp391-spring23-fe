// import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { userService } from ".";
// import { auth } from "../firebase";
// import { signOut } from "firebase/auth";

// const [error, setError] = useState(false);
// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");

// const navitage = useNavigate()

// const { dispatch } = useContext(AuthContext)

// export const handleLogin = (e) => {
//     e.preventDefault();

//     signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // Signed in
//             const user = userCredential.user;
//             console.log(user);
//             dispatch({ type: "LOGIN", payload: user })
//             navitage("/")
//         })
//         .catch((error) => {
//             setError(true);
//         });
// };

// export const signInWithGoogle = () => {
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(auth, provider)
//         .then((result) => {
//             // This gives you a Google Access Token. You can use it to access the Google API.
//             const credential = GoogleAuthProvider.credentialFromResult(result);
//             const token = credential.accessToken;
//             // The signed-in user info.
//             const user = result.user;
//             // ...
//         }).catch((error) => {
//             // Handle Errors here.
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // The email of the user's account used.
//             const email = error.customData.email;
//             // The AuthCredential type that was used.
//             const credential = GoogleAuthProvider.credentialFromError(error);
//             // ...
//         });
// };

// export const signOutFirebase = () => {
//     signOut(auth).then(() => {
//         // Sign-out successful.
//     }).catch((error) => {
//         // An error happened.
//     });
// }


// export default userService;