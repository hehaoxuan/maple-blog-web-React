import React, { Component, Fragment } from 'react';
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { withRouter } from 'umi';
import { message } from 'antd';
const { Search } = Input;

export default withRouter(
  class SearchItem extends Component {
    onSearch = (msg) => {
      if (!msg) {
        message.error('请输入搜索内容');
      } else {
        const { history } = this.props;
        history.push({pathname:'/search/'+ msg, params:msg});
      }
    };
    render() {
      return (
        <Fragment>
          <Search
            placeholder="搜索"
            allowClear
            onSearch={this.onSearch}
            style={{ width: 180 }}
          />
        </Fragment>
      );
    }
  },
);
