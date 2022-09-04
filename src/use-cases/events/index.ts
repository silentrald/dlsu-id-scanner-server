import buildAddEventUseCase from './add-event';
import eventDb from '@db/events';
import logger from '@interfaces/logger';

/**
 * Adds an event to the database
 */
export const addEvent = buildAddEventUseCase({ eventDb, logger });

export default Object.freeze({
  addEvent,
});

