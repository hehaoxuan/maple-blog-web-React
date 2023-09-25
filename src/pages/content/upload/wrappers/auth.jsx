import { Redirect, withRouter, useHistory } from 'umi';
import { setCookie, getCookie, delCookie } from '@/tools/storage';
import { Result, Button } from 'antd';
import PageHead from '@/common/pageHead';

export default withRouter((props) => {
  const history = useHistory()
  const isLogin = getCookie('token');
  const pushLogin = ()=>{
    history.push('/login')
  }
  if (isLogin) {
    return <div>{props.children}</div>;
  } else {
    return (
      <div>
        <PageHead navData={{ title: '上传', subTitle: '从这里上传素材' }} />
        <Result
          title="上传素材前请先登陆"
          extra={
            <Button
              type="primary"
              key="console"
              onClick={() => pushLogin() }
            >
              登陆
            </Button>
          }
        />
      </div>
    );
  }
});
