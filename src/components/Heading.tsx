import { createElement, FC } from 'react';

const Heading: FC<any> = ({
    className = '',
    style = {},
    level = 4,
    weight = true,
    ...props
}) => {
    // const style = (props.styles || {}) as any;
    const styleObj = { ...style };
    if (weight) {
        styleObj.fontWeight = weight === true ? 500 : weight;
    } else {
        styleObj.fontWeight = 400;
    }
    const cn = ['oc-heading', ...className.split(' ')].join(' ');
    return createElement(`h${level}`, {
        className: cn,
        style: styleObj,
        ...props,
    });
};

export default Heading;
