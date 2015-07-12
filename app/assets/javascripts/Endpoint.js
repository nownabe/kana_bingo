export default {
  endpoint: location.href,
  table() { return `${this.endpoint}.json` },
  char(ch) { return `${this.endpoint}/${encodeURI(ch)}` },
}
