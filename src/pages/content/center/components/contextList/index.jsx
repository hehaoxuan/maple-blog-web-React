// 用来展示不同的组件
import React, { Component } from 'react';
import ContentItem from '@/pages/content/center/components/contextList/ContentItem';
import style from './index.less';
import { Link } from 'umi';
import { withRouter } from 'umi';
import { useEffect, useState } from 'react';
import { Row, Col, List } from 'antd';
import Empty from '@/common/noData';
import { computeCover } from '@/api/video';

export default withRouter(({ history, location, match, listData }) => {
  // 接收id 生成不同的数据
  const handleDetail = (params) => {
    history.push({ pathname: `/video/${params}`, params: params });
  };

  const [itemList, setItem] = useState([]);

  let list;
  if (listData && listData.length >= 1) {
    list = (
      <Row gutter={[16, 24]}>
        {itemList &&
          itemList.map((item) => (
            <Col span={6}>
              <ContentItem
                key={item._id}
                title={item.title}
                description={item.describe}
                uid={item.videoUid}
                onClick={() => handleDetail(item.videoUid)}
              />
            </Col>
          ))}
      </Row>
    );
    list = (
      <List
        itemLayout="vertical"
        size="large"
        className={style.listComponent}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 10,
        }}
        dataSource={listData || []}
        renderItem={(item) => (
          <List.Item
            key={item._id}
            extra={
              item.videoUid ? (
                <img width={150} alt="logo" src={computeCover(item.videoUid)} />
              ) : (
                ''
              )
            }
            onClick={() => handleDetail(item.videoUid)}
            className={style.item}
          >
            <List.Item.Meta
              title={<a href={item.href}>{item.title}</a>}
              description={item.describe}
            />
            {item.content}
          </List.Item>
        )}
      />
    );
  } else {
    list = <Empty />;
  }

  useEffect(() => {
    setItem(listData);
  }, [listData]);

  return <div className={style.list}>{list}</div>;
});
