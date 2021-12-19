import Heading from '@components/Heading';
import withEditable from '@components/hoc/withEditable';
import Tip from '@components/Tip';
import NotFound from '@pages/notfound';
import { Image, PageHeader, Tabs } from 'antd';
import React, { FC, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import { Navigate } from 'react-router-dom';
import UserBasisInfo from './basis';
import './style';

const { TabPane } = Tabs;
const UserNameHeading = withEditable(Heading, { level: 2, weight: false, style: { marginBottom: 0 }});
const SignatureTip = withEditable(Tip);
const Profile: FC = (props) => {
    const navigator = useNavigate();
    const [signature, setSignature] = useState('一切伟大的思想和行动都有一个微不足道的开始!');
    const handleTabsChange = (subUrl:string) => {
        navigator(subUrl, { replace: true });
    };

    return (
        <main className='oc-page-wrap'>
            <PageHeader
                className='oc-page-header'
                title='个人资料'
                subTitle='点击可输入或修改你的个人资料，完成后自动保存...'
            />
            <div className='user-info flexable'>
                <Image
                    width={100}
                    src='/images/avart.jpg'
                />
                <div className='flex-auto ml-16'>
                    <UserNameHeading style={{ margin: '0.5em 0' }}>云淡风轻</UserNameHeading>
                    <Tip>1981.11 射手</Tip>
                    <SignatureTip onInput={setSignature}>{signature}</SignatureTip>

                </div>
            </div>
            <Tabs className='router-tab' defaultActiveKey='basis' onChange={handleTabsChange}>
                <TabPane tab='基本信息' key='basis'/>
                <TabPane tab='帐号信息' key='accounts'/>
                <TabPane tab='权限列表' key='perm-list'/>
            </Tabs>
            <Routes>
                <Route path='basis' element={<UserBasisInfo/>}/>
                <Route path='accounts' />
                <Route path='perm-list'/>
                <Route path='/' element={<Navigate to='basis' />} />
                <Route path='*' element={<NotFound/>} />
            </Routes>
        </main>
    );
};

export default Profile;
