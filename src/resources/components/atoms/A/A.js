import * as React from 'react';
import { Link } from 'react-router-dom';
/**
 * 路由超連結
 * fake react-route <Linkt to="/about"/>
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const A = (props) => {
    const { href, as, alt, style, className, children, onClick } = props;
    const params = {
        to: as === 'a' ? undefined : href,
        href: as === 'a' ? href : undefined,
        as: as,
        alt: alt,
        style: style,
        className: className,
        onClick: onClick,
    };
    return (
    // @ts-ignore
    React.createElement(Link, Object.assign({}, params), children));
};
A.defaultProps = {
    className: undefined,
    style: undefined,
    as: undefined,
    alt: undefined,
    children: '',
    onClick: undefined,
};
export default A;
//# sourceMappingURL=A.js.map