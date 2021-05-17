
function randomPath(length) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let path = ''
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * chars.length)
    path += chars[index]
  }
  return path
}

module.exports = randomPath