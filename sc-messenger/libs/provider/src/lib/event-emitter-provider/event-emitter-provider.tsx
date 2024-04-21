import React, { createContext, useContext, ReactNode } from 'react';
import {EventEmitter} from "../event-emitter/event-emitter";

// Create a context for the event emitter
const EventEmitterContext = createContext<EventEmitter | undefined>(undefined);

// Create a custom hook to access the event emitter context
export function useEventEmitter() {
  const eventEmitter = useContext(EventEmitterContext);
  if (!eventEmitter) {
    throw new Error('useEventEmitter must be used within an EventEmitterProvider');
  }
  return eventEmitter;
}

// Create a provider component to wrap your app with
export function EventEmitterProvider({ children }: { children: ReactNode }) {
  const eventEmitter = new EventEmitter(); // Create your custom EventEmitter class

  return (
    <EventEmitterContext.Provider value={eventEmitter}>
      {children}
    </EventEmitterContext.Provider>
  );
}
