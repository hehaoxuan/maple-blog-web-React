/* 根据cookie判定是否为管理员权限 */
import { getCookie } from '@/tools/storage';
import { useState, useEffect } from 'react';
const useRoot = () => {
  const [isRoot, setisRoot] = useState(false);
  useEffect(() => {
    if (getCookie('authority') && JSON.parse(getCookie('authority'))) {
      setisRoot(true);
    } else {
      setisRoot(false);
    }
  }, []);
  return isRoot;
};

export default useRoot;
