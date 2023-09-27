// 用来展示内容列表
import React, { Component, createContext } from 'react';
import { Card, Avatar, Popconfirm, message } from 'antd';
import style from './index.less';
import { computeCover } from '@/api/blog.js';
import { useState, useEffect, useContext } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { deleteVideo } from '@/api/blog';
import { setCookie, getCookie } from '@/tools/storage';
import useRoot from '@/hooks/useRoot';
import { withRouter, useHistory } from 'umi';
const { Meta } = Card;

function index(props) {
  const { title, description, onClick, uid, key } = props;
  const RefreshContext = createContext({});
  const [deleteOne, handleDelteOne] = useState(false);
  const isRoot = useRoot();
  const history = useHistory();
  const test = useContext(RefreshContext);
  console.log(test);

  const handleEdit = () => {
    history.push('/videoEdit/' + uid);
  };

  function confirm(e) {
    deleteVideo(uid).then((res) => {
      if (res) {
        message.success('删除成功');
        handleDelteOne(!deleteOne);
      }
    });
  }

  function cancel(e) {}

  return (
    <div className={style.item} key={key}>
      <Card
        className={style.card}
        cover={
          <img
            alt="example"
            className={style.img}
            src={computeCover(uid)}
            onClick={onClick}
          />
        }
        // 这里对应管理员的权限
        actions={
          isRoot
            ? [
                <EditOutlined key="edit" onClick={() => handleEdit()} />,
                <Popconfirm
                  title="确定删除吗?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="确认"
                  cancelText="取消"
                >
                  <DeleteOutlined key="delete" />,
                </Popconfirm>,
                // <EllipsisOutlined key="ellipsis" />,
              ]
            : ''
        }
      >
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={title}
          description={description}
        />
      </Card>
    </div>
  );
}

export default withRouter(index);
