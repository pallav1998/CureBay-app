import { calcBMI } from "../utils";

function VitalsOverview({ latest }) {
  if (!latest) return null;
  const bmi = calcBMI(latest.heightCm, latest.weightKg);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="p-4 bg-white rounded shadow">
        <div className="text-sm text-gray-500">Pulse</div>
        <div className="text-2xl font-bold text-black">
          {latest.hr ?? "—"} BPM
        </div>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <div className="text-sm text-gray-500">Weight</div>
        <div className="text-2xl font-bold text-black">
          {latest.weightKg ?? "—"} kg
        </div>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <div className="text-sm text-gray-500">Oxy Level</div>
        <div className="text-2xl font-bold text-black">
          {latest.spo2 ?? "—"}%
        </div>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <div className="text-sm text-gray-500">BMI</div>
        <div className="text-2xl font-bold text-black">{bmi ?? "—"}</div>
      </div>
    </div>
  );
}

export default VitalsOverview;
