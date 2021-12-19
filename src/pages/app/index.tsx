import Navigator from '@components/Navigator';
import SitePageHeader from '@components/SitePageHeader';
import NotFound from '@pages/notfound';
import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Blog from './blog';
import Overview from './overview';
import Profile from './profile';

const App: FC = () => (
    <div className='App' >
        <SitePageHeader />

        <div className='flexable'>
            <Navigator/>
            <div className='flex-auto'>
                <Routes>
                    <Route path='overview/*' element={<Overview/>}/>
                    <Route path='blog/*' element={<Blog/>}/>
                    <Route path='profile/*' element={<Profile/>}/>
                    <Route path='/' element={<Navigate to='/overview'/>}/>
                    <Route path='*' element={<NotFound/>}/>
                </Routes>
            </div>
        </div>
    </div>
);

export default App;
