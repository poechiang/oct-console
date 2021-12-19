import { Button, Divider, Radio, Table, Tag } from 'antd';
import * as fns from 'date-fns';
import { isFunction, map } from 'lodash';
import { RenderedCell } from 'rc-table/lib/interface';
import { FC, ReactNode } from 'react';
import { IOctoTableColumn, IOctoTableColumnRender } from './table';

const { Column, ColumnGroup } = Table;

const octoBooleanTableColumnRender = (col:any):IOctoTableColumnRender =>
    (value:any):ReactNode|RenderedCell<any>|undefined =>
        <label>
            <Radio checked={value} disabled={col.readonly}/>
            {col[value ? 'checkedLabel' : 'uncheckedLabel']}
        </label>;
const octoDateTableColumnRender = (col:any):IOctoTableColumnRender =>
    (value:any):ReactNode|RenderedCell<any>|undefined => (
        <>{fns.format(new Date(value), col.formatter || 'yyyy-MM-dd HH:mm:ss')}</>
    );

const octoTagsTableColumnRender = (col:any):IOctoTableColumnRender =>
    (value:any):ReactNode|RenderedCell<any>|undefined => (
        <>{map(value, (v:string) => <Tag key={v}>{v}</Tag>)}</>
    );

const octoActionsTableColumnRender = (col:any) :IOctoTableColumnRender =>
    (value:any, row, index):ReactNode|RenderedCell<any>|undefined => {
        const actions = isFunction(col.actions) ? col.actions(value, row, index) : col.actions;
        return <> {
            map(actions as any[], ({ onClick, label, ...btnProps }, i:number) => (<span key={label}>
                {i === 0 ? null : <Divider type='vertical' style={{ margin: '2px' }} />}
                <Button type='link' size='small' onClick={onClick} {...(btnProps || {})} style={{ padding: '0 2px' }}>{label}</Button>
            </span>))
        }</>;
    };

const OctoTable:FC<ComponentProps> = ({ className, style, columns, dataSource, ...props }) => {
    return (
        <Table className={'octo-table-wrapper octo-table' + className} style={style} dataSource={dataSource} {...props}>
            {map(columns, (col:IOctoTableColumn, cindex) => {
                const { key, dataIndex, render } = col;
                const ckey = key || dataIndex as string || cindex;
                let typeRender:IOctoTableColumnRender;
                if (col.type === 'boolean') {
                    typeRender = octoBooleanTableColumnRender(col);
                } else if (col.type === 'date') {
                    typeRender = octoDateTableColumnRender(col);
                } else if (col.type === 'tags') {
                    typeRender = octoTagsTableColumnRender(col);
                } else if (col.type === 'actions') {
                    typeRender = octoActionsTableColumnRender(col);
                }
                return <Column {...col} key={ckey} render={render || typeRender}/>;
            })}

        </Table>);
};
export default OctoTable;
