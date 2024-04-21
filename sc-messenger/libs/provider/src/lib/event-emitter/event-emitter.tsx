import {createContext, useContext} from "react";

export class EventEmitter {
  private listeners: { [eventName: string]: ((...args: any[]) => void)[] } = {};

  subscribe(eventName: string, listener: (...args: any[]) => void) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(listener);
  }

  unsubscribe(eventName: string, listener: (...args: any[]) => void) {
    const eventListeners = this.listeners[eventName];
    if (eventListeners) {
      this.listeners[eventName] = eventListeners.filter(l => l !== listener);
    }
  }

  emit(eventName: string, ...args: any[]) {
    const eventListeners = this.listeners[eventName];
    if (eventListeners) {
      eventListeners.forEach(listener => listener(...args));
    }
  }
}
