import {
  DownloadOutlined,
  StopOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { Button, Radio, message } from 'antd';
import { setCookie, getCookie } from '@/tools/storage';
import style from './index.less';
import { videoAuditing } from '@/api/video';
import { useState, useEffect } from 'react';
import { withRouter,useHistory} from 'umi';
import useRoot from '@/hooks/useRoot'
function detailTool(props) {
  const history =useHistory()
  const isRoot = useRoot()
  const { url, uid, auditing, handleAuditing } = props;

  const handleClick = () => {
    let a = document.createElement('a');
    a.href = url;
    a.click();
  };

  const handleAuditingClick = () => {
    videoAuditing(uid, !auditing);
    handleAuditing(!auditing);
    message.success('操作成功');
    if(!auditing){ //点击确定审核
      history.push('/auditing')
    }else{
      history.push('/video')
    }
  };

  return (
    <div>
      <Button
        type="defulat"
        shape="round"
        icon={<DownloadOutlined />}
        size={'large'}
        className={style.icon}
        onClick={() => handleClick()}
      >
        下载
      </Button>
      {isRoot ? (
        <Button
          type="defulat"
          shape="round"
          icon={
            JSON.parse(auditing) ? <StopOutlined /> : <CheckCircleOutlined />
          }
          size={'large'}
          className={style.icon}
          onClick={() => handleAuditingClick()}
        >
          {JSON.parse(auditing) ? '撤销审核' : '确定审核'}
        </Button>
      ) : (
        ''
      )}
    </div>
  );
}

export default withRouter(detailTool);
