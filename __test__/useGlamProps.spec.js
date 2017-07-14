/* eslint-env jest */

import useGlamProps from '../src'

const styles = {
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
    useGlamProps(glamProps => ({
      fontSize: glamProps(styles.fonts),
      background: glamProps(styles.background)
    }))(props)
  ).toEqual({
    fontSize: 20,
    background: '#7CB342'
  })
})

test('Should return undefined for incorrect values', () => {
  const props = {
    hey: true,
    youthere: true
  }

  expect(
    useGlamProps(glamProps => ({
      fontSize: glamProps(styles.fonts),
      background: glamProps(styles.background)
    }))(props)
  ).toEqual({
    fontSize: undefined,
    background: undefined
  })
})

test('Should map into fallback props for incorrect values', () => {
  const props = {
    verysmall: true,
    rainbow: true,
    size: 'small',
    background: 'primary'
  }

  expect(
    useGlamProps(glamProps => ({
      fontSize: glamProps(styles.fonts, 'size'),
      background: glamProps(styles.background, 'background')
    }))(props)
  ).toEqual({
    fontSize: 10,
    background: '#F5F5F5'
  })
})