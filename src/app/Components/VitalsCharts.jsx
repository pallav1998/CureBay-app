import dayjs from "dayjs";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { calcBMI } from "../utils";

function VitalsCharts({ data, filterRange }) {
  const dayMap = {};
  data.forEach((d) => {
    const day = dayjs(d.date).format("YYYY-MM-DD");
    if (!dayMap[day]) dayMap[day] = [];
    dayMap[day].push(d);
  });
  const points = Object.keys(dayMap)
    .sort()
    .map((day) => {
      const entries = dayMap[day];
      // average for day
      const avg = (k) => {
        const vals = entries
          .map((e) => e[k])
          .filter((v) => typeof v === "number");
        if (!vals.length) return null;
        return (
          Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10
        );
      };
      return {
        date: day,
        sys: avg("sys"),
        dia: avg("dia"),
        hr: avg("hr"),
        spo2: avg("spo2"),
        bmi:
          avg("weightKg") && avg("heightCm")
            ? calcBMI(avg("heightCm"), avg("weightKg"))
            : null,
      };
    });

  // filter by date range
  const filtered = points.filter((p) => {
    if (!filterRange) return true;
    const d = dayjs(p.date);
    return (
      d.isAfter(filterRange.start.subtract(1, "day")) &&
      d.isBefore(filterRange.end.add(1, "day"))
    );
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <div className="p-4 bg-white rounded shadow h-80">
        <h4 className="mb-2 font-semibold text-black">
          Blood Pressure (SYS & DIA)
        </h4>
        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={filtered}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sys" stroke="#F97316" />
            <Line type="monotone" dataKey="dia" stroke="#2563EB" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 bg-white rounded shadow h-80">
        <h4 className="mb-2 font-semibold text-black">Heart Rate (BPM)</h4>
        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={filtered}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="hr" stroke="#EF4444" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 bg-white rounded shadow h-80">
        <h4 className="mb-2 font-semibold text-black">SpO₂ (%)</h4>
        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={filtered}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="spo2" stroke="#10B981" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 bg-white rounded shadow h-80">
        <h4 className="mb-2 font-semibold text-black">BMI</h4>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={filtered}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="bmi" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default VitalsCharts;
