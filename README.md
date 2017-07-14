[![Build Status](https://travis-ci.org/bulby97/glam-props.svg?branch=master)](https://travis-ci.org/bulby97/glam-props)
[![Code coverage](https://codecov.io/gh/bulby97/glam-props/branch/master/graph/badge.svg)](https://codecov.io/gh/bulby97/glam-props)
[![npm version](https://badge.fury.io/js/glam-props.svg)](https://badge.fury.io/js/glam-props)

Simple copycat of [styled-props](https://github.com/RafalFilipek/styled-props) that allows you to set *glam props* in your [*glamorous-components*](https://github.com/paypal/glamorous) without stress. Let's take this `Button` component :

```jsx
const Button = glamorous.button(
  {
    fontSize: '1em',
    margin: '1em',
    padding: '1em',
    border: '2px solid palevioletred',
    borderRadius: '3px',
  },
  ({primary}) => primary ? { background: 'palevioletred' } : {},
  ({primary}) => ({
    color: primary ? 'white' : 'palevioletred'
  })
)

```

Now you can simply write

```jsx
<Button>Hello</Button>
<Button primary>World!</Button>
```

But your application is probably much bigger than single button. And you want to keep your colors, sizes etc. in one place. So let's create simple `styles.js` file.

```js
// styles.js

export const background = {
  primary: '#F5F5F5',
  danger: '#DD2C00',
  success: '#7CB342',
  info: '#BBDEFB',
}

export const color = {
  primary: '#263238',
  default: '#FAFAFA',
}

export const size = {
  padding: {
    small: 10,
    medium: 20,
    big: 30,
  },
  borderRadius: {
    small: 5,
    default: 10,
  },
}
```

> **IMPORTANT** It is better to use singular forms for keys. In `bind` mode keys are used to set fallbacks so `color` is better than `colors` as a prop.

`glam-props` package exports single helper method called `useGlamProps` that provide `glamProps`method.


### Installation

```
yarn add glam-props

// or

npm install glam-props
```

### Basic usage

```jsx
import useGlamProps from 'glam-props'
import glamorous from 'glamorous'
import {
  background,
  color,
  size,
} from './styles.js'

const Button = glamorous.button(
  useGlamProps(glamProps => ({
    background: glamProps(background),
    color: glamProps(color),
    padding: glamProps(size.padding),
    borderRadius: glamProps(size.borderRadius)
  })),
  {
    fontSize: '1em',
    margin: '1em',
    border: '2px solid palevioletred'
  }
)

export default () => (
  <div>
    <Button primary small>This</Button>
    <Button info medium>is</Button>
    <Button danger big>so</Button>
    <Button success medium>cool!</Button>
  </div>
)
```

As you can see each prop can be mapped into specific value for selected css rule. If you need another combination, you just add it in `styles.js`.

### Default values

Everything is based on props. As we know in React you can set `defaultProps` for each component. You can also use them to set default values for styles. For example:

```jsx
const Button = glamorous.button(
  useGlamProps(glamProps => ({
    color: glamProps(color, 'color')
  }))
)

Button.defaultProps = {
  color: 'default'
}
```

If you will not provide `primary` or `default` property for Button component `glamProps` function will check value of `color` property and use it as a key in `color` map. In our case default color is `color.white`. This is quite cool because you can also set styles the old way:

```jsx
<Button color="primary" size="big" />
```

### Bind

When your component is full of dynamic styles you can use `bindStyles` helper to simplify things.

```js
//styles.js
export default {
  color: {
    red: '#990000',
    white: '#ffffff',
    black: '#000000',
  },
  size: {
    small: 10,
    medium: 20,
    big: 30,
  }
}
```

```jsx
import styles from './styles'
import { bindStyles } from 'glam-props'

export default glamorous.button(
  bindStyles(styles)(s => ({
    color: s.color,
    padding: s.size
  }))
)
```

Each key in `s` provides `glamProps` function. Also default value is set automaticly with `key` from map.

```
s.color === glamProps(styles.color, 'color')
```

### Theme support

GlamProps also provides theme support. Just use a function instead of an object in your styles

```js
//styles.js
export default {
  color: theme => ({
    red: theme.colors.danger,
    white: '#ffffff',
    black: '#000000',
  }),
  size: theme => ({
    small: theme.sizes.small,
    medium: 20,
    big: 30,
  })
}

```
