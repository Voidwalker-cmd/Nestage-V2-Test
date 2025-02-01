export const LevelStatus = ({levelOne, levelTwo}: { levelOne: number, levelTwo: number }) => {
  return (
    <div
      className="flex flex-col lg:flex-row justify-between items-start lg:items-center lg:justify-start gap-3 lg:gap-5">
      <div className="flex items-center justify-center gap-3 font-primary text-black dark:text-white tracking-wider">
        Level 1{" "}
        {levelOne > 0 ? (
          <div className="size-3 rounded-full bg-green-500">
            <div className="size-3 rounded-full animate-ping z-10 bg-green-500"></div>
          </div>
        ) : (
          <div className="size-3 rounded-full bg-gray-400"></div>
        )}
      </div>
      <div className="flex items-center justify-center gap-3 font-primary text-black dark:text-white tracking-wider">
        Level 2{" "}
        {levelTwo > 0 ? (
          <div className="size-3 rounded-full bg-green-500">
            <div className="size-3 rounded-full animate-ping z-10 bg-green-500"></div>
          </div>
        ) : (
          <div className="size-3 rounded-full bg-gray-400"></div>
        )}
      </div>
    </div>
  );
};

