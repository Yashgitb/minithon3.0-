// export default function Badge({ name, description, unlocked, svg, credits, money }) {
//   return (
//     <div
//       className={`bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition ${
//         unlocked ? "" : "opacity-50 grayscale"
//       }`}
//     >
//       {/* Badge SVG */}
//       <img src={svg} alt={name} className="w-24 h-24 mb-4" />

//       {/* Info */}
//       <h3 className="text-xl font-bold text-green-800">{name}</h3>
//       <p className="text-gray-600 text-sm mb-2">{description}</p>
//       <p className="text-sm text-gray-500">At {credits} credits</p>
//       <p className="font-semibold text-blue-600">${money} Reward</p>
//     </div>
//   );
// }


export default function Badge({ name, description, unlocked, svg, credits, money }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition ${
        unlocked ? "" : "opacity-50 grayscale"
      }`}
    >
      {/* Badge SVG */}
      <img src={svg} alt={name} className="w-24 h-24 mb-4" />

      {/* Info */}
      <h3 className="text-xl font-bold text-green-800">{name}</h3>
      <p className="text-gray-600 text-sm mb-2">{description}</p>
      <p className="text-sm text-gray-500">At {credits} credits</p>
      <p className="font-semibold text-blue-600">${money} Reward</p>
    </div>
  );
}
