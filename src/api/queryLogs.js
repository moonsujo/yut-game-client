import axios from 'axios';
import { IS_DEV } from '../config/env';

/**
 * Queries logs from the analytics API
 * Only queries logs in development environment
 * @param {string} from - Start date for query
 * @param {string} to - End date for query
 * @param {string} eventName - Event name to filter by
 * @param {object} payload - Additional query parameters
 * @returns {Promise} - Axios response or mock data if not in development
 */
export async function queryLogs(from, to, eventName, payload = {}) {
  if (!IS_DEV) {
    console.log('[PROD] Query logs skipped in production');
    return { data: { results: [] } };
  }

  try {
    const response = await axios.post(
      'https://yqpd9l2hjh.execute-api.us-west-2.amazonaws.com/dev/queryLogs',
      {
        from,
        to,
        eventName,
        payload
      }
    );
    return response;
  } catch (error) {
    console.error('Error querying logs:', error);
    return { data: { results: [] } };
  }
}
