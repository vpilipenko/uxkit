import React from 'react'

import cx from 'classnames'

import LayoutReadme from './README.md'

import { storiesOf } from '@storybook/react'
import {
  withKnobs,
  text,
  object,
} from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { State, Store } from '@sambego/storybook-state'

import Layout from './src/Layout'
import APLogo from '../Logo/src'

const store = new Store({
  collapsed: true,
})


const toggleCollapsed = value => {
  store.set({ collapsed: value })
}

const handeProbablyCollapsed = (e, reason) => {
  toggleCollapsed(!store.get('collapsed'))
}


storiesOf('Layout', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      content: LayoutReadme,
      codeTheme: 'github',
    },
  })
  .add('Layout', () => {
    return (
      <State store={store}>
        <Layout
          logo={<Logo />}
          nav={ object('nav', [
            { to: '/vehicles', text: 'Транспортные средства', onClick: action('navItemOnClick'),active: true },
            { to: '/routes', text: 'Маршруты', onClick: action('navItemOnClick') },
            { to: '/stations', text: 'Станции', onClick: action('navItemOnClick') },
            { to: '/passengers', text: 'Пассажиры', onClick: action('navItemOnClick') },
          ])}
          navItemComponent={({ text, active, itemClass, itemActiveClass, ...other }) => (
            <div className={cx({
              [itemClass]: true,
              [itemActiveClass]: active,
            })} {...other}>{text}</div>
          )}
          collapsed={store.get('collapsed')}
          layoutHeight={500}
          onLogoutClick={action('onLogoutClick')}
          onProbablyCollapsed={handeProbablyCollapsed}
        >
          <div style={{ padding: '3rem' }}>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!</p>
            <p>Ad dolore dignissimos asperiores dicta facere optio quod commodi nam tempore recusandae. Rerum sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio aliquam!</p>
            <p>Tenetur quod quidem in voluptatem corporis dolorum dicta sit pariatur porro quaerat autem ipsam odit quam beatae tempora quibusdam illum! Modi velit odio nam nulla unde amet odit pariatur at!</p>
            <p>Consequatur rerum amet fuga expedita sunt et tempora saepe? Iusto nihil explicabo perferendis quos provident delectus ducimus necessitatibus reiciendis optio tempora unde earum doloremque commodi laudantium ad nulla vel odio?</p>
          </div>
        </Layout>
      </State>
    )
  })

const Logo = _ => {
  return (
    <APLogo
      version={text('version', '1.1.4')}
    >
      {text('logo', 'Лейаут')}
    </APLogo>
  )
}