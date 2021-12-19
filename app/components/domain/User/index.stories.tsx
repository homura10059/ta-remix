import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { User } from './index'

export default {
  title: 'Design System/domain/User'
} as ComponentMeta<typeof User>

const Template: ComponentStory<typeof User> = args => <User {...args} />

export const UserInLoading = Template.bind({})
UserInLoading.args = {
  session: null,
  loading: true
}
