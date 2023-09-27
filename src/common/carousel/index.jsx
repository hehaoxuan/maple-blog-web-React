import { Carousel, Typography } from 'antd';
import { getAllAuditing, computeCover } from '@/api/blog';
import style from './index.less';
import { useState, useEffect } from 'react';
const { Title } = Typography;

export default () => {
  const [listData, setListData] = useState(null);
  useEffect(() => {
    getAllAuditing(true).then((res) => {
      if (res.length >= 8) {
        res = res.slice(0, 8);
        setListData(res);
      } else {
        setListData(res);
      }
    });
  }, []);

  return (
    <div className={style.carousel}>
      <Carousel autoplay>
        {listData &&
          listData.map((item) => {
            return (
              <div key={item._id}>
                <Title className={style.title} level={3}>
                  <span className={style.shadow}>{item.title}</span>
                </Title>
                <Title className={style.describe} level={4}>
                  <span className={style.shadow}>{item.describe}</span>
                </Title>
                <img
                  className={style.contentStyle}
                  src={computeCover(item.videoUid)}
                ></img>
              </div>
            );
          })}
      </Carousel>
    </div>
  );
};
