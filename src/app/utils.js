import dayjs from "dayjs";

export const uid = () => Math.random().toString(36).slice(2, 9);

export const defaultMockData = [
  {
    id: uid(),
    date: dayjs().subtract(7, "day").toISOString(),
    heightCm: 175,
    weightKg: 78,
    respiration: 16,
    temperatureF: 98.6,
    sys: 118,
    dia: 78,
    spo2: 97,
    glucose: 95,
    hr: 72,
  },
  {
    id: uid(),
    date: dayjs().subtract(3, "day").toISOString(),
    heightCm: 175,
    weightKg: 79,
    respiration: 18,
    temperatureF: 99.1,
    sys: 122,
    dia: 80,
    spo2: 96,
    glucose: 100,
    hr: 88,
  },
  {
    id: uid(),
    date: dayjs().subtract(1, "day").toISOString(),
    heightCm: 175,
    weightKg: 90,
    respiration: 20,
    temperatureF: 100.4,
    sys: 145,
    dia: 92,
    spo2: 92,
    glucose: 120,
    hr: 125,
  },
];

export const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem("vitals_data_v1");
    if (!raw) return defaultMockData;
    return JSON.parse(raw);
  } catch (e) {
    return defaultMockData;
  }
};

export const saveToStorage = (data) => {
  localStorage.setItem("vitals_data_v1", JSON.stringify(data));
};

export const calcBMI = (heightCm, weightKg) => {
  if (!heightCm || !weightKg) return null;
  const h = heightCm / 100;
  const bmi = weightKg / (h * h);
  return Math.round(bmi * 10) / 10;
};

export const detectAnomalies = (entry) => {
  const alerts = [];
  if (entry.hr > 120) alerts.push({ type: "hr", text: "⚠️ High Heart Rate" });
  if (entry.spo2 < 95)
    alerts.push({ type: "spo2", text: "⚠️ Low Oxygen Level" });
  if (entry.sys > 140 || entry.dia > 90)
    alerts.push({ type: "bp", text: "⚠️ High Blood Pressure" });
  if (entry.temperatureF > 102)
    alerts.push({ type: "fever", text: "⚠️ High Temperature" });
  return alerts;
};
