// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---cache-dev-404-page-js": () => import("./dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---readme-md": () => import("./../../README.md" /* webpackChunkName: "component---readme-md" */),
  "component---public-ios-readme-md": () => import("./../../public/ios/README.md" /* webpackChunkName: "component---public-ios-readme-md" */),
  "component---src-app-components-generator-generator-mdx": () => import("./../../src/app/components/generator/generator.mdx" /* webpackChunkName: "component---src-app-components-generator-generator-mdx" */),
  "component---src-pages-404-js": () => import("./../src/pages/404.js" /* webpackChunkName: "component---src-pages-404-js" */)
}

