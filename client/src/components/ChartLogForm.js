// import React, { useState, useEffect } from "react";
// import { logChartAccess, getFilteredChartData } from "../services/api";

// const ChartLogForm = ({ setChartData, filteredDates }) => {
//   const [accessTime, setAccessTime] = useState("");
//   const [accessDate, setAccessDate] = useState("");
//   const [employeeName, setEmployeeName] = useState("");
//   const [algoStatus, setAlgoStatus] = useState("ON");

//   // Set current date and time when component mounts
//   useEffect(() => {
//     const currentDate = new Date();
//     const formattedDate = currentDate.toISOString().split("T")[0]; // 'YYYY-MM-DD'
//     const formattedTime = currentDate.toISOString().split("T")[1].split(".")[0]; // 'HH:MM:SS'

//     setAccessDate(formattedDate);
//     setAccessTime(formattedTime);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const logData = {
//       access_time: accessTime,
//       access_date: accessDate,
//       employee_name: employeeName,
//       algo_status: algoStatus,
//     };

//     try {
//       // Save log data
//       await logChartAccess(logData);
//       alert("Log saved successfully");

//       // Fetch filtered chart data using filteredDates passed from parent
//       const chartData = await getFilteredChartData({
//         startDate: filteredDates.startDate,
//         endDate: filteredDates.endDate,
//         algo_status: algoStatus,
//       });
//       setChartData(chartData); // Update chart data in the parent component
//     } catch (error) {
//       console.error("Error submitting log or fetching chart data:", error);
//       alert(
//         error.response?.data?.message ||
//           "Failed to log chart access or fetch data"
//       );
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Employee Name:
//         <input
//           type="text"
//           value={employeeName}
//           onChange={(e) => setEmployeeName(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Energy Saving Mode:
//         <select
//           value={algoStatus}
//           onChange={(e) => setAlgoStatus(e.target.value)}
//         >
//           <option value="ON">ON</option>
//           <option value="OFF">OFF</option>
//         </select>
//       </label>
//       <br />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default ChartLogForm;

// import React, { useState } from "react";
// import { logChartAccess, getFilteredChartData } from "../services/api";

// const ChartLogForm = ({ setChartData }) => {
//   const [accessTime, setAccessTime] = useState("");
//   const [accessDate, setAccessDate] = useState("");
//   const [employeeName, setEmployeeName] = useState("");
//   const [algoStatus, setAlgoStatus] = useState("ON"); // Default to "ON"
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [formSubmitted, setFormSubmitted] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Log data, including access time, access date, and employee name
//     const logData = {
//       access_time: accessTime,
//       access_date: accessDate,
//       employee_name: employeeName,
//       algo_status: algoStatus,
//     };

//     try {
//       // Save log data to the backend
//       await logChartAccess(logData);
//       alert("Log saved successfully");

//       // Mark form as submitted
//       setFormSubmitted(true);

//       // Fetch filtered chart data based on form parameters (including algo_status, startDate, endDate)
//       const chartData = await getFilteredChartData({
//         startDate,
//         endDate,
//         algo_status: algoStatus, // Pass the algo_status ("ON" or "OFF")
//       });

//       // Update the chart data in the parent component
//       setChartData(chartData);
//     } catch (error) {
//       console.error("Error submitting log or fetching chart data:", error);
//       alert(
//         error.response?.data?.message ||
//           "Failed to log chart access or fetch data"
//       );
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Access Time:
//         <input
//           type="time"
//           value={accessTime}
//           onChange={(e) => setAccessTime(e.target.value)}
//         />
//       </label>
//       <label>
//         Access Date:
//         <input
//           type="date"
//           value={accessDate}
//           onChange={(e) => setAccessDate(e.target.value)}
//         />
//       </label>
//       <label>
//         Employee Name:
//         <input
//           type="text"
//           value={employeeName}
//           onChange={(e) => setEmployeeName(e.target.value)}
//         />
//       </label>
//       <label>
//         Energy Saving Mode:
//         <select
//           value={algoStatus}
//           onChange={(e) => setAlgoStatus(e.target.value)}
//         >
//           <option value="ON">ON</option>
//           <option value="OFF">OFF</option>
//         </select>
//       </label>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default ChartLogForm;

