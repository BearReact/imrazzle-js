import * as CSS from 'csstype';

export type RowProps = {
    noGutters?: boolean;
    children?: React.ReactNode;
    className?: string;
    style?: CSS.Properties;
};
