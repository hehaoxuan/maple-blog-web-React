import React, { Component, Fragment } from 'react';
import { PageHeader, Breadcrumb } from 'antd';
import { withRouter, useHistory } from 'umi';

export default withRouter((props) => {
  const { title, subTitle } = props.navData;
  const history = useHistory();
  const goback = () => {
    history.goBack();
  };
  const { noShowBack } = props;

  return (
    <Fragment>
      {noShowBack ? (
        <PageHeader
          className="site-page-header"
          title={title}
          subTitle={subTitle}
        />
      ) : (
        <PageHeader
          className="site-page-header"
          onBack={() => goback()}
          title={title}
          subTitle={subTitle}
        />
      )}
    </Fragment>
  );
});
// <Fragment>
//   <PageHeader
//     className="site-page-header"
//     onBack={() => null}
//     title={navData.title}
//     subTitle={navData.subTitle}
//   />
// </Fragment>
