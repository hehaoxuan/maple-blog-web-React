import React, { Component, Fragment,useState,useEffect } from 'react';
import EditForm from '@/pages/content/editPage/components/editForm.jsx';
import style from '@/pages/content/upload/index.less';
import PageHead from '@/common/pageHead';
import { useHistory } from 'umi';
import {computeVideo,getVideoDeatil,computeVideoDownload} from '@/api/video'
const Index = (props) => {
  const [detailData,setDetailData] = useState(null)
  const history = useHistory();
  const uid = history.location.pathname.replace(/[^0-9]+/, '')
  useEffect(() => {
    getVideoDeatil(uid).then((res)=>{
      setDetailData(res[0])
      console.log(res[0]);
    })
  }, []);

  return (
    <Fragment>
      <PageHead navData={{ title: '编辑', subTitle: '修改视频信息' }} />
      <div className={style.UploadForm}>
        <EditForm detailData={detailData}/>
      </div>
    </Fragment>
  );
};

export default Index;
