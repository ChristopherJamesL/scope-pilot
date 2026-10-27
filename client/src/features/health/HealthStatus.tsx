import { useHealth } from "./hooks";

export function HealthStatus() {
  const { data, isPending, isError, error, refetch, isFetching } = useHealth();

  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <h2 className="text-lg font-semibold">Server health</h2>

      {isPending && <p className="text-gray-500">Checking...</p>}

      {isError && <p className="text-red-600">Failed: {error.message}</p>}

      {data && (
        <p className="text-green-700">
          Status: {data.status} <span className="text-gray-500">({data.timestamp})</span>
        </p>
      )}

      <button
        type="button"
        onClick={() => refetch()}
        disabled={isFetching}
        className="mt-3 rounded bg-gray-900 px-3 py-1 text-sm text-white disabled:opacity-50"
      >
        Check again
      </button>
    </div>
  );
}
