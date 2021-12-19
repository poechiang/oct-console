import { connect } from '@lib/redux';
import NotFound from '@pages/notfound';
import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

const Auth: FC = (props) => {
    return (
        <div
            className={`Auth flexable --column h-full`}
        >
            {/* <PageHeader /> */}
            <main className='flex-auto p-24'>
                <Routes>
                    <Route path={`login`} element={null} />
                    <Route path={`reg`} element={null} />
                    <Route path='*' element={<NotFound/>} />
                </Routes>
                {/* <PageFooter /> */}
            </main>
        </div>
    );
};

export default connect()((Auth));
