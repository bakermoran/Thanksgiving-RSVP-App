const FLAG_COLORS = [
  "bg-cranberry",
  "bg-pumpkin polka",
  "bg-mustard",
  "bg-olive polka",
  "bg-cocoa",
];

export const Bunting = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative z-20 overflow-hidden"
    >
      <div className="h-1.5 bg-bark" />
      <div className="-mt-0.5 flex justify-center gap-1 drop-shadow-[2px_3px_0_rgba(61,35,20,0.85)]">
        {Array.from({ length: 40 }, (_, i) => (
          <span
            key={i}
            className={`${FLAG_COLORS[i % FLAG_COLORS.length]} h-10 w-9 shrink-0 [clip-path:polygon(0_0,100%_0,50%_100%)] sm:h-12 sm:w-11`}
          />
        ))}
      </div>
    </div>
  );
};
