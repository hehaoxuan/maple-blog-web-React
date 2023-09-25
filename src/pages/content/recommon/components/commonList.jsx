import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import React from 'react';
let listData = [];
listData = [
  {
    href: 'http://www.jijidown.com/',
    title: `唧唧 下载工具`,
    description:
      '基于Web下载bilibili的视频工具',
      cover: require('@/public/imgs/jiji.jpg'),

    content:
      '可以通过唧唧+哔哩哔哩下载绝大多数平台上素材以及绿幕等。支持mp4转换功能。',
  },
  {
    href: 'https://pngimg.com/',
    title: `pngimg 素材网站`,
    description: 'png图片素材用于web设计',
    cover: require('@/public/imgs/pngimg.jpg'),
    content:
      '包含10w+图片内容纯png素材，可运用于网页搭建、视频制作等。',
  },
  {
    href: 'https://wallhaven.cc/',
    title: `wallhaven 素材网站`,
    description: 'The best wallpapers on the Net!',
    cover: require('@/public/imgs/wallhaven.jpg'),
    content:
      '提供绝佳的壁纸素材，用于背景图以及壁纸素材。',
  },
  {
    href: 'https://freesound.org/',
    title: `freesound 素材网站`,
    description: '提供授权的声音数据库',
    cover: require('@/public/imgs/freesound.jpg'),
    content:
      '网站包含众多音频素材，可获取视频素材所需音频素材。',
  },
];

const Index = () => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      style={{ margin: 10 + 'px', marginBottom: 20 + 'px' }}
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 4,
      }}
      dataSource={listData}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          extra={<img width={400}  alt="logo" src={item.cover} />}
        >
          <List.Item.Meta
            title={<a href={item.href}>{item.title}</a>}
            description={item.description}
          />
          {item.content}
        </List.Item>
      )}
    />
  );
};

export default Index;
