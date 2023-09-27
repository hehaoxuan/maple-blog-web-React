import React, { Component, Fragment, createContext } from 'react';
import PageHead from '@/common/pageHead';
import ContextList from '@/pages/content/center/components/contextList';
import { getAll, getAllAuditing } from '@/api/blog';
import { useState, useEffect, useContext } from 'react';

export default function index() {
  const [listData, setListData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const RefreshContext = createContext({});
  const handleRefresh = (data) => {
    setRefresh(data);
  };

  useEffect(() => {
    getAllAuditing(false).then((res) => {
      setListData(res);
    });
  }, []);

  useEffect(() => {
    getAllAuditing(false).then((res) => {
      setListData(res);
    });
  }, [refresh]);

  return (
    <Fragment>
      <PageHead navData={{ title: '审核', subTitle: '管理员在此审核视频' }} />
      {/* 内容中心 */}
      <RefreshContext.Provider value={handleRefresh}>
        <ContextList listData={listData} />
      </RefreshContext.Provider>
    </Fragment>
  );
}
