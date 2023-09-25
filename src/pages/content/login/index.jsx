import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Fragment } from 'react';
import { login } from '@/api/user';
import { encrypt } from '@/tools/passwd';
import { setCookie,getCookie } from '@/tools/storage';
import PageHead from '@/common/pageHead';
import style from './index.less';
import { useHistory, withRouter } from 'umi';
import { connect } from 'react-redux';
import { changeLogin } from '@/redux/action/login_action.js';
import { authorityUser } from '@/redux/action/authority_action.js';


function Login(props) {
  const history = useHistory()
  
  const onFinish = (values) => {
    // console.log('Received values of form: ', values);
    values.password = encrypt(values.password);
    console.log(values);
    login(values).then((res) => {
      let { code } = res;

      if (code === 1) {
        //成功登陆
        /* 将token写入cookie */
        let { token,root} = res;
        setCookie('token',token,30) //设置token
        setCookie('authority',root,30) //设置权限认证
        setCookie('userName',values.username) //设置用户名
        // props.changeLogin(true) //使用redux设置为登陆状态
        // props.authorityUser(root) //使用redux设置为管理员
        setTimeout(() => {
          message.success('登陆成功');
          // 跳转到主页
          history.push('/')
        }, 1500);
      } else if (code === -1) {
        //账号密码错误
        message.error('账号不存在');
      } else if (code === -2) {
        //账号密码错误
        message.error('密码错误');
      }
    });
  };

  return (
    <Fragment>
      <PageHead navData={{ title: '登陆', subTitle: '登陆本素材网站' }} />
      <Form
        name="normal_login"
        className={style.loginform}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入账号' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="账号"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            忘记密码
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登陆
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}

export default connect(state => ({ isLogin: state }), {
  changeLogin: changeLogin,
  authorityUser:authorityUser
})(withRouter(Login));
