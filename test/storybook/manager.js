import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';
import {themes} from '@storybook/theming';

const theme = create({
    base: 'light',
    brandTitle: 'My custom title',
    ...themes.dark,
});

addons.setConfig({
    panelPosition: 'bottom',
    theme: theme,
});

