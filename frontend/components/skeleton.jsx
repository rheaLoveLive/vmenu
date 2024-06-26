const ProdSkeleton = () => {
  return (
    <>
      <div className="py-2 px-2 flex rounded-[5px] bg-[#ccc]">
        <div className="skeleton rounded-md shadow-md w-[60px] h-[60px] md:w-[70px] md:h-[70px]"></div>
        <div className="ml-2 grow descCont space-y-3">
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-3 w-24"></div>
          <div className="skeleton h-3 w-full"></div>
        </div>
      </div>
      <div className="py-2 px-2 flex rounded-[5px] bg-[#ccc]">
        <div className="skeleton rounded-md shadow-md w-[60px] h-[60px] md:w-[70px] md:h-[70px]"></div>
        <div className="ml-2 grow descCont space-y-3">
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-3 w-24"></div>
          <div className="skeleton h-3 w-full"></div>
        </div>
      </div>
      <div className="py-2 px-2 flex rounded-[5px] bg-[#ccc]">
        <div className="skeleton rounded-md shadow-md w-[60px] h-[60px] md:w-[70px] md:h-[70px]"></div>
        <div className="ml-2 grow descCont space-y-3">
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-3 w-24"></div>
          <div className="skeleton h-3 w-full"></div>
        </div>
      </div>
    </>
  );
};

const CategSkeleton = () => {
  return (
    <>
      <div className="px-2 py-1 flex flex-col justify-center items-center">
        <div className="skeleton h-[60px] w-[60px] rounded-[15px] bg-[#ccc]"></div>
        <div className="mt-2 skeleton h-3 w-full bg-[#ccc]"></div>
      </div>
      <div className="px-2 py-1 flex flex-col justify-center items-center">
        <div className="skeleton h-[60px] w-[60px] rounded-[15px] bg-[#ccc]"></div>
        <div className="mt-2 skeleton h-3 w-full bg-[#ccc]"></div>
      </div>
      <div className="px-2 py-1 flex flex-col justify-center items-center">
        <div className="skeleton h-[60px] w-[60px] rounded-[15px] bg-[#ccc]"></div>
        <div className="mt-2 skeleton h-3 w-full bg-[#ccc]"></div>
      </div>
    </>
  );
};

export { ProdSkeleton, CategSkeleton };
