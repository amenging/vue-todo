export default function (context) {
  context.userAgent = process.server ? context.req.headers['user-agent'] : window.navigator.userAgent
}
