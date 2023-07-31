import "./App.css";
import io from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3003");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const [showChat, setShowChat] = useState(false);

  const join_room = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      // setRoom("");
      // setUsername("");
      setShowChat(true);
      toast.success(`welcome ${username} to the Room ${room}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ToastContainer />
        {!showChat ? (
          <section className="Join_chat_section">
            <h3>Join a Room</h3>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Type your name..."
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
            />
            <br />
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Room ID..."
              onChange={(e) => {
                setRoom(e.target.value);
              }}
              value={room}
            />
            <br />
            <button className="btn btn-info" onClick={join_room}>
              Join
            </button>
          </section>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}

        
      </div>
    </>
  );
}

export default App;
