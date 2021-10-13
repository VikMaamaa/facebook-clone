import React, { useEffect, useState } from 'react'
import "./message.css"
import {format} from 'timeago.js'
import axios from 'axios'

export default function Message({message, own,user, sender}) {
    // console.log(own)
    //  o.profilePicture ? PF+ o?.profilePicture: PF+"person/noAvatar.png"
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    let userId = own?user._id:sender
    const [profilePicture, setProfilePicture] = useState("")
    useEffect(()=> {
        const getSender = async() => {
            try{
            const res = await axios.get("/users/profile/"+userId)
            // console.log(res)
            setProfilePicture(res.data)
        }catch(err) {
              console.log(err)
          }
    }
    getSender()
    },[userId])


    return (
        <div className={own?"message own":"message"}>
            <div className="messageTop">
                <img className="messageImg" src={profilePicture? PF+profilePicture: PF+"person/noAvatar.png"} alt=""/>
                <p className="messageText">
                    {message.text}
                </p>
            </div>
            <div className="messageBottom">
                {format(message.createdAt)}
            </div>
        </div>
    )
}
