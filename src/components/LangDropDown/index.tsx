import Icon, { DownOutlined } from '@ant-design/icons';
import { CHANGE_LANG, connect } from '@lib/redux';
import { Button, Dropdown, Menu } from 'antd';
import { find, map } from 'lodash';
import React from 'react';
import languages from './languages';

const LangDropDown = ({
    language,
    onLanguageChange,
    className
}: ComponentProps) => {
    const curr = find(languages, ({ key }) => key === language);
    return (
        <Dropdown
            overlay={
                <Menu
                    onClick={({ key }) => onLanguageChange?.(key)}
                    selectedKeys={[language]}
                >
                    {map(languages, (lang) => (
                        <Menu.Item
                            key={lang.key}
                            icon={
                                <Icon component={lang.icon} className='icon' />
                            }
                        >
                            {lang.label}
                        </Menu.Item>
                    ))}
                </Menu>
            }
        >
            <Button className={className} type='text'>
                <Icon component={curr?.icon} className='icon' />

                {curr?.label}
                <DownOutlined />
            </Button>
        </Dropdown>
    );
};

export default connect(
    ({ language }: any) => ({ language }),
    (dispatcher) => ({
        onLanguageChange: (key: string) => {
            dispatcher({ type: CHANGE_LANG, language: key });
        }
    })
)(LangDropDown);
