import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./chatOnline.css"

function ChatOnline({onlineUsers, currentId, setCurrentChat}) {
   const [friends, setFriends] = useState([])
   const [onlineFriends, setOnlineFriends] = useState([])
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;

   useEffect(()=>{
const getFriends = async() => {
    const res = await axios.get("/users/friends/"+currentId);
    setFriends(res.data);
}

getFriends();
   },[currentId]);

useEffect(()=>{
    setOnlineFriends(friends.filter((f)=> onlineUsers.includes(f._id)));
},[friends, onlineUsers])

const handleClick =async(user) => {
try {
    let res = await axios.get(`/conversations/find/${currentId}/${user._id}`)
    console.log(res.data)
    if(!(res.data)){
        console.log("yes")
         res = await axios.post(`/conversations/`,{
            senderId: `${currentId}`,
            receiverId: `${user._id}`
        })
    }
    res = await axios.get(`/conversations/find/${currentId}/${user._id}`)
    setCurrentChat(res.data)
} catch (err) {
    console.log(err)
}
}

    return (
        <div className="chatOnline" >
            {onlineFriends.map((o)=>(
                <div className="chatOnlineFriend" onClick={()=>handleClick(o)}>
                    <div className="chatOnlineImgContainer">
                <img className="chatOnlineImg" src={o.profilePicture ? PF+ o?.profilePicture: PF+"person/noAvatar.png"} alt=""/>
                <div className="chatOnlineBadge">
                    
                </div>
            </div>
            <span className="chatOnlineName">{o.username}</span>
                </div>
            ))}
            
        </div>
    )
}

export default ChatOnline
