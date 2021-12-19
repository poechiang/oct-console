module.exports = {
    parser: '@typescript-eslint/parser', // 定义ESLint的解析器
    extends: ['plugin:prettier/recommended', 'prettier'], // 定义文件继承的子规范
    plugins: ['@typescript-eslint'], // 定义了该eslint文件所依赖的插件
    env: {
        // 指定代码的运行环境
        browser: true,
        node: true,
        es6: true
    },
    globals: {
        // Your global variables (setting to false means it's not allowed to be reassigned)
        //
        // myGlobal: false
    },

    settings: {
        // 自动发现React的版本，从而进行规范react代码
        react: {
            pragma: 'React',
            version: 'detect'
        }
    },
    parserOptions: {
        // 指定ESLint可以解析JSX语法
        ecmaVersion: 2019,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            tsx: true
        }
    },
    rules: {
        'prettier/prettier': ['off'],
        'comma-dangle': [
            2,
            {
                arrays: 'only-multiline',
                objects: 'only-multiline',
                imports: 'only-multiline',
                exports: 'only-multiline',
                functions: 'only-multiline'
            }
        ],
        'template-curly-spacing': [2, 'never']
    }
};
