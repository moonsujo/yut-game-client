import { useEffect, useState, useMemo } from 'react';
import { queryLogs } from '../api';

export default function useQueryLogs({ eventName, payload }) {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(false)
  
  // Stringify payload to avoid re-running on object reference changes
  const payloadString = useMemo(() => JSON.stringify(payload), [payload]);

  useEffect(() => {
    const fetchLogs = async () => {
      
      setLoading(true)
      const now = new Date();
      // const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      // 9:07PM 10/26/2025 Sunday
      const before = 1761538033464

      const response = await queryLogs(before, now, eventName, JSON.parse(payloadString));

      if (response && response.data && response.data.results) {
        setLogs(response.data.results);
      }
      setLoading(false);
    }

    fetchLogs()
  }, [eventName, payloadString])

  return [logs, loading]
}