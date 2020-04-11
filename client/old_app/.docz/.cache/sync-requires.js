const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/home/publisher/Development/Go/src/Aurora/client/app/.docz/.cache/dev-404-page.js"))),
  "component---readme-md": hot(preferDefault(require("/home/publisher/Development/Go/src/Aurora/client/app/README.md"))),
  "component---public-ios-readme-md": hot(preferDefault(require("/home/publisher/Development/Go/src/Aurora/client/app/public/ios/README.md"))),
  "component---src-app-components-generator-generator-mdx": hot(preferDefault(require("/home/publisher/Development/Go/src/Aurora/client/app/src/app/components/generator/generator.mdx"))),
  "component---src-pages-404-js": hot(preferDefault(require("/home/publisher/Development/Go/src/Aurora/client/app/.docz/src/pages/404.js")))
}

