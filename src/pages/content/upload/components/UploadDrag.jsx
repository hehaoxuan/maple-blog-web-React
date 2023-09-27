import React, { Component } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { uploadVideoUrl } from '@/api/blog';

const { Dragger } = Upload;
import style from './UploadDrag.less';
export default function UploadDrag(props) {
  const prop = {
    accept: 'video/*',
    name: 'file',
    multiple: true,
    action: uploadVideoUrl,
    beforeUpload: (file) => {
      const backName = file.name.split('.');
      const isVideo = backName[backName.length - 1] === ('mp4' || 'MP4');
      console.log(backName, isVideo);
      if (!isVideo) {
        message.error(`${file.name} 不是视频文件`);
      }
      return isVideo || Upload.LIST_IGNORE;
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        const { handleVideoData } = props;
        handleVideoData(info.file);
      }
      if (status === 'done') {
        message.success(`${info.file.name} 文件成功上传.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 文件失败上传`);
      }
    },
  };

  const onDrop = (e) => {
    console.log('Dropped files', e.dataTransfer.files);
  };

  return (
    <Dragger
      {...prop}
      {...props}
      className={style.dragger}
      data={(data) => data}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">点击或拖拽上传文件</p>
      <p className="ant-upload-hint">支持单个文件或者批量上传</p>
    </Dragger>
  );
}
