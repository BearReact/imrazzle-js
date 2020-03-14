export type Column = number | true | 'auto';

export type ColProps = {
  col?: Column,
  sm?: Column,
  md?: Column,
  lg?: Column,
  xl?: Column,
  xxl?: Column,
  children?: React.ReactNode,
  className?: string,
  forwardedAs?: any,
  key?: string,
};

export type ColCss = {
  col: any,
};
