class LocalCache {
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  getCache(key: string) {
    // obj => string =>obj
    const value = window.localStorage.getItem(key)
    if (value) {
      try {
        return JSON.parse(value)
      } catch (e) {
        return ''
      }
    }
  }

  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }
}

export default new LocalCache()
