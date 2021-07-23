import Stats from 'stats.js'

const stats = new Stats()
stats.dom.style.left = 'auto'
stats.dom.style.right = '0'
document.body.appendChild(stats.dom)

export default stats
