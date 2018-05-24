window.getComputedStyleOrg = window.getComputedStyle
window.getComputedStyle = (node) => {
  const styles = window.getComputedStyleOrg(node)
  return Object.assign(styles, {
    transitionDelay: '',
    animationDelay: '',
    transitionDuration: '',
    animationDuration: '',
  })
}
// jest.mock('src/router/index', () => require('src/router/_mocks_/index'))
