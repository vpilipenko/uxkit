import React from 'react'

// import Button from './src/Button'
// import ButtonReadme from './README.md'

// import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, select, object } from '@storybook/addon-knobs'
// import { action } from '@storybook/addon-actions'

import { Alert } from './node_modules/@vpilipenko/icons/dist'

export default {
  title: 'Button',
  decorators: [withKnobs]
}

export const Default = _ => {
  return (
    <div><Alert /></div>
  )
}


// storiesOf('Button', module)
//   .addDecorator(withKnobs)
//   .addParameters({
//     readme: {
//       content: ButtonReadme,
//       codeTheme: 'github',
//     },
//   })
//   .add('Button', () => {
//     const sizes = ['l', 'm', 's']

//     return (
//       <div>
//         <Button
//           text={text('Text', 'Войти')}
//           size={select('Size', { s: 's', m: 'm', l: 'l' }, 'l')}
//           view={select('main', { main: 'main', secondary: 'secondary', pseudo: 'pseudo' }, 'main')}
//           theme={select('Theme', { light: 'light' }, 'light')}
//           fullWidth={boolean('Full width', false)}
//           disabled={boolean('Disabled', false)}
//           icon={text('Icon', '')}
//           prefix={text('Prefix', '')}
//           suffix={text('Suffix', '')}
//           style={object('Style', {})}
//           onClick={action('onClick')}
//           onFocus={action('onFocus')}
//           onMouseEnter={action('onMouseEnter')}
//           onMouseLeave={action('onMouseLeave')}
//         />
//         <br/>
//         <br/>
//         <br/>
//         <h3>Основная кнопка</h3>
//         <p>Не стоит использовать больше одной на странице</p>
//         <div style={{ display: 'flex', alignItems: 'flex-end' }}>
//           {sizes.map(size => (
//             <div key={size} style={{ display: 'inline-block', marginRight: '.5rem', marginBottom: '.5rem' }}>
//               <div style={{ marginBottom: '.5rem' }}>
//                 <Button
//                   text={text('Text', 'Войти')}
//                   view='main'
//                   size={size}
//                 />
//               </div>
//               <div style={{ marginBottom: '.5rem' }}>
//                 <Button
//                   text={text('Text', 'Войти')}
//                   view='main'
//                   size={size}
//                   disabled
//                 />
//               </div>
//               <div><small>{size}</small></div>
//             </div>
//           ))}
//         </div>
//         <h3>Второстепенная кнопка</h3>
//         <p>Самая используемая кнопка</p>
//         <div style={{ display: 'flex', alignItems: 'flex-end' }}>
//           {sizes.map(size => (
//             <div key={size} style={{ display: 'inline-block', marginRight: '.5rem', marginBottom: '.5rem' }}>
//               <div style={{ marginBottom: '.5rem' }}>
//                 <Button
//                   text={text('Text', 'Войти')}
//                   view='secondary'
//                   size={size}
//                 />
//               </div>
//               <div style={{ marginBottom: '.5rem' }}>
//                 <Button
//                   text={text('Text', 'Войти')}
//                   view='secondary'
//                   size={size}
//                   disabled
//                 />
//               </div>
//               <div><small>{size}</small></div>
//             </div>
//           ))}
//         </div>
//         <h3>Псевдо кнопка</h3>
//         <p>Обозначает действие без перехода на другой экран. Например, прикрепление документов к анкете, переход в режим редактирования.</p>
//         <div style={{ display: 'flex', alignItems: 'flex-end' }}>
//           {sizes.map(size => (
//             <div key={size} style={{ display: 'inline-block', marginRight: '.5rem', marginBottom: '.5rem' }}>
//               <div style={{ marginBottom: '.5rem' }}>
//                 <Button
//                   text={text('Text', 'Войти')}
//                   view='pseudo'
//                   size={size}
//                 />
//               </div>
//               <div style={{ marginBottom: '.5rem' }}>
//                 <Button
//                   text={text('Text', 'Войти')}
//                   view='pseudo'
//                   size={size}
//                   disabled
//                 />
//               </div>
//               <div><small>{size}</small></div>
//             </div>
//           ))}
//         </div>
//         <h3>Кнопка с иконкой</h3>
//         <p>Можно добавить компонент иконки</p>
//         <div>
//           {sizes.map(size => (
//             <div key={size} style={{ display: 'inline-block', marginRight: '.5rem', marginBottom: '.5rem' }}>
//               <div style={{ marginBottom: '.5rem' }}>
//                 <Button
//                   text={text('Text', 'Войти')}
//                   size={size}
//                   icon={<Check />}
//                 />
//               </div>
//               <div style={{ marginBottom: '.5rem' }}>
//                 <Button
//                   text={text('Text', 'Войти')}
//                   size={size}
//                   icon={<Check />}
//                   disabled
//                 />
//               </div>
//               <div><small>{size}</small></div>
//             </div>
//           ))}
//           <Button
//             size='l'
//             text={text('Text', 'Войти')}
//             icon={<Check fill='#FFFFFF' />}
//             view='main'
//             fullWidth
//             style={{ marginBottom: '.5rem' }}
//           />
//           <Button
//             text={text('Text', 'Войти')}
//             icon={<Check />}
//             fullWidth
//             style={{ marginBottom: '.5rem' }}
//           />
//           <Button
//             size='s'
//             view='pseudo'
//             text={text('Text', 'Войти')}
//             icon={<Check />}
//             fullWidth
//           />
//           <div><small>full width</small></div>
//         </div>
//         <h3>Широкая кнопка</h3>
//         <p>Кнопка занимающая всю ширину родительского элемента</p>
//         <div style={{ display: 'flex', flexDirection: 'column' }}>
//           {sizes.map(size => (
//             <div key={size} style={{ marginBottom: '.5rem' }}>
//               <Button
//                 text={text('Text', 'Войти')}
//                 size={size}
//                 fullWidth
//                 width='30%'
//               />
//               <div><small>{size}</small></div>
//             </div>
//           ))}
//         </div>
//         <h3>Круглая кнопка</h3>
//         <p>Любая из кнопок может быть с круглыми краями</p>
//         <div style={{ display: 'flex', alignItems: 'flex-end' }}>
//           {sizes.map(size => (
//             <div key={size} style={{ display: 'inline-block', marginRight: '.5rem', marginBottom: '.5rem' }}>
//               <div style={{ marginBottom: '.5rem' }}>
//                 <Button
//                   text={text('Text', 'Войти')}
//                   view='main'
//                   size={size}
//                   rounded
//                 />
//               </div>
//               <div style={{ marginBottom: '.5rem' }}>
//                 <Button
//                   text={text('Text', 'Войти')}
//                   view='main'
//                   size={size}
//                   rounded
//                   disabled
//                 />
//               </div>
//               <div><small>{size}</small></div>
//             </div>
//           ))}
//         </div>

//       </div>
//     )
//   })