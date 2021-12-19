import '@assets/style';
import App from '@pages/app';
import Auth from '@pages/auth';
import NotFound from '@pages/notfound';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import initStore, { Provider } from './lib/redux';
import reportWebVitals from './reportWebVitals';
console.log(111);
const store = initStore({
    language: 'zh-CN',
    messages: [1, 2, 3],
    navigator: {
        url: '',
        visible: true
    },
    wallpaper: { visible: false }
});

ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <BrowserRouter>
                <Routes>
                    <Route path='auth' element={<Auth/>}/>
                    <Route path='notfound' element={<NotFound/>}/>
                    <Route path='/*' element={<App/>}/>

                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.debug);
