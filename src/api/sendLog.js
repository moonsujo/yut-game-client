import axios from 'axios';
import { ENABLE_LOGGING } from '../config/env';

/**
 * Sends a log event to the analytics API
 * Only sends logs in production environment
 * @param {string} eventName - Name of the event to log
 * @param {object} payload - Event data to log
 * @returns {Promise} - Axios response or null if not in production
 */
export async function sendLog(eventName, payload = {}) {
  if (!ENABLE_LOGGING) {
    console.log('[DEV] Log skipped:', eventName, payload);
    return null;
  }

  try {
    const response = await axios.post(
      'https://yqpd9l2hjh.execute-api.us-west-2.amazonaws.com/dev/sendLog',
      {
        eventName,
        timestamp: new Date(),
        payload
      }
    );
    return response;
  } catch (error) {
    console.error('Error sending log:', error);
    return null;
  }
}
