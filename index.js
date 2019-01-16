var postcss = require('postcss')
var variables = []

module.exports = postcss.plugin('postcss-vars', function () {
  return function (root) {
    var extractVariables = function (value) {
      value = value.split(' ')
      return Object.keys(value).map(function (index) {
        if (value[index].replace(/var\((.*?)\)/g, '$1').indexOf('--') !== -1) {
          var quickClean = value[index].replace(/var\((.*?)\)/g, '$1')
          quickClean = quickClean.replace(/,/g, '')
          if (quickClean.split('(').length > 1) {
            return quickClean.split('(')[1]
          }
          return quickClean
        }
        return false
      }).filter(function (n) { return n })
    }

    // First, build list of variables
    root.walkRules(':root', function (rule) {
      rule.walkDecls(function (decl) {
        if (decl.prop.indexOf('--') !== -1) {
          variables[decl.prop] = decl.value
        }
      })
    })

    Object.keys(variables).map(function (index) {
      var reverseLookupVariable = extractVariables(variables[index])
      if (reverseLookupVariable.length) {
        var reverseLookupValue = variables[reverseLookupVariable]
        variables[index] = variables[index].replace(
          'var(' + reverseLookupVariable + ')',
          reverseLookupValue
        )
      }
    })

    root.walkRules(function (rule) {
      rule.walkDecls(function (decl) {
        Object.keys(variables).map(function (index) {
          if (decl.value.indexOf('var(' + index + ')') !== -1) {
            decl.value = decl.value.replace(
              'var(' + index + ')',
              variables[index]
            )
          }
        })
      })
    })
  }
})
