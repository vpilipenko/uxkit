import React from 'react'

// import cx from 'classnames'

// import LayoutReadme from './README.md'

import { storiesOf } from '@storybook/react'
import {
  withKnobs,
  text,
  object,
} from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { State, Store } from '@sambego/storybook-state'

import Layout, { NavItem } from './src/Layout'
import Logo from "../Logo/src";

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
  // .addParameters({
  //   readme: {
  //     content: LayoutReadme,
  //     codeTheme: 'github',
  //   },
  // })
  .add('Layout', () => {
    const nav = object('nav', [
      { text: 123, to: 123 },
      { type: 'dropdown', title: 'Dropdown',
        children: [
          { text: 'dropdown_children_0', to: 123 },
          { text: 'dropdown_children_1', to: 123 },
        ],
      },
      { text: 123, to: 123 },
      { type: 'section', title: 'Аналитика', hasSeparator: true,
        children: [
          { text: 'section_children_0', to: 123 },
          { text: 'section_children_1', to: 123 },
          { type: 'dropdown', title: 'Dropdown',
            defaultOpen: true,
            children: [
              { text: 'dropdown_children_0', to: 123 },
              { type: 'dropdown', title: 'Dropdown',
                children: [
                  { text: 'dropdown_children_0', to: 123 },
                  { text: 'dropdown_children_1', to: 123 },
                  { type: 'dropdown', title: 'Dropdown',
                    children: [
                      { text: 'dropdown_children_0', to: 123 },
                      { text: 'dropdown_children_1', to: 123 },
                    ],
                  },
                  { text: 'dropdown_children_0', to: 123 },
                  { text: 'dropdown_children_1', to: 123 },
                ],
              },
              { text: 'dropdown_children_1', to: 123 },
            ],
          },
        ],
      },
      { type: 'section', title: 'Доступы', hasSeparator: true,
        children: [
          { text: 'section_children_0', to: 123 },
          { text: 'section_children_1', to: 123 },
        ],
      },
      { type: 'section', title: 'Отчеты', hasSeparator: true,
        children: [
          { text: 'Транспортные средства', to: 123 },
          { text: 'Абонементы', to: 123 },
          { text: 'Билеты', to: 123 },
        ],
      },
      { type: 'section', title: 'Счетчики', hasSeparator: true,
        children: [
          { text: 'section_children_0', to: 123 },
          { text: 'section_children_1', to: 123 },
          { text: 'section_children_0', to: 123 },
          { text: 'section_children_1', to: 123 },
        ],
      },
      { type: 'section', title: 'Графики',
        children: [
          { text: 'section_children_0', to: 123 },
          { text: 'section_children_1', to: 123 },
        ],
      },
    ])
    return (
      <Layout
        nav={nav}
        onLogoutClick={action('onLogoutClick')}
        header={ <Logo version={process.env.VERSION}>ЕФС МКПП</Logo> }
        footer={
          <NavItem
              component='div'
              data-type={'logout_btn'}
              text='Выход'
          />
        }
        // navItemComponent={({ text, active, itemClass, itemActiveClass, ...other }) => (
        //   <div className={cx({
        //     [itemClass]: true,
        //     [itemActiveClass]: active,
        //   })} {...other}>{text}</div>
        // )}
        // collapsed={store.get('collapsed')}
        // onProbablyCollapsed={handeProbablyCollapsed}
      >
        <div style={{ padding: '3rem' }}>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!</p>
          <p>Ad dolore dignissimos asperiores dicta facere optio quod commodi nam tempore recusandae. Rerum sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio aliquam!</p>
          <p>Tenetur quod quidem in voluptatem corporis dolorum dicta sit pariatur porro quaerat autem ipsam odit quam beatae tempora quibusdam illum! Modi velit odio nam nulla unde amet odit pariatur at!</p>
          <p>Consequatur rerum amet fuga expedita sunt et tempora saepe? Iusto nihil explicabo perferendis quos provident delectus ducimus necessitatibus reiciendis optio tempora unde earum doloremque commodi laudantium ad nulla vel odio?</p>
        </div>
      </Layout>
    )
  })
