import { UISeparator } from "../atoms/UISeparator";
import { DragNDropArea } from "../molecules/DragNDropArea";

export function AppUI() {
  return (
    <>
      <DragNDropArea
        onLeftDropped={(data) => {
          console.log("🚀 ~ data:", data);
        }}
        onRightDropped={(data) => {
          console.log("🚀 ~ data:", data);
        }}
      />
      <UISeparator />;
    </>
  );
}
