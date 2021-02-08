import React, { createContext, useReducer } from "react";
import { videoInitialState, videoReducer } from "../VideoReducer";

export const VideoStore = createContext(videoInitialState);

export default function VideoContext(props) {
  const [state, dispatch] = useReducer(videoReducer, videoInitialState);

  return (
    <VideoStore.Provider value={[state, dispatch]}>
      {props.children}
    </VideoStore.Provider>
  );
}
