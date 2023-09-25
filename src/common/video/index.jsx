import ReactPlayer from 'react-player';
import { useState } from 'react';
import style from './index.less'
export default function video(props) {
  const [playing,setPlaying] = useState(false)
  const {url} = props
  const play = () => {
    setPlaying(!playing)
  };
  // "http://localhost:8081/video/16488867466033"
  return (
    <div>
      <ReactPlayer
        url={url}
        controls={true}
        className ={style.video}
      />
      <div></div>
    </div>
  );
}
