import React, { useRef, useEffect, useState, useContext, useMemo } from "react";
import { VideoStore } from "../../data/VideoContext";
import { TimeService } from "../../data/services/TimeService";

export default function VideoPlayer() {
  const [videoState] = useContext(VideoStore);
  const video = videoState.selectedVideo;
  const videoRef = useRef();
  const progressTimer = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const totalTime = useMemo(() => {
    TimeService.formatTime(video.duration);
  }, [video]);

  useEffect(() => {
    const element = videoRef.current;

    element.addEventListener("play", play);
    element.addEventListener("pause", pause);
    element.addEventListener("progress", onProgress);
    setTime(0);
    pause();

    return () => {
      element.removeEventListener("play", play);
      element.removeEventListener("pause", pause);
      element.removeEventListener("progress", onProgress);
    };
  }, [video]);

  useEffect(() => {
    clearInterval(progressTimer.current);

    if (isPlaying) {
      progressTimer.current = setInterval(onProgress, 1000);
    }
  }, [isPlaying]);

  function play() {
    videoRef.current.play();
    setIsPlaying(true);
  }

  function pause() {
    videoRef.current.pause();
    setIsPlaying(false);
  }

  function onProgress() {
    setProgress(videoRef.current.currentTime);
  }

  function onChangeProgress(e) {
    setTime(e.target.value);
  }

  function setTime(time) {
    videoRef.current.currentTime = time;
    onProgress();
  }

  return (
    <div className="video-player">
      <video src={video.url} ref={videoRef} />
      {video.url && (
        <>
          <div className="controls">
            <button onClick={isPlaying ? pause : play}>
              {isPlaying ? "||" : "|>"}
            </button>
            <span>
              {TimeService.formatTime(Math.round(progress))} / {totalTime}
            </span>
            <input
              type="range"
              value={progress}
              onChange={onChangeProgress}
              min={0}
              max={video.duration}
              step={0.1}
            />
          </div>
        </>
      )}
      <h2>{video.title}</h2>
    </div>
  );
}
