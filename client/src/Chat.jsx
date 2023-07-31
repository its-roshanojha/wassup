import React, { useEffect } from 'react'
import { useState } from 'react'

const Chat = ({socket, username, room}) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    // console.log(username, room , "THIS IS A TEST")
    
    const sendMessage = async() => {
        if(currentMessage !== ''){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() 
                + ":"
                + new Date(Date.now()).getMinutes()
                + ":"
                + new Date(Date.now()).getSeconds(), 
            }
        await socket.emit("send_message", messageData);
        setMessageList( (list) => [...list, messageData]);
        setCurrentMessage('');
        };
    }
    useEffect (() => {
        socket.on('receive_message', (data) => {
            // console.log(data);
            setMessageList( (list) => [...list, data]);
        })
    }, [socket]);
  return (
    <>
    <section className="chat__section" style={{ marginTop: "20px" }}>
          <div className="brand">
            <img
              src="https://i.ibb.co/x6LQWc3/wassup.png"
              alt="wassup"
              border="0"
              style={{ width: "30px", height: "auto" }}
            />
            <h1 style={{ paddingTop: "5px" }}>Chatter Box</h1>
          </div>
          <div className="message__area">
            {messageList.map((messageContent) => {
                return (
                    <>
                    <div className = {username === messageContent.author ? "incoming message" : "outgoing  message"}>
                        <h6 style={{"fontWeight": "bold","position":""}}>{messageContent.author}</h6>
                        <p style={{"position": "relative"}}>{messageContent.message}</p>
                        <p style={{"fontSize": "10px", "textAlign" : "right", }}>{messageContent.time}</p>
                    </div>
                    </>
                )
                
            })}
          </div>
          <div>
            <textarea
              id="textarea"
              cols="30"
              rows="1"
              value={currentMessage}
              placeholder="Write a message..."
              onChange={(e) => {
                setCurrentMessage(e.target.value);
              }}
            ></textarea>
            <button className='btn btn-info send' onClick={sendMessage}>Send</button>
          </div>
        </section>
    </>
  )
}

export default Chat