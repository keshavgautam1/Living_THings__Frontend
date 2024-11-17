import React, { useEffect, useState } from "react";
import { getChartLogs } from "../services/api";

const LogsTable = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getChartLogs();
        setLogs(
          data.sort((a, b) => new Date(a.access_time) - new Date(b.access_time))
        );
      } catch (error) {
        alert(error.response?.data?.message || "Failed to fetch logs");
      }
    };

    fetchLogs();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Access Time</th>
          <th>Access Date</th>
          <th>Employee Name</th>
          <th>Algo Status</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log._id}>
            <td>{log.access_time}</td>
            <td>{log.access_date}</td>
            <td>{log.employee_name}</td>
            <td>{log.algo_status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LogsTable;
