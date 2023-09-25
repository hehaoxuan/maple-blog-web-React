import React, { Component } from 'react';
import PageHead from '@/common/pageHead';
import AboutList from './components/aboutList';

export default class index extends Component {
  state = {};
  render() {
    return (
      <div>
        <PageHead navData={{ title: '关于', subTitle: '关于本网站构建及技术栈' }} />
        <AboutList />
      </div>
    );
  }
}
