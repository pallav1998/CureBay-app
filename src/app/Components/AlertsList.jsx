function AlertsList({ alerts, clearAlerts }) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <section className="text-black">
      <h3 className="text-lg font-semibold">Alerts & Actions</h3>

      <div className="mt-4">
        {alerts.map((a, i) => (
          <div
            key={i}
            className="p-3 rounded border-l-4 border-yellow-400 bg-yellow-50 mb-2"
          >
            {a.text}
          </div>
        ))}
        <div className="flex gap-2 mt-2">
          <button className="px-3 py-1 rounded bg-white border">
            Take rest
          </button>
          <button className="px-3 py-1 rounded bg-white border">
            Drink water
          </button>
          <button className="px-3 py-1 rounded bg-indigo-600 text-white">
            Consult a doctor
          </button>
        </div>
      </div>

      {alerts.length > 0 && (
        <div className="mt-2">
          <button
            onClick={clearAlerts}
            className="px-3 py-1 bg-gray-100 rounded"
          >
            Dismiss
          </button>
        </div>
      )}
    </section>
  );
}

export default AlertsList;
