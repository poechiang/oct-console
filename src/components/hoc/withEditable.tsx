
import CheckOutlined from '@ant-design/icons/lib/icons/CheckOutlined';
import CloseOutlined from '@ant-design/icons/lib/icons/CloseOutlined';
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined';
import UndoOutlined from '@ant-design/icons/lib/icons/UndoOutlined';
import { takeWhile } from 'lodash';
import React, { createElement, FC, Fragment, RefObject, useEffect, useRef, useState } from 'react';

const getWrappedDom = (ref:RefObject<HTMLElement>):HTMLElement => {
    const wrapDom = ref.current;
    return wrapDom?.getElementsByClassName('oc-wrapped-editor')?.[0] as HTMLElement;
};
const getContent = (ref:RefObject<HTMLElement>):string => {
    const wrapped = getWrappedDom(ref);
    return wrapped.innerHTML;
};
const setContent = (ref:RefObject<HTMLElement>, content:string) => {
    const wrapped = getWrappedDom(ref);
    wrapped.innerHTML = content;
};
const withEditable = (WrappedComponent:FC, options:any = {}) => (props:any) => {
    const { isInline, multiLinnes = false, autoComplete = true, className, children, onChange, onInput, ...wrapperProps } = props;

    const [editing, setEditing] = useState(false);

    const [wrappedProps, setWrappedProps] = useState(options);
    const [classNameList, setClassNameList] = useState([
        'oc-editable-wrap',
        isInline ? '--inline' : '--block',
        ...(className?.split(' ') || [])
    ]);
    const focusRef = useRef<HTMLElement>(null);
    const initContentRef = useRef<string>();
    const prevContentRef = useRef<string>();

    const handleClick = () => {
        setEditing(true);
        setTimeout(() => {
            const wrapped = getWrappedDom(focusRef);
            wrapped?.focus();
        }, 20);
    };

    const handleReset = () => {
        const initContent = initContentRef.current;
        console.log(111111, initContent);
        setContent(focusRef, initContent || '');
    };
    const handleEditComplated = () => {
        const content = getContent(focusRef);
        prevContentRef.current = content;
        initContentRef.current = content;
        onChange?.(content);
    };
    const handleEditInput = () => {
        const content = getContent(focusRef);
        prevContentRef.current = content;
        console.log(2222, content, prevContentRef.current, initContentRef.current);
        onInput?.(content);
    };

    useEffect(() => {
        console.debug('component inited');
        initContentRef.current = children;
    }, []);

    useEffect(() => {
        console.debug('"children" changed');
        const wrapped = getWrappedDom(focusRef);
        if (wrapped && prevContentRef.current !== children) {
            wrapped.innerHTML = children;
        }
    }, [children]);

    useEffect(() => {
        if (editing) {
            setWrappedProps({
                ...options,
                tabIndex: 0,
                suppressContentEditableWarning: true,
                contentEditable: true,
                onInput: handleEditInput,
                onBlur: (e:any) => {
                    handleEditComplated();
                    autoComplete && setEditing(false);
                    e.stopPropagation();
                    e.preventDefault();
                    e.cancelBubble = true;
                }
            });
            setClassNameList([...classNameList, 'editing']);
        } else {
            setWrappedProps({
                ...options
            });
            const classNames = takeWhile(classNameList, c => c !== 'editing');
            setClassNameList(classNames);
        }
    }, [editing]);

    const WrappedComponentInst = <WrappedComponent
        {...wrappedProps}
        className='oc-wrapped-editor'
    />;

    const IconPanel = <span className='icon-panel'>
        {!editing ? <EditOutlined style={{ color: '#787878' }}/> : null}
        {!autoComplete && editing ? <UndoOutlined className='undo' onClick={handleReset}/> : null}
        {!autoComplete && editing ? <CloseOutlined className='close' /> : null}
        {!autoComplete && editing ? <CheckOutlined className='ok' /> : null}
    </span>;

    return createElement(isInline ? 'span' : 'div', {
        ...wrapperProps,
        className: classNameList.join(' '),
        ref: focusRef,
        children: <Fragment> {WrappedComponentInst} {IconPanel}</Fragment>,

        onClick: handleClick
    });
};
export default withEditable;
