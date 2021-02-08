import React, { useState, useContext } from "react";
import { VideoStore } from "../../data/VideoContext";

export default function NewVideoForm() {
  const [, videoDispatch] = useContext(VideoStore);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [url, setUrl] = useState("");
  const [cover, setCover] = useState("");

  function save() {
    const newVideo = {
      title,
      duration,
      url,
      cover,
    };

    videoDispatch({
      type: "add",
      value: newVideo,
    });

    reset();
  }

  function reset() {
    setTitle("");
    setDuration("");
    setUrl("");
    setCover("");
  }

  return (
    <div className="form">
      <label>Título: </label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Duração: </label>
      <input
        type="text"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />

      <label>Vídeo: </label>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />

      <label>Capa: </label>
      <input
        type="text"
        value={cover}
        onChange={(e) => setCover(e.target.value)}
      />

      <button onClick={save}>Salvar</button>
    </div>
  );
}
