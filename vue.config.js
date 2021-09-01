module.exports = {
  pluginOptions: {
    apollo: {
      enableMocks: false,
      enableEngine: false
    },
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },

  transpileDependencies: [
    'quasar'
  ]
}
