import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import React from 'react';
let listData = [];
listData = [
  {
    href: 'https://zh-hans.reactjs.org/',
    title: `React 前端框架`,
    description: '用于构建用户界面的 JavaScript 库',
    cover: require('@/public/imgs/react.jpg'),

    content:
      'React框架是前端项目的开发核心，使用声明式的组件开发能够轻松的与UI进行交互。利用组件化的思想能够对界面进行复用，并传递参数。\n能够较快的开发单页面SPA功能，并增加页面的运行效率。',
  },
  {
    href: 'https://ant.design',
    title: `ant design 组件库`,
    description: '企业级产品设计体系，创造高效愉悦的工作体验',
    cover: require('@/public/imgs/antd.jpg'),
    content:
      '页面绝大多数组件使用antd组件库，方便组件化的页面开发，并进行界面复用，无需重复造轮子。',
  },
  {
    href: 'https://umijs.org/',
    title: `UmiJS 项目构建`,
    description: '🍙 可扩展的企业级前端应用框架',
    cover: require('@/public/imgs/umi.jpg'),
    content:
      '面向企业级的前端应用框架，提供完善、优化路由、以及集成预设、并实现高拓展功能。',
  },
  {
    href: 'https://www.redux.org.cn/',
    title: `Redux 状态核心管理`,
    description: 'Redux 是 JavaScript 状态容器，提供可预测化的状态管理。',
    cover: require('@/public/imgs/redux.jpg'),
    content:
      'redux用于各种界面库，能够实现数据的统一管理、用于构建一致化的应用，同时能够支持不同的开发环境。',
  },
  {
    href: 'http://nodejs.cn/',
    title: `Node.js 服务器`,
    description: 'Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境',
    cover: require('@/public/imgs/node.jpg'),
    content:
      '基于Chrome V8引擎的JavaScript运行环境，使用了一个事件驱动、非阻塞式I/O模型，让JavaScript 运行在服务端的开发平台。',
  },
  {
    href: 'https://www.mongodb.com/',
    title: `MongoDB 数据库`,
    description: 'Build faster.Build smarter.(更快捷、更智能)​​',
    cover: require('@/public/imgs/mongodb.jpg'),
    content:
      '适用于前端轻量级的数据库，旨在为WEB应用提供可扩展的高性能数据存储解决方案。它支持的数据结构非常松散，是类似json的bson格式，因此可以存储比较复杂的数据类型',
  },
  {
    href: 'https://www.expressjs.com.cn/',
    title: `Express 后端框架`,
    description: '基于 Node.js 平台，快速、开放、极简的 Web 开发框架​​',
    cover: require('@/public/imgs/express.jpg'),
    content:
      '对于Node.js路由更加友好的框架，支持多种HTTP中间件，以及多种功能强大的API。',
  },
  {
    href: 'https://github.com/hehaoxuan/Resourece-web',
    title: `Github 项目管理平台）`,
    description: '世界顶级代码平台​​（项目已开源）',
    cover: require('@/public/imgs/github.jpg'),
    content:
      '全球最大的同性交流平台，数以百万计的开发人员和公司在全球最大、最先进的开发平台 GitHub 上构建、发布和维护他们的软件。感谢Nibiew对代码的贡献！',
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
        pageSize: 10,
      }}
      dataSource={listData}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          extra={<img width={400} alt="logo" src={item.cover} />}
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
