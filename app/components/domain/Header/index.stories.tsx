import React from 'react'

import { Header } from './index'
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    title: 'Design System/domain/Header',
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const NormalHeader = Template.bind({});