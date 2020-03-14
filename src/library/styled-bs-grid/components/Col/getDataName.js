import { suffix } from '../../utils';
export default (props) => process.env.NODE_ENV === 'production'
    ? undefined
    : [
        props.col && `col${suffix(props.col)}`,
        props.sm && `col-sm${suffix(props.sm)}`,
        props.md && `col-md${suffix(props.md)}`,
        props.lg && `col-lg${suffix(props.lg)}`,
        props.xl && `col-xl${suffix(props.xl)}`,
        props.xxl && `col-xl${suffix(props.xxl)}`,
    ]
        .filter(Boolean)
        .join(' ');
//# sourceMappingURL=getDataName.js.map