import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

export default class index extends Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
        个人博客网站 ©2022 Created by hehaoxuan
        <a href="https://beian.miit.gov.cn/"> 蜀ICP备2023012504号-1</a>
      </Footer>
    );
  }
}
