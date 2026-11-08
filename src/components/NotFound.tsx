export const NotFound = () => {
  return (
    <main className="mx-auto flex max-w-xl flex-col items-center px-4 py-16 text-center">
      <img
        src="/images/turkey.svg"
        alt=""
        className="w-44 motion-safe:animate-wobble"
      />
      <p className="eyebrow mt-4">Well, butter my biscuits</p>
      <h1 className="title-retro mt-2 text-7xl">404</h1>
      <p className="mt-4 text-xl font-medium text-cocoa">
        Not Found — this turkey flew the coop.
      </p>
      <a
        href="/"
        className="mt-8 font-bold text-cranberry underline decoration-pumpkin decoration-wavy decoration-2 underline-offset-4 hover:text-cranberry-dark"
      >
        Back to the feast
      </a>
    </main>
  );
};
