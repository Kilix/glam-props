/* eslint-env jest */

import { bindStyles } from '../src'

const stylesToBind = {
  fonts: {
    small: 10,
    medium: 20,
    big: 30
  },
  background: {
    primary: '#F5F5F5',
    danger: '#DD2C00',
    success: '#7CB342'
  }
}

test('Should map props into values', () => {
  const props = {
    medium: true,
    success: true
  }

  expect(
    bindStyles(stylesToBind)(s => ({
      fontSize: s.fonts,
      background: s.background
    }))(props)
  ).toEqual({
    fontSize: 20,
    background: '#7CB342'
  })
})