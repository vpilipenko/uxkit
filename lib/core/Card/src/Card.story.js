import React from "react";

import { storiesOf } from "@storybook/react";

import Card from './Card';

storiesOf("Card", module).add("Default", () => (
    <Card>12345</Card>
));

