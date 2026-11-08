const LEAVES = [
  {
    src: "/images/maple-leaf.svg",
    left: "4%",
    size: 34,
    duration: 17,
    delay: -2,
    hue: 0,
  },
  {
    src: "/images/oak-leaf.svg",
    left: "13%",
    size: 26,
    duration: 21,
    delay: -11,
    hue: 0,
  },
  {
    src: "/images/maple-leaf.svg",
    left: "24%",
    size: 28,
    duration: 15,
    delay: -6,
    hue: -25,
  },
  {
    src: "/images/oak-leaf.svg",
    left: "36%",
    size: 22,
    duration: 19,
    delay: -15,
    hue: -30,
  },
  {
    src: "/images/maple-leaf.svg",
    left: "48%",
    size: 38,
    duration: 23,
    delay: -9,
    hue: 15,
  },
  {
    src: "/images/oak-leaf.svg",
    left: "59%",
    size: 30,
    duration: 16,
    delay: -1,
    hue: 0,
  },
  {
    src: "/images/maple-leaf.svg",
    left: "70%",
    size: 24,
    duration: 20,
    delay: -13,
    hue: -25,
  },
  {
    src: "/images/oak-leaf.svg",
    left: "80%",
    size: 34,
    duration: 18,
    delay: -4,
    hue: -20,
  },
  {
    src: "/images/maple-leaf.svg",
    left: "90%",
    size: 30,
    duration: 22,
    delay: -17,
    hue: 15,
  },
  {
    src: "/images/maple-leaf.svg",
    left: "96%",
    size: 22,
    duration: 14,
    delay: -8,
    hue: -25,
  },
];

export const FallingLeaves = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden motion-reduce:hidden"
    >
      {LEAVES.map((leaf, i) => (
        <img
          key={i}
          src={leaf.src}
          alt=""
          className="absolute top-0 animate-leaf-fall"
          style={{
            left: leaf.left,
            width: leaf.size,
            animationDuration: `${leaf.duration}s`,
            animationDelay: `${leaf.delay}s`,
            filter: leaf.hue ? `hue-rotate(${leaf.hue}deg)` : undefined,
          }}
        />
      ))}
    </div>
  );
};
