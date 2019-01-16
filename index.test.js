var postcss = require('postcss')

var vars = require('./')

function run (input, output, opts) {
  return postcss([vars(opts)]).process(input, { from: '/test.css' })
    .then(function (result) {
      expect(result.css).toEqual(output)
      expect(result.warnings()).toHaveLength(0)
      return result
    })
}

it('replaces :export for :root', function () {
  run(
    ':root { --color: black; } .test { background-color: var(--color); }',
    ':root { --color: black; } .test { background-color: black; }'
  )
})
