class Queue {
  constructor() {
    this.items = []
  }

  enqueue(item) {
    this.items.push(item)
  }

  dequeue() {
    if (this.isEmpty()) return 'fila vazia'
    return this.items.pop()
  }

  isEmpty() {
    return this.items.length === 0
  }

  getQueue() {
    // console.log(this.items);
    return this.items
  }

  size() {
    return this.items.length
  }

  lastItemIndex() {
    return this.size() > 0 ? this.size() - 1 : this.size()
  }

  print() {
    // console.log(this.getQueue())
  }
}