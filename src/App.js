import React from "react";
import VideoContext from "./data/VideoContext";
import VideoList from "./ui/VideoList";
import NewVideoForm from "./ui/NewVideoForm";
import VideoPlayer from "./ui/VideoPlayer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <VideoContext>
        <VideoPlayer />
        <NewVideoForm />
        <VideoList />
      </VideoContext>
    </div>
  );
}

export default App;
