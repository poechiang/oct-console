import { ButtonProps } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { RenderedCell } from 'rc-table/lib/interface';
import React from 'react';
declare type IOctoTableColumnRender<T=any>=((value:any, row:T, index:number)=>React.ReactNode|RenderedCell<T>)|undefined;
declare interface IOctoTableAction extends ButtonProps, IActions{}
declare interface IOctoTableColumn<T=any> extends ColumnProps<T>{
    type?:'string'|'number'|'date'|'boolean'|'tags'|'actions';
    checkedLabel?:string;
    formatter?:string;
    uncheckedLabel?:string;
    readonly?:boolean;
    actions?:IOctoTableAction[]|((value: any, record: T, index: number) => IOctoTableAction[])
}
