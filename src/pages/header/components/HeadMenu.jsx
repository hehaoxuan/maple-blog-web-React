import React, { Component } from 'react';
import style from '../index.less';
import { Layout, Menu } from 'antd';
const { SubMenu } = Menu;
import { Link } from 'umi';
import { AppstoreAddOutlined, AlignLeftOutlined } from '@ant-design/icons';
import Search from '@/pages/header/components/SearchSide';
import { setCookie, getCookie, delCookie } from '@/tools/storage';

export default class headMenu extends Component {
  state = {
    current: 'main',
    menuList: [
      {
        key: 'main',
        to: '/',
        name: '主页',
      },
      {
        key: 'blogList',
        to: '/blogList',
        icon: <AlignLeftOutlined />,
        name: '博客列表',
      },
      {
        isSub: true,
        key: 'sourceCenter',
        icon: <AppstoreAddOutlined />,
        name: '分类',
        to: '/video',
      },
      {
        key: 'about',
        to: '/about',
        name: '关于',
      },
      {
        key: 'upload',
        to: '/upload',
        name: '上传',
      },
    ],
    sourceCenterList: [
      {
        name: '视频素材',
        key: 'video',
        menuList: [
          {
            key: 'video-hot',
            to: '/video-hot',
            name: '热门素材',
            navData: { title: '热门素材', subTitle: '当下最流行的素材' },
          },
          {
            key: 'video-2k',
            to: '/video-2k',
            name: '2K/空镜头',
            navData: { title: '2k/空镜头', subTitle: '当下最流行的素材' },
          },
          {
            key: 'video-simple',
            to: '/video-simple',
            name: 'GB/BB/免扣',
            navData: { title: '热门素材', subTitle: '当下最流行的素材' },
          },
        ],
      },
      {
        name: '音频素材',
        key: 'audio',
        menuList: [
          {
            key: 'aduio-bgm',
            to: '/aduio-bgm',
            name: '背景音乐',
            navData: { title: '热门素材', subTitle: '当下最流行的素材' },
          },
          {
            key: 'aduio-effect',
            to: '/aduio-effect',
            name: '音效/声效',
            navData: { title: '音效素材', subTitle: '当下最流行的素材' },
          },
        ],
      },
      {
        name: '图片素材',
        key: 'img',
        menuList: [
          {
            key: 'img-bg',
            to: '/img-bg',
            name: '热门素材',
            navData: { title: '热门素材', subTitle: '当下最流行的素材' },
          },
          {
            key: 'img-simple',
            to: '/img-simple',
            name: 'png/psd/免扣',
            navData: { title: '热门素材', subTitle: '当下最流行的素材' },
          },
        ],
      },
    ],
  };

  handleClick = (e) => {
    console.log(e);
    this.setState({ current: e.key });
  };

  componentDidMount() {
    if (getCookie('authority') && JSON.parse(getCookie('authority'))) {
      let newState = this.state.menuList;
      newState.push({
        key: 'auditing',
        to: '/auditing',
        name: '审核',
      });
      this.setState(newState);
    }
  }

  componentDidUpdate() {
    // 退出登陆后关闭审核
    if (!getCookie('authority') && this.state.menuList.length === 6) {
      let newState = this.state.menuList;
      newState = newState.filter((item) => item.key !== 'auditing');
      this.setState({ menuList: newState });
      console.log(this.state.menuList);
    }
    // 登陆后增加审核
    if (
      getCookie('authority') &&
      JSON.parse(getCookie('authority')) &&
      this.state.menuList.length === 5
    ) {
      let newState = this.state.menuList;
      newState.push({
        key: 'auditing',
        to: '/auditing',
        name: '审核',
      });
      this.setState({ menuList: newState });
      console.log(this.state.menuList);
    }
  }

  render() {
    const { current, menuList, sourceCenterList } = this.state;
    return (
      <div className={style.Menu}>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[current]}
          mode="horizontal"
        >
          {menuList.map((item) => {
            if (!item.isSub) {
              return (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link to={{ pathname: item.to, state: item.navData }}>
                    {item.name}
                  </Link>
                </Menu.Item>
              );
            }
            // todo:资源分类
            else {
              return (
                <SubMenu key={item.key} icon={item.icon} title={item.name}>
                  {sourceCenterList &&
                    sourceCenterList.map((subitem) => {
                      return (
                        <Menu.ItemGroup title={subitem.name} key={subitem.key}>
                          {subitem.menuList.map((item) => {
                            return (
                              <Menu.Item key={item.key}>
                                <Link
                                  to={{
                                    pathname: item.to,
                                    state: item.navData,
                                  }}
                                >
                                  {item.name}
                                </Link>
                              </Menu.Item>
                            );
                          })}
                        </Menu.ItemGroup>
                      );
                    })}
                </SubMenu>
              );
            }
          })}
        </Menu>
      </div>
    );
  }
}
