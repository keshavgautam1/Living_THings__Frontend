import React, { useEffect, useState } from "react";
import Chart from "../components/Chart";
import ChartLogForm from "../components/ChartLogForm";
import LogsTable from "../components/LogsTable";
import Loader from "../components/Loader";
import { getFilteredChartData } from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ setAuthenticated }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false); // Track form submission state
  const navigate = useNavigate();

  // Fetch filtered data based on form submission
  const fetchFilteredData = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await getFilteredChartData({
        startDate,
        endDate,
        algo_status: "ON",
      });
      setData(response);
      sessionStorage.setItem("chartData", JSON.stringify(response)); // Store in sessionStorage
    } catch (error) {
      setError("Failed to fetch chart data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    setAuthenticated(false);
    navigate("/login");
    alert("You have been logged out!");
  };

  useEffect(() => {
    const savedData = sessionStorage.getItem("chartData");
    if (savedData) {
      setData(JSON.parse(savedData)); // Load saved data from sessionStorage
    }
  }, []);

  // Fetch filtered data when form is successfully submitted
  useEffect(() => {
    if (formSubmitted) {
      fetchFilteredData();
    }
  }, [formSubmitted, startDate, endDate]); // Run when form is submitted or date changes

  return (
    <div>
      {isLoading && <Loader />}
      <h1>Dashboard</h1>
      <button onClick={handleLogout} style={{ float: "right", margin: "10px" }}>
        Logout
      </button>
      {error && <p className="error">{error}</p>}

      {/* Render chart log form */}
      <ChartLogForm
        setChartData={(data) => {
          setData(data);
          sessionStorage.setItem("chartData", JSON.stringify(data)); // Save chart data to sessionStorage
        }}
        setFormSubmitted={(submitted) => {
          setFormSubmitted(submitted);
          sessionStorage.setItem("formSubmitted", submitted); // Save form submission state
          sessionStorage.setItem("startDate", startDate); // Save start date
          sessionStorage.setItem("endDate", endDate); // Save end date
        }} // Save form submission state
      />

      <div style={{ marginTop: "20px" }}>
        <h3>Chart</h3>
        <Chart data={data} />
      </div>

      <LogsTable />
    </div>
  );
};

export default Dashboard;
