
import { Button, Result } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound :FC = (props) => {
    const navigator = useNavigate();

    return (
        <Result
            status='404'
            title='404'
            subTitle='对不起，你要访问的页面不存在！'
            extra={
                <Button type='primary' onClick={() => navigator('/', { replace: true })}>
          返回首页
                </Button>
            }
        />
    );
};
export default NotFound;
