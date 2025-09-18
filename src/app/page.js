"use client";

import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";

import VitalsCharts from "./Components/VitalsCharts";
import VitalsOverview from "./Components/VitalsOverview";
import HistoryList from "./Components/HistoryList";
import AlertsList from "./Components/AlertsList";
import VitalsFormModal from "./Components/VitalsFormModal";
import {
  defaultMockData,
  detectAnomalies,
  loadFromStorage,
  saveToStorage,
  uid,
} from "./utils";

export default function Home() {
  const [data, setData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [filterRange, setFilterRange] = useState({
    start: dayjs().subtract(30, "day"),
    end: dayjs(),
  });

  useEffect(() => {
    setData(loadFromStorage());
  }, []);

  useEffect(() => {
    if (data) saveToStorage(data);
  }, [data]);

  const latest = useMemo(
    () => (data && data.length ? data[data.length - 1] : null),
    [data]
  );

  const handleSave = (entry) => {
    setData((d) => [...(d || []), entry]);
    const newAlerts = detectAnomalies(entry);
    setAlerts(newAlerts);
    setModalOpen(false);
  };

  const handleDateFilterChange = (range) => {
    setFilterRange(range);
  };

  const clearAlerts = () => setAlerts([]);

  if (data === null) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 text-black">
        <div className="max-w-7xl mx-auto">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-black">
              Health Vitals Dashboard
            </h1>
            <div className="h-9 w-48 bg-gray-200 rounded" />
          </header>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="h-24 bg-gray-200 rounded" />
            <div className="h-24 bg-gray-200 rounded" />
            <div className="h-24 bg-gray-200 rounded" />
            <div className="h-24 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-black">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-black">
            Health Vitals Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <label className="text-sm text-gray-600">Choose Date Range</label>
            <select
              onChange={(e) => {
                const val = e.target.value;
                if (val === "7")
                  handleDateFilterChange({
                    start: dayjs().subtract(7, "day"),
                    end: dayjs(),
                  });
                if (val === "30")
                  handleDateFilterChange({
                    start: dayjs().subtract(30, "day"),
                    end: dayjs(),
                  });
                if (val === "90")
                  handleDateFilterChange({
                    start: dayjs().subtract(90, "day"),
                    end: dayjs(),
                  });
                if (val === "all") handleDateFilterChange(null);
              }}
              className="border rounded p-2 text-black"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="all">All</option>
            </select>
          </div>
        </header>

        <section className="mb-6">
          <VitalsOverview latest={latest} />
        </section>

        <section className="mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Charts</h3>
            <div className="text-sm text-gray-500">
              Range:{" "}
              {filterRange
                ? `${filterRange.start.format(
                    "DD MMM"
                  )} — ${filterRange.end.format("DD MMM")}`
                : "All"}
            </div>
          </div>
          <VitalsCharts data={data || []} filterRange={filterRange} />
        </section>

        <section className="mb-6 text-black">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">History</h3>
            <div>
              <button
                className="px-3 py-1 border rounded mr-2"
                onClick={() => {
                  setData(defaultMockData);
                }}
              >
                Reset Demo Data
              </button>
              <button
                className="px-3 py-1 border rounded"
                onClick={() => {
                  setData([]);
                }}
              >
                Clear All
              </button>
            </div>
          </div>
          <HistoryList data={data || []} />
        </section>

        <AlertsList alerts={alerts} clearAlerts={clearAlerts} />
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className="fixed right-6 bottom-6 z-50 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg"
        title="Add Vitals"
      >
        <span className="text-2xl">+</span>
      </button>

      <VitalsFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New Vitals"
        onSave={handleSave}
      />
    </div>
  );
}
