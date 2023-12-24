import { useNoModelLoaded } from "../../store/app.hooks";
import { useAppStore } from "../../store/app.store";
import { LoadDemoModelsButton } from "../organisms/LoadDemoModelsButton";

export function ButtonsPanel() {
  const noneLoaded = useNoModelLoaded();

  return (
    <div className="fixed flex flex-col gap-2 bottom-6 right-2">
      {noneLoaded && <LoadDemoModelsButton />}
      {/* <Button onClick={showHelp}>Help</Button> */}
    </div>
  );
}
function showHelp() {
  useAppStore.setState({ uiHelpVisible: true });
}
