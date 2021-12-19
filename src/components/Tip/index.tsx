import React, { FC } from 'react';
import './style';
const Tip: FC<any> = ({ className = '', children, ...props }: any) => {
    return (
        <span className={`oc-tip-wrapper ${className}`} {...props}>
            {children}
        </span>
    );
};
export default Tip;
