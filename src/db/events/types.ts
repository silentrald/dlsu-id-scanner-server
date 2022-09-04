import { EventEntity } from '@entities/events/types';

export interface EventDb {

  /**
   * Gets an event
   *
   * @param {any} params
   */
  // getEvent: (params: any) => Promise<EventEntity>;

  /**
   * Checks if the event exists
   *
   * @param {string} id
   * @returns {Promise<boolean>}
   */
  existsEvent: (id: string) => Promise<boolean>;

  /**
   * Gets a list of events
   *
   * @param {any} params
   */
  // getEvents: (params: any) => Promise<Partial<Event>[]>;

  /**
   * Adds an event into the database
   *
   * @param {EventEntity} event
   * @returns {Promise<string>} id of the created event
   */
  addEvent: (event: EventEntity) => Promise<string>;
}
