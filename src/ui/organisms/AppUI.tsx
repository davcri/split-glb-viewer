import { UISeparator } from "../atoms/UISeparator";
import { DragNDropArea } from "../molecules/DragNDropArea";
import { loadModelsFromDroppedItems } from "../../store/app.actions";
import { ButtonsPanel } from "../molecules/ButtonsPanel";
import { HelpText } from "../atoms/HelpText";

export function AppUI() {
  return (
    <>
      <DragNDropArea
        onLeftDropped={(data) => {
          loadModelsFromDroppedItems(data, "left");
        }}
        onRightDropped={(data) => {
          loadModelsFromDroppedItems(data, "right");
        }}
      />
      <UISeparator />;
      <ButtonsPanel />
      <div className="fixed bottom-4 left-4 max-w-lg">
        <HelpText />
      </div>
    </>
  );
}
