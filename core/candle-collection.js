class CandleCollection {
  constructor () {
    console.log('new CandleCollection');
    this.data = {}
    this.indexes = {}

  }

  push (id, data) {
    if (!this.data.hasOwnProperty(id)) {
      this.data[id] = []
    }
    this.data[id] = this.data[id].concat(data)
  }

  next () {
    const ids = Object.keys(this.data)
    let date = null
    let selectedId = null

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i]
      if (!this.indexes.hasOwnProperty(id)) {
        this.indexes[id] = 0
      }
      if (!this.data[id][this.indexes[id]]) {
        continue
      }
      if (isNaN(this.data[id][this.indexes[id]].date)) {
        continue
      }
      if (!date || date > this.data[id][this.indexes[id]].date) {
        date = this.data[id][this.indexes[id]].date
        selectedId = id
        continue
      }
    }

    if (!date || !selectedId) {
      return null
    }

    const index = this.indexes[selectedId]
    this.indexes[selectedId] = this.indexes[selectedId] + 1
    return { id: selectedId, data: this.data[selectedId][index] }
  }
}
module.exports = CandleCollection
