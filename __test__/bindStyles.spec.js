/* eslint-env jest */

import { bindStyles } from '../src'

const theme = {
  colors: {
    default: 'black',
    danger: 'pink'
  }
}

const stylesToBind = {
  fonts: {
    small: 10,
    medium: 20,
    big: 30
  },
  background: theme => ({
    primary: theme.colors.default,
    danger: '#DD2C00',
    success: '#7CB342'
  })
}

test('Should map props and theme props into values', () => {
  const props = {
    medium: true,
    success: true
  }

  expect(
    bindStyles(stylesToBind)(s => ({
      fontSize: s.fonts,
      background: s.background
    }))(props, theme)
  ).toEqual({
    fontSize: 20,
    background: '#7CB342'
  })
})
