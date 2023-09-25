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
import { useState, useEffect, useRef } from 'react';
import { encrypt, decrypt } from '@/tools/passwd.js';
import { getvcode, changePassword } from '@/api/user';
import { loalStorageGet, setCookie, getCookie } from '@/tools/storage';
import { withRouter, useHistory } from 'umi';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function ChangePassword() {
  const [codeState, setcodeState] = useState(false);
  const [delayTime, setDelayTime] = useState(60);
  const passwd = useRef();
  const history = useHistory();
  const [username, setUsername] = useState('');

  const onFinish = (values) => {
    delete values.rePassword; //删除重复的密码
    values.id = loalStorageGet('id'); //增加id属性 用于判定验证码
    /* 使用sha1加密 */
    values.password = encrypt(values.oldPassword);
    values.newPassword = encrypt(values.newPassword);
    /* 调用注册api */
    changePassword(values).then((res) => {
      /* 根据返回的内容判断验证码是否生效 */
      if (res.code === -2) {
        message.error('原密码错误');
      } else if (res.code === -1) {
        message.error('验证码错误');
      }  else if (res.code === 0) {
        message.error('未发送验证码');
      } else if (res.code === 1) {
        message.success('修改密码成功');
        /* 跳转到登陆页 */
        setTimeout(() => {
          history.push('/login');
        }, 1500);
      }
    });

    /* 完成注册 并跳转到登陆页面 */
  };

  const handleVcode = () => {
      setcodeState(true);
      let i = 60;
      setDelayTime(i);
      /* 调用发送验证码api */
      let res = getvcode({ id: getCookie('userName') });
      console.log(res);

      let t = setInterval(() => {
        i--;
        setDelayTime(i);
        if (i <= 0) {
          clearInterval(t);
          setcodeState(false);
        }
      }, 1000);
  };

  const isRepassword = async (rule, value) => {
    if (value !== passwd.current.input.value) {
      throw new Error('两次密码不一致');
    }
  };
  return (
    <Fragment>
      <PageHead navData={{ title: '修改密码', subTitle: '修改密码' }} />
      <Form
        name="normal_login"
        className={style.loginform}
        initialValues={{ username: getCookie('userName') }}
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
            disabled
            placeholder="账号"
          />
        </Form.Item>
        <Form.Item
          name="oldPassword"
          rules={[
            { required: true, message: '请输入原密码' },
            { min: 6, message: '至少为6位数' },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            ref={passwd}
            placeholder="原密码"
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          rules={[
            { required: true, message: '请输入新密码' },
            { min: 6, message: '至少为6位数' },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            ref={passwd}
            placeholder="新密码"
          />
        </Form.Item>

        <Form.Item
          name="rePassword"
          rules={[
            { required: true, message: '请重复新密码' },
            { validator: isRepassword },
          ]}
        >
          <Input
            prefix={<RollbackOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="重复新密码"
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
            修改密码
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}

export default withRouter(ChangePassword);
