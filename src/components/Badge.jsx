
export default function Badge({ name, description, unlocked, svg, credits, money }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center text-center hover:shadow-lg transition ${
        unlocked ? "" : "opacity-50 grayscale"
      }`}
    >
      {/* Badge SVG */}
      <img src={svg} alt={name} className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mb-3 sm:mb-4" />

      {/* Info */}
      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-green-800 mb-1 sm:mb-2">{name}</h3>
      <p className="text-gray-600 text-sm sm:text-base mb-2 line-clamp-2">{description}</p>
      <p className="text-sm sm:text-base text-gray-500 mb-1">At {credits} credits</p>
      <p className="font-semibold text-blue-600 text-base sm:text-lg">${money} Reward</p>
    </div>
  );
}
