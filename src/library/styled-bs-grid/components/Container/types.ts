import * as CSS from 'csstype';

export type ContainerProps = {
    fluid?: boolean;
    children?: React.ReactNode;
    className?: string;
    style?: CSS.Properties;
};
