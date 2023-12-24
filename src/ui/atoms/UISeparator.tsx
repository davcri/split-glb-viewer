export function UISeparator() {
  return (
    <div className="h-screen flex" onClick={(ev) => {}}>
      <div className="flex-1"></div>
      <div className="bg-black bg-opacity-50 min-w-[3px]"></div>
      <div className="flex-1"></div>
    </div>
  );
}
