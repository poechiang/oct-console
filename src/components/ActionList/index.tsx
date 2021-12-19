import { Button, Space } from 'antd';
import { map } from 'lodash';
import { FC } from 'react';

const ActionList:FC<any> = ({ actions }:IActionListProps) => {
    return (<Space>{
        map(actions || [], ({ onClick, label, ...btnProps }) => <Button type='link' size='small' onClick={onClick} {...(btnProps)}>{label}</Button>)
    }</Space>);
};

export default ActionList;
