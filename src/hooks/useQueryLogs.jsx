import { useEffect, useState, useMemo } from 'react';
import { queryLogs } from '../api';

export default function useQueryLogs({ eventName, payload }) {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(false)
  
  // Stringify payload to avoid re-running on object reference changes
  const payloadString = useMemo(() => JSON.stringify(payload), [payload]);

  useEffect(() => {
    const fetchLogs = async () => {
      // Skip querying on localhost to avoid API errors
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      if (isLocalhost) {
        console.log('[useQueryLogs] Skipped on localhost');
        setLoading(false);
        return;
      }
      
      setLoading(true)
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      
      const response = await queryLogs(weekAgo, now, eventName, JSON.parse(payloadString));
      
      if (response && response.data && response.data.results) {
        setLogs(response.data.results);
      }
      setLoading(false);
    }

    fetchLogs()
  }, [eventName, payloadString])

  return [logs, loading]
}