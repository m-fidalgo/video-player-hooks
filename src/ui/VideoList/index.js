import React, { useContext, useMemo } from "react";
import { VideoStore } from "../../data/VideoContext";
import Video from "../Video";

export default function VideoList() {
  const [videoState, videoDispatch] = useContext(VideoStore);
  const videoList = useMemo(() => {
    function onClick(video) {
      videoDispatch({
        type: "select",
        value: video,
      });
    }

    return videoState.videos.map((video) => (
      <Video key={video.url} video={video} onClick={onClick} />
    ));
  }, [videoState.videos, videoDispatch]);

  return <ul className="list">{videoList}</ul>;
}
