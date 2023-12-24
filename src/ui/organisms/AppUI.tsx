import { useNoModelLoaded } from "../../store/app.hooks";
import { UISeparator } from "../atoms/UISeparator";
import { DragNDropArea } from "../molecules/DragNDropArea";
import { loadItemList } from "../molecules/DragNDropArea.logic";
import { LoadDemoModelsButton } from "./LoadDemoModelsButton";

export function AppUI() {
  const noneLoaded = useNoModelLoaded();

  return (
    <>
      <DragNDropArea
        onLeftDropped={(data) => {
          loadItemList(data, "left");
        }}
        onRightDropped={(data) => {
          loadItemList(data, "right");
        }}
      />
      {noneLoaded && <LoadDemoModelsButton />}
      <UISeparator />;
    </>
  );
}
