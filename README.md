# CureBay Health Vitals Dashboard

A responsive health vitals tracker built with **React**, **Tailwind CSS**, and **Recharts**. Users can log vitals such as heart rate, blood pressure, oxygen levels, temperature, and weight, visualize trends over time, and receive alerts for abnormal readings.

🔗 **Live Demo:** [https://curebay-app.vercel.app/](https://curebay-app.vercel.app/)

---

## 🚀 Features

- 📊 **Interactive Charts** — Visualize Heart Rate, Blood Pressure, SpO₂, and BMI trends.
- 📝 **Add Data** — Manually enter vitals sample readings.
- 🔔 **Anomaly Detection** — Get alerts for high BP, high heart rate, low SpO₂, and fever.
- 🗂 **History View** — Review past logs with timestamped entries.
- 💾 **Persistent Storage** — Saves data locally using `localStorage`.
- 📱 **Responsive Design** — Works seamlessly across devices.

---

## 🛠️ Tech Stack

- **React/Nextjs** (Create Next App)
- **Tailwind CSS** (styling)
- **Recharts** (data visualization)
- **Day.js** (date handling)
- **LocalStorage** (data persistence)

---

## 📦 Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/curebay-vitals-dashboard.git
cd curebay-vitals-dashboard

# 2. Install dependencies
npm install

# 3. Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🧩 Project Structure

```bash
src/app/
 ├── Components/        # UI Components
 │    ├── AlertsList.jsx        # Displays alerts for abnormal vitals
 │    ├── HistoryList.jsx       # Shows history of logged vitals
 │    ├── VitalsCharts.jsx      # Recharts graphs for trends
 │    ├── VitalsFormModal.jsx   # Modal to add new vitals
 │    └── VitalsOverview.jsx    # Summary of all vitals at a glance
 │
 ├── globals.css        # Global Tailwind and custom styles
 ├── layout.js          # Root layout file (Next.js App Router)
 ├── page.js            # Main page entry point
 └── utils.js           # Utility functions (random data, helpers)
```
