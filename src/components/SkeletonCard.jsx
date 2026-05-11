export default function SkeletonCard({ isDarkMode }) {
  const bg = isDarkMode ? "bg-slate-800" : "bg-white";
  const pulse = isDarkMode ? "bg-slate-700" : "bg-gray-200";

  return (
    <div className={`w-full max-w-4xl mx-auto rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-8 animate-pulse shadow-xl ${bg}`}>
      <div className={`md:w-1/3 h-[400px] rounded-2xl ${pulse}`}></div>
      <div className="md:w-2/3 flex flex-col gap-4">
        <div className={`h-12 w-3/4 rounded-xl ${pulse}`}></div>
        <div className={`h-6 w-1/2 rounded-lg ${pulse}`}></div>
        <div className={`h-32 w-full rounded-xl ${pulse} mt-4`}></div>
        <div className={`h-20 w-full rounded-xl ${pulse} mt-auto`}></div>
      </div>
    </div>
  );
}