import eslintPlugin from 'vite-plugin-eslint'

export default function createEslintPlugin() {
  const config = {
    fix: false,
    include: ['src/**/*.vue', 'src/**/*.js']
  }
  return eslintPlugin(config)
}
