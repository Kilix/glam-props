export const glamProps = (map, fallback) => props => {
  const keysFromProps = Object.keys(map).filter(
    key => props[key] !== undefined
  )
  if (keysFromProps.length > 1) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        `[glamProps] Multiple props provided: ${keysFromProps.join(', ')}.`
      )
    }
  }
  const keyFromProps = keysFromProps[0]
  if (map[keyFromProps]) {
    return map[keyFromProps]
  }
  if (fallback) {
    if (props[fallback] && map[props[fallback]]) {
      return map[props[fallback]]
    }
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        `[glamProps] Unknown fallback prop provided: ${fallback}.`
      )
    }
  }
  return undefined
}

const useGlamProps = stylesWithGlamProps => (props, theme) => {
  const glamPropsWithTheme = (map, fallback) =>
    glamProps(typeof map === 'function' ? map(theme) : map, fallback)(props)

  return stylesWithGlamProps(glamPropsWithTheme, theme)
}

export default useGlamProps
