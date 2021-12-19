import Tip from '@components/Tip';
import React, { FC } from 'react';
import './block';

const BlockHeader: FC<ComponentProps> = ({
    title,
    description,
    extra,
    ...props
}) => {
    return (
        <header className='oc-block-hd flexable --cross-center' {...props}>
            {title}
            <Tip>{description}</Tip>
            <span className='flex-auto' />
            {extra}
        </header>
    );
};

const Block: FC<any> = ({ className = '', title, extra, ...props }) => {
    return (
        <div {...props} className={`oc-block oc-block-wrap ${className}`}>
            <BlockHeader title={title} extra={extra} />
            <section className='oc-block-bd'>{props.children}</section>
        </div>
    );
};

export default Block;
