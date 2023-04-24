import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';


import { useAuth } from '../contexts/AuthContext'
import axios from 'axios';

const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", { type: "image/jpeg" })
    }
    console.log(user);
    const handleLogout = async () => {
        await auth.signOut();

        history.push('/');
    }

    useEffect(() => {
        if (!user) {
            history.push('/');
            return;
        }
        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": "3ea96dde-b6e8-4203-bb2b-65fbe9d755c4",
                "user-name": user.email,
                "user-secret": user.uid,
                "private-key": "1c94100d-a2a2-4d2b-ada5-371d266dca3a",

            }
        })

            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                let formdata = new FormData();
                formdata.append('email', user.email);
                formdata.append('username', user.email);
                formdata.append('secret', user.uid);

                getFile(user.photoURL)

                    .then((avatar) => {
                        formdata.append('avatar', avatar, avatar.name);


                        axios.post('https://api.chatengine.io/users',
                            formdata,
                            { headers: { "private-key": "1c94100d-a2a2-4d2b-ada5-371d266dca3a" } }

                        )
                            .then(() => setLoading(false))
                            .catch((error) => console.log(error))
                    })
            })

    }, [user, history]);

    if (!user || loading) return 'Loading...';

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Scholarly
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>
            <ChatEngine
                height="calc(90vh)"
                projectID="3ea96dde-b6e8-4203-bb2b-65fbe9d755c4"
                userName={user.email}
                userSecret={user.uid}
            />
            <a href="https://msrit-connect.onrender.com/" target="_blank">
                <button className="bubble-button1">
                    <span>Join Class</span>
                </button>

            </a>g.co/createaquiz
            <a href="https://g.co/createaquiz" target="_blank">
                <button className="bubble-button2">
                    <span>Create Quiz</span>
                </button>

            </a>




        </div>
    );
}

export default Chats;