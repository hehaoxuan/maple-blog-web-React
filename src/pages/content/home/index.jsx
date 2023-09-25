import PageHead from '@/common/pageHead';
import ContextList from '@/pages/content/center/components/contextList';
import { getAllAuditing } from '@/api/video';
import { useState, useEffect } from 'react';

const home = () => {
  const [listData, setListData] = useState(null);
  useEffect(() => {
    getAllAuditing(true).then((res) => {
      res = res.slice(0, 8);
      res = res.sort((a, b) => a.videoUid - b.videoUid);
      setListData(res);
    });
  }, []);

  return (
    <div>
      <PageHead
        navData={{
          title: '博客主页',
          subTitle: 'never too old to learn',
        }}
        noShowBack={true}
      />

      <ContextList listData={listData} />
    </div>
  );
};

export default home;
