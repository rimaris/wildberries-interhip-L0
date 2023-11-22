class Event {
    constructor() {
        this.listeners = []
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    emit(content=null) {
        this.listeners.forEach((l) => l(content));
    }
}

export default Event;