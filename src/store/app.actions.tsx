import { showError } from "../utils/showError";
import { useAppStore } from "./app.store";

export function loadDemoModels() {
  const model1 = "/DamagedHelmet.glb";
  const model2 = "/DamagedHelmet@128px_draco_compressed.glb";
  useAppStore.setState({
    modelLeft: model1,
    modelRight: model2,
  });
}

export function loadModelsFromDroppedItems(
  items: DataTransferItemList,
  side: "left" | "right"
) {
  if (items.length > 1) {
    showError("Files drop is not implemented");
  }

  const item = items[0];
  if (item.kind === "file") {
    const itemFile = item.getAsFile();
    if (!itemFile) {
      return showError("File not found");
    }
    const droppedFile = URL.createObjectURL(itemFile);
    useAppStore.setState({
      [side === "left" ? "modelLeft" : "modelRight"]: droppedFile,
    });
  } else {
    showError("Only files are supported");
  }
}
