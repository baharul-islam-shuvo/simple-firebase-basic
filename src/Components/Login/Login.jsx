import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import app from "../../firebase/__firebase.init";
import { useState } from "react";

const Login = () => {
    const [user, setUser] = useState([]);
    const auth = getAuth(app);
    console.log(app);
    const provider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const loggedUser = result.user;
                setUser(loggedUser);
            })
            .catch(error => {
                console.log(error)
            });
    }

    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result)
                setUser(null);
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div>
            {user ?
                <button onClick={handleSignOut}>Sign Out</button> :
                <button onClick={handleGoogleSignIn}>Google Login</button>}
            {user && <div>
                <h3>User: {user.displayName}</h3>
                <p>Email: {user.email}</p>
                <img src={user.photoURL} alt="" />
            </div>
            }
        </div>
    );
};

export default Login;