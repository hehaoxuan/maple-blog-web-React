import {
  DownloadOutlined,
  StopOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { Button, Radio, message } from 'antd';
import { setCookie, getCookie } from '@/tools/storage';
import style from './index.less';
import { videoAuditing } from '@/api/blog';
import { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'umi';
import useRoot from '@/hooks/useRoot';
function detailTool(props) {
  const history = useHistory();
  const isRoot = useRoot();
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
    if (!auditing) {
      //点击确定审核
      history.push('/auditing');
    } else {
      history.push('/video');
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
          icon={!auditing ? <CheckCircleOutlined /> : <StopOutlined />}
          size={'large'}
          className={style.icon}
          onClick={() => handleAuditingClick()}
        >
          {!auditing ? '确定审核' : '撤销审核'}
        </Button>
      ) : (
        ''
      )}
    </div>
  );
}

export default withRouter(detailTool);
