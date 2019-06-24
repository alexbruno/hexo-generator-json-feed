const external = ['hexo-util']

 export default [{
  external,
  input: 'src/module.js',
  output: {
    format: 'esm',
    file: 'dist/module.js'
  }
}, {
  external,
  input: 'src/module.js',
  output: {
    format: 'cjs',
    file: 'dist/main.js'
  }
}]
