import { useState } from 'react';
import axios from 'axios';

export default function useQueryLogs() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(false)

  const queryLogs = async () => {
    setLoading(true)
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const response = await axios.get('https://yqpd9l2hjh.execute-api.us-west-2.amazonaws.com/dev/queryLogs', {
      from: weekAgo,
      to: now
    })
    setLogs(response.data.results);
    setLoading(false);
  }

  return [queryLogs]
}

