import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { Link } from './index'

export default {
  title: 'Design System/headless/Link'
} as ComponentMeta<typeof Link>

const Template: ComponentStory<typeof Link> = args => <Link {...args} />

export const LinkSandbox = Template.bind({})
LinkSandbox.args = {
  href: '#',
  className: '',
  children: 'link_text'
}
