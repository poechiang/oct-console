/* eslint-disable @typescript-eslint/no-require-imports */

const CracoAnt = require('craco-antd');

const CracoAlias = require('craco-alias');
const CracoLess = require('craco-less');
const { resolve, join } = require('path');

module.exports = {
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            const { extensions, alias } = webpackConfig.resolve;

            // 配置扩展扩展名
            webpackConfig.resolve.extensions = [...extensions, ...['.less']];
            webpackConfig.resolve.alias = {
                ...alias,
                '@assets': resolve(__dirname, './src/assets/'),
                '@pages': resolve(__dirname, './src/pages/'),
                '@lib': resolve(__dirname, './src/lib/'),
                '@components': resolve(__dirname, './src/components/')
            };
            return webpackConfig;
        }
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                loaders: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: 'tsconfig',
                baseUrl: './src',
                tsConfigPath: './tsconfig.extend.json'
            }
        },
        {
            plugin: CracoAnt,
            options: {
                customizeThemeLessPath: join(
                    __dirname,
                    'src/assets/style/theme/light/index.less'
                ),
                javascriptEnabled: true
            }
        }
    ]
};
