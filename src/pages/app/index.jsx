import React, { Component, Fragment } from 'react';
import Header from '../header';
import Footer from '../footer/index';
import Content from '../content/index';
import styles from '../index.less';
import '../../tools/rem.js';
import 'particles.js';
import '../../tools/particle.css';
import { particle } from '../../public/data';
import { withRouter } from 'umi';
import Home from '@/pages/content/home';
import { v4 as uuidv4 } from 'uuid';
import { loalStorageSet } from '@/tools/storage.js';
import { Provider } from 'react-redux';
import store from '@/redux/store'

export default withRouter(
  class App extends Component {
    componentDidMount() {
      // 加载粒子特效
      // particlesJS('particles-js', {
      //   ...particle,
      // });

      // 生成唯一id 并写入本地存储中
      loalStorageSet('id', uuidv4());
    }

    render() {
      const { props } = this;
      const { pathname } = this.props.location;

      return (
        <Provider store={store}>
          <section id="particles-js"></section>
          <div className={styles.main}>
            <Header />
            <Content>
              {/* todo:当主页为/时展示该首页的内容 */}
              {pathname === '/' && <Home />}
              <div>{props.children}</div>
            </Content>
            <Footer />
          </div>
        </Provider>
      );
    }
  },
);
