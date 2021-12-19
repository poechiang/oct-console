import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { customizeIconFont } from '@lib/iconfont';
import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { filter, map, split } from 'lodash';
import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router';
const { WeiBoIcon, ArticlesIcon, CommentsIcon, ProfileIcon, OverviewIcon } =
    customizeIconFont({ fontSize: '1.5em' });

const Navigator: FC = (props) => {
    const navTo = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    const opennedItems = map(
        filter(split(pathname, '/'), (s) => !!s),
        (s) => `/${s}`,
    );
    return (
        <Menu
            className='oc-navigator'
            mode='inline'
            defaultSelectedKeys={[pathname || 'overview']}
            defaultOpenKeys={opennedItems}
        >
            <Menu.Item
                key='/overview'
                icon={<OverviewIcon />}
                onClick={() => navTo('/overview')}
            >
                总览
            </Menu.Item>
            <SubMenu
                key='/blog'
                icon={<WeiBoIcon style={{ fontSize: '2em' }} />}
                title='笔记'
            >
                <Menu.Item
                    key='/blog/articles'
                    icon={<ArticlesIcon />}
                    onClick={() => navTo('/blog/articles')}
                >
                    文章列表
                </Menu.Item>
                <Menu.Item
                    key='/blog/comments'
                    icon={<CommentsIcon />}
                    onClick={() => navTo('/blog/comments')}
                >
                    留言列表
                </Menu.Item>
            </SubMenu>
            <SubMenu
                key='sub1'
                icon={<AppstoreOutlined />}
                title='Navigation Two'
            >
                <Menu.Item key='3'>Option 3</Menu.Item>
                <Menu.Item key='4'>Option 4</Menu.Item>
                <SubMenu key='sub1-2' title='Submenu'>
                    <Menu.Item key='5'>Option 5</Menu.Item>
                    <Menu.Item key='6'>Option 6</Menu.Item>
                </SubMenu>
            </SubMenu>
            <SubMenu
                key='sub2'
                icon={<SettingOutlined />}
                title='Navigation Three'
            >
                <Menu.Item key='7'>Option 7</Menu.Item>
                <Menu.Item key='8'>Option 8</Menu.Item>
                <Menu.Item key='9'>Option 9</Menu.Item>
                <Menu.Item key='10'>Option 10</Menu.Item>
            </SubMenu>
            <Menu.Item key='/profile' icon={<ProfileIcon />}>
                帐号设置
            </Menu.Item>
        </Menu>
    );
};

export default Navigator;
