import { Typography, Slider } from 'antd';
import { Fragment, useState } from 'react';
import style from './index.less';
const { Paragraph } = Typography;

function detailText(props) {
  const [rows, setRows] = useState(true);
  const {article} = props
  return (
    <Fragment>
      <Paragraph
        ellipsis={{
          rows: 3,
          expandable: {rows},
          suffix: '',
          onEllipsis: (ellipsis) => {
            console.log('Ellipsis changed:', ellipsis);
          },
          symbol:"查看详细",
        }}
        title={`${article}`}
        className={style.text}
      >
        {article}
      </Paragraph>
    </Fragment>
  );
}

export default detailText;
