import React, {useEffect} from 'react'
import {GoogleOutlined, FacebookOutlined} from "@ant-design/icons";
import firebase from 'firebase/app';

// config object
import {auth} from "../firebase";

const Login = () => {

    useEffect(() => {
        document.title = "Please Signin to access your Chats | Unichat Messenger"
    },[])
    return (
        <div id="login-page">
            <div id="login-card">
                <h2 style={{color: "#1C1821"}}>Welcome to Unichat!</h2>
                {/* onClick enables login with Google */}
                <div className="login-button google" onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}>
                    <GoogleOutlined /> Sign In with Google
                </div>
                {/* <br /> <br />
                <div className="login-button facebook">
                    <FacebookOutlined /> Sign In with Facebook
                </div> */}
            </div>
        </div>
    )
}

export default Login
