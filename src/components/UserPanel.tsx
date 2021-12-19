
import { DownOutlined } from '@ant-design/icons';
import { ReactComponent as UserLogo } from '@assets/images/user.svg';
import { Button, Dropdown, Menu, Tooltip } from 'antd';
import React from 'react';

const UserPanel = ({ className }: ComponentProps) => {
    return (
        <Dropdown
            overlay={
                <Menu>
                    <Menu.Item key='profile'>个人主页</Menu.Item>
                    <Menu.Divider/>
                    <Menu.Item key='exit'>退出</Menu.Item>
                </Menu>
            }
        >
            <Tooltip title='Jeffrey  Chianng' placement='left'>
                <Button className={className} type='text'>
                    <UserLogo className='icon mr-4' fontSize={'1.5em'} />
                    <DownOutlined />
                </Button>
            </Tooltip>
        </Dropdown>
    );
};

export default UserPanel;
