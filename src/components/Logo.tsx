import Link from "next/link";

export const Logo = () => (
  <Link href="/">
    <div className="bg-white items-center justify-center h-full w-full flex flex-col text-xl">
      <div className="w-1/3 h-[1px] bg-sky-600 mr-auto -rotate-12" />
      <div className="w-2/3 h-[1px] bg-sky-600 mr-auto -rotate-12" />
      <div className="flex -rotate-12 text-sky-600">
        <span className="font-bold">My</span>
        <span>Subaru</span>
      </div>
      <div className="w-2/3 h-[1px] bg-sky-600 ml-auto -rotate-12" />
      <div className="w-1/3 h-[1px] bg-sky-600 ml-auto -rotate-12" />
    </div>
  </Link>
);
