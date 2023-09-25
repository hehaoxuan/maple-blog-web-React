import { Popover, Button, message, Badge, Card } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import style from './style.less';
import { setCookie, getCookie } from '@/tools/storage';
import { useHistory} from 'umi';

const userPopover = (props) => {
  const [username, setUsername] = useState('');
  const [isRoot, setIsRoot] = useState(false);
  const history = useHistory();
  const handleChangePassword = () => {
    history.push('/changePassword');
  }
  useEffect(() => {
    setUsername(getCookie('userName'));
    setIsRoot(JSON.parse(getCookie('authority')));
  }, []);
  return (
    <Popover
      content={
        <div>
          <p>用户名:{username}</p>

          <div className={style.buttonGroup}>
            {/* <Button className={style.button}>我的上传</Button> */}
            {/* <Button className={style.button}>我的上传</Button> */}
            <Button
             className={style.button}
             onClick={() => handleChangePassword()}>修改密码</Button>
            <Button
              danger
              className={style.button}
              onClick={() => {
                message.success('退出登陆');
                props.handleExit();
              }}
            >
              退出登陆
            </Button>
          </div>
        </div>
      }
      title={
        <Fragment>
          <span>账户信息: </span>
          <span className={style.root}>{isRoot ? '管理员' : '用户'}</span>
        </Fragment>
      }
    >
      {props.children}
    </Popover>
  );
};

export default userPopover;
