/**
 * iconfont.cn 图标定制
 * @date 2021-12-05
 */
import { createFromIconfontCN } from '@ant-design/icons';
import { merge, reduce } from 'lodash';
import { FC } from 'react';
import IconTypeMap from './IconTypeMap';

const IconFont = createFromIconfontCN({
    scriptUrl: ['//at.alicdn.com/t/font_2989005_dcth8xyavsc.js'],
});

const customizeIconFont = (
    style?: any,
): { [x: string]: FC<ComponentProps> } => {
    const iconList = Object.entries(IconTypeMap);
    return reduce(
        iconList,
        (rlt, [iconName, iconType]) => ({
            ...rlt,
            [`${iconName}Icon`]: ({
                style: style2,
                ...props
            }: ComponentProps) => (
                <IconFont
                    type={iconType}
                    {...props}
                    style={merge({}, style || {}, style2 || {})}
                />
            ),
        }),
        {},
    );
};

IconFont.prototype = { customizeIconFont };

export { customizeIconFont };

export default IconFont;