// import React, { useState, useEffect } from "react";
// import { logChartAccess, getFilteredChartData } from "../services/api";

// const ChartLogForm = ({ setChartData }) => {
//   const [accessTime, setAccessTime] = useState("");
//   const [accessDate, setAccessDate] = useState("");
//   const [employeeName, setEmployeeName] = useState("");
//   const [algoStatus, setAlgoStatus] = useState("ON"); // Default to "ON"
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [formSubmitted, setFormSubmitted] = useState(false);

//   // Set default values for accessDate and accessTime on load
//   useEffect(() => {
//     const currentDate = new Date();
//     const formattedDate = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD
//     const formattedTime = currentDate.toTimeString().split(" ")[0]; // HH:MM:SS

//     setAccessDate(formattedDate);
//     setAccessTime(formattedTime);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!employeeName || !startDate || !endDate) {
//       alert("Please fill all the required fields.");
//       return;
//     }

//     // Log data, including access time, access date, and employee name
//     const logData = {
//       access_time: accessTime,
//       access_date: accessDate,
//       employee_name: employeeName,
//       algo_status: algoStatus,
//     };

//     try {
//       // Save log data to the backend
//       await logChartAccess(logData);
//       alert("Log saved successfully");

//       // Mark form as submitted
//       setFormSubmitted(true);

//       // Fetch filtered chart data based on form parameters (including algo_status, startDate, endDate)
//       const chartData = await getFilteredChartData({
//         startDate,
//         endDate,
//         algo_status: algoStatus, // Pass the algo_status ("ON" or "OFF")
//       });

//       // Update the chart data in the parent component
//       setChartData(chartData);
//     } catch (error) {
//       console.error("Error submitting log or fetching chart data:", error);
//       alert(
//         error.response?.data?.message ||
//           "Failed to log chart access or fetch data"
//       );
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Access Time:
//         <input type="time" value={accessTime} readOnly />
//       </label>
//       <label>
//         Access Date:
//         <input type="date" value={accessDate} readOnly />
//       </label>
//       <label>
//         Employee Name:
//         <input
//           type="text"
//           value={employeeName}
//           onChange={(e) => setEmployeeName(e.target.value)}
//           required
//         />
//       </label>

//       <label>
//         Energy Saving Mode:
//         <select
//           value={algoStatus}
//           onChange={(e) => setAlgoStatus(e.target.value)}
//         >
//           <option value="ON">ON</option>
//           <option value="OFF">OFF</option>
//         </select>
//       </label>
//       <button type="submit" disabled={formSubmitted}>
//         Submit
//       </button>
//     </form>
//   );
// };

// export default ChartLogForm;

// import React, { useState, useEffect } from "react";
// import { logChartAccess, getFilteredChartData } from "../services/api";

// const ChartLogForm = ({ setChartData, setFormSubmitted }) => {
//   const [accessTime, setAccessTime] = useState("");
//   const [accessDate, setAccessDate] = useState("");
//   const [employeeName, setEmployeeName] = useState("");
//   const [algoStatus, setAlgoStatus] = useState("ON"); // Default to "ON"
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [formSubmitted, setLocalFormSubmitted] = useState(false);

//   // Set default values for accessDate and accessTime on load
//   useEffect(() => {
//     const currentDate = new Date();
//     const formattedDate = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD
//     const formattedTime = currentDate.toTimeString().split(" ")[0]; // HH:MM:SS

//     setAccessDate(formattedDate);
//     setAccessTime(formattedTime);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!employeeName || !startDate || !endDate) {
//       alert("Please fill all the required fields.");
//       return;
//     }

//     // Log data, including access time, access date, and employee name
//     const logData = {
//       access_time: accessTime,
//       access_date: accessDate,
//       employee_name: employeeName,
//       algo_status: algoStatus,
//     };

