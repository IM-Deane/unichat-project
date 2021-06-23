import React, {useRef, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {ChatEngine} from "react-chat-engine";
import {auth} from "../firebase";

import {useAuth} from "../contexts/AuthContext";
import axios from 'axios';



const Chats = () => {

    const history = useHistory();
    // Get the user from context provider (const value = {user})
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);


    const handleLogout = async () => {
        await auth.signOut();
        // Redirect to home page
        history.push("/");
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        // blob = file in binary format (ie. images)
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", {type: "image/jpeg"});
    }

    // Update page title
    useEffect(() => {
        document.title = "Chat Overview | Unichat Messenger"
        document.querySelector(".logo-tab");
    },[])

    useEffect(() => {
        if (!user || user === null) {
            history.push("/");
            return
        }
        // Get existing user
        axios.get("https://api.chatengine.io/users/me", {
            headers: {
                "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name": user.email,
                "user-secret": user.uid,
            }
        }).then(() => {
            setLoading(false)
        }).catch(() => {

            // Else, create new user
            let formdata = new FormData();
            formdata.append("email", user.email);
            formdata.append("username",  user.email);
            formdata.append("secret", user.uid);
            // Create avatar
            getFile(user.photoURL).then((avatar) => {
                formdata.append("avatar", avatar, avatar.name);

                // Submit new user data
                axios.post("https://api.chatengine.io/users/", formdata, {headers: {"private-key": process.env.REACT_APP_CHAT_ENGINE_KEY}});
            }).then(() => setLoading(false)).catch((error) => console.log(error))
                })
    }, [user, history])

    if(!user || loading) return "Loading..."

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Unichat
                </div>
                <div onClick={handleLogout} className="logout-tab">Logout</div>
            </div>
            {/* Note: ID is currently exposed due to a env variable error */}
            <ChatEngine height="calc(100vh -- 66px)" projectID="c04afe18-3fb0-44b5-817d-1e8fbb0045b8"
            userName={user.email} userSecret={user.uid}
            />
        </div>
    )
}

export default Chats
