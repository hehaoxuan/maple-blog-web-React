import React, { Component } from 'react';
import PageHead from '@/common/pageHead';
import { withRouter } from 'umi';
import ContextList from '@/pages/content/center/components/contextList';
import { search } from '@/api/blog';
import Empty from '@/common/noData';

export default withRouter(
  class index extends Component {
    state = { navData: this.props.location.state, key: null, listData: null };

    searchData = (key) => {
      search(key).then((res) => {
        this.setState({ ...this.state, listData: res });
      });
    };

    componentDidMount() {
      const { key } = this.props.match.params;
      this.setState({ ...this.state, key });
      this.searchData(key);
    }

    componentDidUpdate() {
      const { key } = this.props.match.params;
      if (key !== this.state.key) {
        this.setState({ ...this.state, key });
        this.searchData(key);
      }
    }
    render() {
      return (
        <div>
          <PageHead
            navData={{
              title: '搜索',
              subTitle: `搜索关于 "${this.state.key}" 的内容`,
            }}
          />
          <ContextList listData={this.state.listData} />
        </div>
      );
    }
  },
);
