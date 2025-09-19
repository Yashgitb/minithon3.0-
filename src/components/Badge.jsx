
export default function Badge({ name, description, unlocked, svg, credits, money }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md p-8 flex flex-col items-center justify-center text-center hover:shadow-lg transition ${
        unlocked ? "" : "opacity-50 grayscale"
      }`}
    >
      {/* Badge SVG */}
      <img src={svg} alt={name} className="w-40 h-40 mb-4" />

      {/* Info */}
      <h3 className="text-2xl font-bold text-green-800">{name}</h3>
      <p className="text-gray-600 text-base mb-2">{description}</p>
      <p className="text-base text-gray-500">At {credits} credits</p>
      <p className="font-semibold text-blue-600 text-lg">${money} Reward</p>
    </div>
  );
}
