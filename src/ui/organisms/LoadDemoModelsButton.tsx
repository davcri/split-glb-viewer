import { loadDemoModels } from "../../store/app.hooks";

export function LoadDemoModelsButton() {
  return (
    <button
      className="fixed bottom-6 right-2 p-2 bg-gray-800 text-white rounded-md pointer-events-auto hover:pointer"
      onClick={() => {
        loadDemoModels();
      }}
    >
      Load demo models
    </button>
  );
}
