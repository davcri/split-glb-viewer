import { loadDemoModels } from "../../store/app.actions";
import { Button } from "../atoms/Button";

export function LoadDemoModelsButton() {
  return (
    <Button
      onClick={() => {
        loadDemoModels();
      }}
    >
      Load demo models
    </Button>
  );
}
