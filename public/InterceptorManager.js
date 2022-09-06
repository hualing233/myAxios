class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  use(fullfield, rejected) {
    this.handlers.push({
      fullfield: fullfield,
      rejected: rejected
    })
    return this.handlers.length - 1;
  }

  eject(id) {
    if(this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
}

export default InterceptorManager;