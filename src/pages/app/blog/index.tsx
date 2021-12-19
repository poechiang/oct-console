
import NotFound from '@pages/notfound';
import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Articles from './articles';

const Blog:FC<any> = (props) => {
    return <Routes>
        <Route path='articles/*' element={<Articles/>}/>
        <Route path='/' element={<Navigate to='articles'/>}/>
        <Route path='*' element={<NotFound/>}/>
    </Routes>;
};
export default Blog;