//     try {
//       // Save log data to the backend
//       await logChartAccess(logData);
//       alert("Log saved successfully");

//       // Mark form as submitted locally
//       setLocalFormSubmitted(true);
//       setFormSubmitted(true); // Notify parent component that form has been submitted

//       // Fetch filtered chart data based on form parameters (including algo_status, startDate, endDate)
//       const chartData = await getFilteredChartData({
//         startDate,
//         endDate,
//         algo_status: algoStatus, // Pass the algo_status ("ON" or "OFF")
//       });

//       // Update the chart data in the parent component
//       setChartData(chartData);
//     } catch (error) {
//       console.error("Error submitting log or fetching chart data:", error);
//       alert(
//         error.response?.data?.message ||
//           "Failed to log chart access or fetch data"
//       );
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Access Time:
//         <input type="time" value={accessTime} readOnly />
//       </label>
//       <label>
//         Access Date:
//         <input type="date" value={accessDate} readOnly />
//       </label>
//       <label>
//         Employee Name:
//         <input
//           type="text"
//           value={employeeName}
//           onChange={(e) => setEmployeeName(e.target.value)}
//           required
//         />
//       </label>

//       <label>
//         Energy Saving Mode:
//         <select
//           value={algoStatus}
//           onChange={(e) => setAlgoStatus(e.target.value)}
//         >
//           <option value="ON">ON</option>
//           <option value="OFF">OFF</option>
//         </select>
//       </label>

//       <button type="submit" disabled={formSubmitted}>
//         Submit
//       </button>
//     </form>
//   );
// };

// export default ChartLogForm;

import React, { useState, useEffect } from "react";
import { logChartAccess, getFilteredChartData } from "../services/api";

const ChartLogForm = ({ setChartData, setFormSubmitted }) => {
  const [accessTime, setAccessTime] = useState("");
  const [accessDate, setAccessDate] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [algoStatus, setAlgoStatus] = useState("ON"); // Default to "ON"
  const [startDate, setStartDate] = useState(""); // Start Date
  const [endDate, setEndDate] = useState(""); // End Date
  const [formSubmitted, setLocalFormSubmitted] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD
    const formattedTime = currentDate.toTimeString().split(" ")[0]; // HH:MM:SS

    setAccessDate(formattedDate);
    setAccessTime(formattedTime);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employeeName || !startDate || !endDate) {
      alert("Please fill all the required fields.");
      return;
    }

    const logData = {
      access_time: accessTime,
      access_date: accessDate,
      employee_name: employeeName,
      algo_status: algoStatus,
    };

    try {
      await logChartAccess(logData);
      alert("Log saved successfully");

      setLocalFormSubmitted(true);
      setFormSubmitted(true);

      const chartData = await getFilteredChartData({
        startDate,
        endDate,
        algo_status: algoStatus,
      });

      // Update the chart data in the parent component
      setChartData(chartData);
      // Store form data in sessionStorage
      sessionStorage.setItem("formSubmitted", "true");
      sessionStorage.setItem("startDate", startDate);
      sessionStorage.setItem("endDate", endDate);
    } catch (error) {
      console.error("Error submitting log or fetching chart data:", error);
      alert(
        error.response?.data?.message ||
          "Failed to log chart access or fetch data"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Access Time:
        <input type="time" value={accessTime} readOnly />
      </label>
      <label>
        Access Date:
        <input type="date" value={accessDate} readOnly />
      </label>
      <label>
        Employee Name:
        <input
          type="text"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          required
        />
      </label>

      <label>
        Energy Saving Mode:
        <select
          value={algoStatus}
          onChange={(e) => setAlgoStatus(e.target.value)}
        >
          <option value="ON">ON</option>
          <option value="OFF">OFF</option>
        </select>
      </label>

      {/* Date Filter directly embedded */}
      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </label>

      <button type="submit" disabled={formSubmitted}>
        Submit
      </button>
    </form>
  );
};

export default ChartLogForm;
