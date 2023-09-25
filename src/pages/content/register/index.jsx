import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  RollbackOutlined,
  FieldBinaryOutlined,
} from '@ant-design/icons';
import style from './index.less';
import { Fragment } from 'react';
import PageHead from '@/common/pageHead';
import {
  Form,
  Input,
  Select,
  Tooltip,
  Button,
  Space,
  Typography,
  Checkbox,
  message,
} from 'antd';
const { Option } = Select;
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useState, useRef } from 'react';
import { encrypt, decrypt } from '@/tools/passwd.js';
import { getvcode, register } from '@/api/user';
import { loalStorageGet } from '@/tools/storage.js';
import { withRouter, useHistory } from 'umi';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function Login() {
  const [codeState, setcodeState] = useState(false);
  const [delayTime, setDelayTime] = useState(60);
  const passwd = useRef();
  const email = useRef();
  const history = useHistory();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    delete values.repassword; //删除重复的密码
    values.id = loalStorageGet('id'); //增加id属性 用于判定验证码
    /* 使用sha1加密 */
    values.password = encrypt(values.password);
    /* 调用注册api */
    register(values).then((res) => {
      /* 根据返回的内容判断验证码是否生效 */
      if (res.code === -1) {
        message.error('验证码错误');
      } else if (res.code === 0) {
        message.error('未发送验证码');
      } else if (res.code === 1) {
        message.success('注册成功');
        /* 跳转到登陆页 */
        setTimeout(() => {
          history.push('/login');
        }, 1500);
      }
    });

    /* 完成注册 并跳转到登陆页面 */
  };

  const handleVcode = () => {
    const mail = email.current.state.value;
    if (mail) {
      setcodeState(true);
      let i = 60;
      setDelayTime(i);
      /* 调用发送验证码api */
      let res = getvcode({ id: loalStorageGet('id') }, { email: email });
      console.log(res);

      let t = setInterval(() => {
        i--;
        setDelayTime(i);
        if (i <= 0) {
          clearInterval(t);
          setcodeState(false);
        }
      }, 1000);
    } else {
      message.error('请输入邮箱地址');
    }
  };

  const isRepassword = async (rule, value) => {
    if (value !== passwd.current.state.value) {
      throw new Error('两次密码不一致');
    }
  };

  return (
    <Fragment>
      <PageHead navData={{ title: '注册', subTitle: '注册账号' }} />
      <Form
        name="normal_login"
        className={style.loginform}
        initialValues={{ remember: true }}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: '请输入账号' },
            { min: 2, message: '至少为2位数' },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="账号"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: '请输入密码' },
            { min: 6, message: '至少为6位数' },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            ref={passwd}
            placeholder="密码"
          />
        </Form.Item>

        <Form.Item
          name="repassword"
          rules={[
            { required: true, message: '请重复密码' },
            { validator: isRepassword },
          ]}
        >
          <Input
            prefix={<RollbackOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="确认密码"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, message: '请输入邮箱' }]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="邮箱"
            ref={email}
          />
        </Form.Item>

        <Form.Item
          name="vcode"
          rules={[{ required: true, message: '请输入验证码' }]}
        >
          <Input
            prefix={<FieldBinaryOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="验证码"
          />
        </Form.Item>

        {codeState ? (
          <div className={style.sendCode}>
            <Spin
              indicator={antIcon}
              style={{ bottom: 0.2 + 'rem', paddingRight: 0.1 + 'rem' }}
            />
            <Typography.Text>在{delayTime}秒后重新发送</Typography.Text>
          </div>
        ) : (
          <Typography.Link
            className={style.sendCode}
            onClick={() => {
              handleVcode();
            }}
          >
            发送验证码
          </Typography.Link>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            注册
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}

export default withRouter(Login);
