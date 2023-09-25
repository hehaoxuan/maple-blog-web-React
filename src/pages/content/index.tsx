import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

export default class index extends Component {
  render() {
    const { props } = this;
    console.log(this.props);

    return (
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">{props.children}</div>
      </Content>
    );
  }
}
