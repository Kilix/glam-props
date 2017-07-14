/* eslint-env jest */

import useGlamProps from '../src/useGlamProps'

const theme = {
  colors: {
    default: 'black',
    danger: 'pink'
  }
}

const glamPropsWithStyles = useGlamProps(glamProps => ({
  fontSize: glamProps(styles.fonts),
  background: glamProps(styles.background)
}))

const styles = {
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

test('Should map props into values', () => {
  const props = {
    medium: true,
    success: true
  }

  expect(glamPropsWithStyles(props, theme)).toEqual({
    fontSize: 20,
    background: '#7CB342'
  })
})

test('Should return undefined for incorrect values', () => {
  const props = {
    hey: true,
    youthere: true
  }

  expect(glamPropsWithStyles(props, theme)).toEqual({
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
    }))(props, theme)
  ).toEqual({
    fontSize: 10,
    background: 'black'
  })
})

test('should warn about multiple values in map in DEV mode', () => {
  const props = {
    medium: true,
    big: true,
    primary: true
  }

  expect(() => glamPropsWithStyles(props, theme)).toThrowError(/medium, big/)

  process.env.NODE_ENV = 'production'

  expect(() => glamPropsWithStyles(props, theme)).not.toThrowError(/medium, big/)

  process.env.NODE_ENV = ''
})

test('should warn about incorrect fallback prop in DEV mode', () => {
  const props = {

  }

  expect(() => useGlamProps(glamProps => ({
    fontSize: glamProps(styles.fonts, 'size')
  }))(props, theme)).toThrowError(/size/)

  process.env.NODE_ENV = 'production'

  expect(() => useGlamProps(glamProps => ({
    fontSize: glamProps(styles.fonts, 'size')
  }))(props, theme)).not.toThrowError(/size/)

  process.env.NODE_ENV = ''
})
