import React, { Component, Fragment } from 'react';
import ContextList from '@/pages/content/center/components/contextList';
import PageHead from '@/common/pageHead';
import { getAll, getAllAuditing } from '@/api/blog';
import { useState, useEffect, useCallback } from 'react';

const index = () => {
  const [listData, setListData] = useState(null);
  useEffect(() => {
    getAllAuditing(true).then((res) => {
      setListData(res);
    });
  }, []);

  return (
    <Fragment>
      <PageHead navData={{ title: '素材中心', subTitle: '当下最热门的素材' }} />
      {/* 内容中心 */}
      <ContextList listData={listData} />
    </Fragment>
  );
};

export default index;
