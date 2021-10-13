import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './conversations.css'

export default function Conversations({conversation, currentUser}) {
    const [user, setUser] = useState(null)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    useEffect(()=> {
        const friendId = conversation.members.find((m) => m !== currentUser._id)

        const getUser = async() => {
            const res = await axios("/users?userId="+friendId)
            // console.log(res)
            setUser(res.data)
        }
        getUser()
    },[currentUser, conversation])
    return (
        <div className="conversation">
            <img className="conversationImg" src={user?.profilePicture ? PF + user.profilePicture: PF+"person/noAvatar.png"} alt=""/>
        <span className="conversationName">{user?.username}</span>
        </div>
    )
}
