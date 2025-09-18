import dayjs from "dayjs";

function HistoryList({ data }) {
  if (!data || data.length === 0)
    return <div className="p-4">No data yet.</div>;
  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data
        .slice()
        .reverse()
        .map((d) => (
          <div key={d.id} className="p-4 bg-white rounded shadow text-black">
            <div className="text-sm text-gray-500">
              {dayjs(d.date).format("DD MMM YYYY, h:mm A")}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div>
                HR: <strong>{d.hr ?? "—"}</strong>
              </div>
              <div>
                SpO₂: <strong>{d.spo2 ?? "—"}</strong>
              </div>
              <div>
                BP:{" "}
                <strong>
                  {d.sys ?? "—"}/{d.dia ?? "—"}
                </strong>
              </div>
              <div>
                Temp: <strong>{d.temperatureF ?? "—"}</strong>
              </div>
              <div>
                Weight: <strong>{d.weightKg ?? "—"}</strong>
              </div>
              <div>
                Glucose: <strong>{d.glucose ?? "—"}</strong>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default HistoryList;
