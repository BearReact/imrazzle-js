// @flow

import {ColProps} from './types';
import {suffix} from '../../utils';

export default (p: ColProps) =>
    process.env.NODE_ENV === 'production'
        ? undefined
        : [
            p.col && `col${suffix(p.col)}`,
            p.xs && `col-xs${suffix(p.xs)}`,
            p.sm && `col-sm${suffix(p.sm)}`,
            p.md && `col-md${suffix(p.md)}`,
            p.lg && `col-lg${suffix(p.lg)}`,
            p.xl && `col-xl${suffix(p.xl)}`,
            p.xxl && `col-xl${suffix(p.xxl)}`,
        ]
            .filter(Boolean)
            .join(' ');
