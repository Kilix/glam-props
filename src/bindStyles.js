import { glamProps } from './useGlamProps'

const bindStyles = stylesToBind => stylesWithBind => (props, theme) => {
  const glamPropsWithTheme = (map, fallback) =>
    glamProps(typeof map === 'function' ? map(theme) : map, fallback)(props)

  const bindStyles = map =>
    Object.keys(map).reduce((memo, key) => {
      memo[key] = glamPropsWithTheme(map[key], key)

      return memo
    }, {})

  const boundStyles = bindStyles(stylesToBind)

  return stylesWithBind(boundStyles)
}

export default bindStyles
