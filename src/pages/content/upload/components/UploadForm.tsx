// @ts-nocheck
import React, { Component } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from 'antd';
const { TextArea } = Input;
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import UploadDrag from '@/pages/content/upload/components/UploadDrag';
import style from './UploadFrom.less';
import { upload } from '@/api/video';
import { withRouter } from 'umi';
import { setCookie, getCookie, delCookie } from '@/tools/storage';

// 获取base64url
function getBase64(img: any, callback: Function) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

// 上传之前的校验
function beforeUpload(file: any) {
  // console.log(file);
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传 JPG/PNG 文件的格式!');
  }
  const isLt2M = file.size / 1024 / 1024 < 4;
  if (!isLt2M) {
    message.error('图片大小必须小于 4MB!');
  }
  return isJpgOrPng && isLt2M;
}

//格式化部分表格信息
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 0,
      offset: 0,
    },
    sm: {
      span: 4,
      offset: 3,
    },
  },
};

// 表格校验
const normFile = (e) => {
  //如果是typescript, 那么参数写成 e: any
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export default withRouter(
  class UploadForm extends Component {
    state = {
      loading: false,
      userName: getCookie('userName'),
      auditing: false,
    };

    // 上传事件
    onFinish = (values: any) => {
      this.setState({ ...this.state, ...values });
      upload(this.state).then((res) => {
        let { status } = res;
        if (status) {
          const { history } = this.props;
          message.success('上传成功');
          setTimeout(() => history.push('/video'), 1000);
        } else {
          message.error('上传失败');
        }
      });
    };

    // 失败上传回调
    onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    // 控制上传组件功能
    handleChange = (info: any) => {
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl: any) =>
          this.setState({
            imageUrl,
            loading: false,
          }),
        );
      }
    };

    // 获取视频上传内容
    handleVideoData = (info: any) => {
      this.setState({ ...this.state, video: { ...info } });
    };

    render() {
      const { loading, imageUrl } = this.state;
      const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );

      return (
        <div>
          {/* 上传表格 */}
          <Form
            name="basic"
            labelCol={{ span: 3, offset: -1 }}
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            autoComplete="off"
            labelWrap={false}
            labelAlign="right"
          >
            {/* 视频组件 */}
            <Form.Item
              name="videoName"
              rules={[{ required: true, message: '视频素材未上传' }]}
            >
              <div className={style.UploadDrag}>
                <UploadDrag handleVideoData={this.handleVideoData} />
              </div>
            </Form.Item>

            {/* 视频类型选择 */}
            <Form.Item
              label="素材类型"
              name="type"
              rules={[{ required: true, message: '素材类型未选择' }]}
            >
              <Select placeholder="选择素材类型">
                <Select.Option value="video">视频素材</Select.Option>
              </Select>
            </Form.Item>

            {/* 封面选择 */}
            <Form.Item
              label="上传封面"
              name="avata"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: '封面未选择' }]}
            >
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                maxCount={1}
                action="http://localhost:8081/video/uploadIMG"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
                data={(value) => value}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>

            {/* 标题输入 */}
            <Form.Item
              label="标题"
              name="title"
              rules={[{ required: true, message: '请输入标题' }]}
            >
              <Input placeholder="为你的素材取一个响亮的名字" />
            </Form.Item>

            {/* 素材描述 */}
            <Form.Item
              label="素材描述"
              name="describe"
              rules={[{ required: true, message: '请输入素材描述' }]}
            >
              <TextArea
                rows={4}
                placeholder="输入对该素材的描述,最长300字"
                maxLength={300}
              />
            </Form.Item>

            {/* 确认上传 */}
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                确认上传
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
    }
  },
);
