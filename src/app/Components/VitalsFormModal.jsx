import { useMemo, useState } from "react";
import { calcBMI, uid } from "../utils";

function VitalsFormModal({ open, onClose, title, onSave }) {
  if (!open) return null;

  const [form, setForm] = useState({
    heightCm: "",
    weightKg: "",
    respiration: "",
    temperatureF: "",
    sys: "",
    dia: "",
    spo2: "",
    glucose: "",
    hr: "",
  });

  const bmi = useMemo(
    () => calcBMI(Number(form.heightCm), Number(form.weightKg)),
    [form.heightCm, form.weightKg]
  );

  const update = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const handleSave = () => {
    const payload = {
      id: uid(),
      date: new Date().toISOString(),
      heightCm: form.heightCm ? Number(form.heightCm) : null,
      weightKg: form.weightKg ? Number(form.weightKg) : null,
      respiration: form.respiration ? Number(form.respiration) : null,
      temperatureF: form.temperatureF ? Number(form.temperatureF) : null,
      sys: form.sys ? Number(form.sys) : null,
      dia: form.dia ? Number(form.dia) : null,
      spo2: form.spo2 ? Number(form.spo2) : null,
      glucose: form.glucose ? Number(form.glucose) : null,
      hr: form.hr ? Number(form.hr) : null,
    };
    onSave(payload);
    setForm({
      heightCm: form.heightCm,
      weightKg: form.weightKg,
      respiration: "",
      temperatureF: "",
      sys: "",
      dia: "",
      spo2: "",
      glucose: "",
      hr: "",
    });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center pt-20 text-black">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-11/12 md:w-3/4 lg:w-2/3 max-h-[80vh] overflow-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Height (cm)
              </label>
              <input
                value={form.heightCm}
                onChange={(e) => update("heightCm", e.target.value)}
                className="mt-1 block w-full border rounded p-2"
                placeholder="e.g. 175"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Weight (kg)
              </label>
              <input
                value={form.weightKg}
                onChange={(e) => update("weightKg", e.target.value)}
                className="mt-1 block w-full border rounded p-2"
                placeholder="e.g. 75"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Temperature (°F)
              </label>
              <input
                value={form.temperatureF}
                onChange={(e) => update("temperatureF", e.target.value)}
                className="mt-1 block w-full border rounded p-2"
                placeholder="e.g. 98.6"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Respiration (breaths/min)
              </label>
              <input
                value={form.respiration}
                onChange={(e) => update("respiration", e.target.value)}
                className="mt-1 block w-full border rounded p-2"
                placeholder="e.g. 16"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Blood Pressure SYS
              </label>
              <input
                value={form.sys}
                onChange={(e) => update("sys", e.target.value)}
                className="mt-1 block w-full border rounded p-2"
                placeholder="e.g. 120"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Blood Pressure DIA
              </label>
              <input
                value={form.dia}
                onChange={(e) => update("dia", e.target.value)}
                className="mt-1 block w-full border rounded p-2"
                placeholder="e.g. 80"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                SpO₂ (%)
              </label>
              <input
                value={form.spo2}
                onChange={(e) => update("spo2", e.target.value)}
                className="mt-1 block w-full border rounded p-2"
                placeholder="e.g. 97"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Heart Rate (BPM)
              </label>
              <input
                value={form.hr}
                onChange={(e) => update("hr", e.target.value)}
                className="mt-1 block w-full border rounded p-2"
                placeholder="e.g. 72"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Blood Glucose (mg/dL)
              </label>
              <input
                value={form.glucose}
                onChange={(e) => update("glucose", e.target.value)}
                className="mt-1 block w-full border rounded p-2"
                placeholder="e.g. 100"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm">
              BMI: <strong>{bmi ?? "—"}</strong>
            </div>
            <div className="space-x-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VitalsFormModal;
