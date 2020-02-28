import { configure } from '@storybook/react';

const req = require.context('../lib/core', true, /.stories.js$/);

const loadStories = () => {
    req.keys().forEach((filename) => req(filename))
};

configure(loadStories, module);
