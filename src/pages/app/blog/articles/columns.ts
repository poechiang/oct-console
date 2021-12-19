import { IOctoTableColumn } from '@components/Table/table';
import { message } from 'antd';

const columns:IOctoTableColumn[] = [{
    title: '文章',
    key: 'title'
}, {
    title: '分组',
    dataIndex: 'catagory',
    width: 200
}, {
    title: '发布日期',
    width: 200,
    dataIndex: 'createdAt',
    type: 'date',
    formatter: 'MMM dd, yyyy HH:mm:ss'
}, {
    title: '操作',
    type: 'actions',
    width: 160,
    actions: (value, row) => ([{
        label: row.visible !== false ? '隐藏' : '公开',
        onClick: (e) => { message.info('正在编辑...'); }
    }, {
        label: '编辑',
        onClick: (e) => { message.info('正在编辑...'); }
    }, {
        label: '删除',
        danger: true,
        onClick: (e) => { message.info('正在编辑...'); }
    }])
}];

export default columns;
