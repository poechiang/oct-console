import Block from '@components/Block';
import Heading from '@components/Heading';
import OctoTable from '@components/Table';
import { get } from '@lib/fetch';
import { PageHeader, Radio, Table, Tag } from 'antd';
import { find, map } from 'lodash';
import { FC, useEffect, useState } from 'react';
import columns from './columns';
const { Column, ColumnGroup } = Table;

const adjustList = (list:any[], len?:number) => map(list, a => {
    a.overview = a.content.substring(0, len || 80);
    return a;
});
const Articles:FC<any> = (props) => {
    const [articleList, setArticleList] = useState<any[]>([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [previewLength, setPreviewLength] = useState(80);
    const [tableColumns, setTableColumns] = useState(columns);
    useEffect(() => {
        console.log(`page [ Articles ] initialized!`);

        const titleCol = find(tableColumns, c => c.key === 'title');
        if (titleCol) {
            titleCol.render = (_, r) => (<>
                <Heading>{r.title}</Heading>
                <p>{r.overview}</p>
                <div>{map(r.tags, (v:string) => <Tag key={v}>{v}</Tag>)}</div>
            </>);
        }

        setDataLoading(true);
        get('/blog/articles').then((resp) => {
            setArticleList(adjustList(resp?.result));
            setDataLoading(false);
        });
    }, []);

    useEffect(() => {
        setArticleList(adjustList(articleList, previewLength));
    }, [previewLength]);

    return (
        <main id='blog-art-list' className='oc-page-wrap'>
            <PageHeader
                className='oc-page-header'
                title='笔记/文章列表'
            />

            <Block
                extra={
                    <Radio.Group onChange={(e) => setPreviewLength(e.target.value)} defaultValue={previewLength}>
                        <Radio.Button value={80}>80</Radio.Button>
                        <Radio.Button value={120}>120</Radio.Button>
                        <Radio.Button value={160}>160</Radio.Button>
                        <Radio.Button value={200}>200</Radio.Button>
                    </Radio.Group>
                }
            >
                <OctoTable
                    dataSource={articleList}
                    columns={tableColumns}
                    loading={dataLoading}
                    rowKey='_id'
                    size='small'
                />
            </Block>
        </main>
    );
};
export default Articles;
