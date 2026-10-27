import { HealthStatus } from "../features/health";

function App() {
  return (
    <div className="mx-auto max-w-xl p-8">
      <h1 className="mb-4 text-2xl font-bold">ScopePilot</h1>
      <HealthStatus />
    </div>
  );
}

export default App;
