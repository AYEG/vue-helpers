export default ({ Vue }) => {
  Vue.filter('fullName', function(user) {
    return (user.first_name + ' ' + user.preposition).trim() + ' ' + user.surname
  })
}
