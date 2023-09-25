import PageHead from '@/common/pageHead';
import Recommon from '@/common/recommon';
import Video from '@/common/Video';
import DetailText from '@/common/DetailText';
import DetailTool from '@/common/deatilTool';
import { useState,useEffect  } from 'react';
import { useHistory } from 'umi';
import {computeVideo,getVideoDeatil,computeVideoDownload} from '@/api/video'

const videoDtail = () => {
  const [url, setUrl] = useState('');
  const [urlDownload, setUrlDownload] = useState('');
  const [pageHeadData, setPageHeadData] = useState('');
  const [detailData, setDetailData] = useState('');
  const [auditing, setAuditing] = useState(false);
  const history = useHistory();
  const uid = history.location.pathname.replace(/[^0-9]+/, '')
  useEffect(() => {
    setUrl(computeVideo(uid));
    setUrlDownload(computeVideoDownload(uid))

    getVideoDeatil(uid).then((res)=>{
      setPageHeadData({
        title:res[0].title
      })
      setDetailData({
        article:res[0].describe
      })
      setAuditing(
        res[0].auditing
      )
    })
  }, []);

  const handleAuditing = (auditing)=>{
    setAuditing(auditing)
  }

  return (
    <div>
      <PageHead navData={{...pageHeadData}} />
      {/* 传入uid 给视频组件 */}
      <Video url={url}/>
      <DetailText {...detailData}/>
      <DetailTool url={urlDownload} uid={uid} auditing={auditing} handleAuditing={handleAuditing}/>
      {/* <Recommon/> */}
    </div>
  );
};

export default videoDtail;
