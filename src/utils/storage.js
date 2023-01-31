// 本地存储

export function setItem (name, value) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}
export function getItem (name) {
  const value = window.localStorage.getItem(name)
  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}
export function removeItem (name) {
  window.localStorage.removeItem(name)
}
