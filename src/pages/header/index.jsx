import React, { Component, Fragment } from 'react';
import { Button, Layout } from 'antd';
const { Header } = Layout;
import { withRouter } from 'umi';
import Search from '@/pages/header/components/SearchSide';
import HeadMenu from '@/pages/header/components/headMenu';
import { SearchOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons';
import { setCookie, getCookie, delCookie } from '@/tools/storage';
import style from './index.less';
import { connect } from 'react-redux';
import { changeLogin } from '@/redux/action/login_action.js';
import UserPopover from '@/common/userPopover';

class index extends Component {
  state = {
    isLogin: false,
    authority: false,
  };
  handleLogin = () => {
    const { history } = this.props;
    history.push('/login');
  };
  handleRegister = () => {
    const { history } = this.props;
    history.push('/register');
  };

  handleUser = () => {
    delCookie('token');
    delCookie('authority')
    delCookie('userName')
    this.setState({ isLogin: false });
  };

  componentDidMount() {
    if (getCookie('token') && this.state.isLogin === false) {
      this.setState({ isLogin: true });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (getCookie('token')) {
      //证明已经登陆
      // 若状态为未登陆 则将其变为已登陆
      if (this.state.isLogin === false) {
        this.setState({ isLogin: true });
        return true;
        // 若已经登陆 状态未发生变化 则不更新
      } else if (
        this.state.isLogin === true ||
        this.state.isLogin === nextState.isLogin
      ) {
        return false;
      }
    } else {
      //证明之前已经登陆
      if (this.state.isLogin === true) {
        // 将其变为false 并更新状态
        this.setState({ isLogin: false });
        return true;
      } else if (
        this.state.isLogin === false ||
        this.state.isLogin === nextState.isLogin
      ) {
        return false;
      }
    }
  }

  render() {
    console.log(this.props);
    return (
      <Fragment>
        <Header style={{ background: '#ffffff' }}>
          <HeadMenu />
        </Header>
        <div className={style.Search}>
          <Search />
          {this.state.isLogin ? (
            <UserPopover handleExit={this.handleUser}>
              <Button
                type="primary"
                shape="circle"
                icon={
                  this.state.authority ? <SmileOutlined /> : <UserOutlined />
                }
                className={style.ICon}
              />
            </UserPopover>
          ) : (
            <Fragment>
              <Button
                type="primary"
                className={style.Login}
                onClick={() => {
                  this.handleLogin();
                }}
              >
                登陆
              </Button>
              <Button
                onClick={() => {
                  this.handleRegister();
                }}
              >
                注册
              </Button>
            </Fragment>
          )}
        </div>
      </Fragment>
    );
  }
}

export default connect((state) => ({ userState: state }))(withRouter(index));

// export default connect(
//   state => ({personData:state.person_reducer}),
//   {addOnePerson:addOnePerson}
// )(Person)
