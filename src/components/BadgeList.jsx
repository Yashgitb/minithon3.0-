// import Badge from "./Badge";

// // import SVG badges
// import ecoBeginner from "../assets/badges/eco-beginner.svg";
// import ecoLearner from "../assets/badges/eco-learner.svg";
// import ecoAdvocate from "../assets/badges/eco-advocate.svg";
// // ... add more as you create them

// export default function BadgeList({ userCredits }) {
//   const rewards = [
//     {
//       name: "Eco Beginner",
//       minCredits: 10,
//       description: "Getting started with eco habits",
//       svg: ecoBeginner,
//       money: 5,
//     },
//     {
//       name: "Eco Learner",
//       minCredits: 20,
//       description: "Learning eco-friendly actions",
//       svg: ecoLearner,
//       money: 10,
//     },
//     {
//       name: "Eco Advocate",
//       minCredits: 30,
//       description: "Promoting eco-friendly lifestyle",
//       svg: ecoAdvocate,
//       money: 15,
//     },
//     // ... continue for all 10 badges
//   ];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//       {rewards.map((badge) => (
//         <Badge
//           key={badge.name}
//           name={badge.name}
//           description={badge.description}
//           unlocked={userCredits >= badge.minCredits}
//           svg={badge.svg}
//           credits={badge.minCredits}
//           money={badge.money}
//         />
//       ))}
//     </div>
//   );
// }
import Badge from "./Badge";

// Import your 10 SVG badges
import ecoBeginner from "../assets/badges/eco-beginner.svg";
import ecoChampion from "../assets/badges/eco-champion.svg";
import ecoExplorer from "../assets/badges/eco-explorer.svg";
import ecoGuardian from "../assets/badges/eco-guardian.svg";
import ecoHero from "../assets/badges/eco-hero.svg";
import ecoInnovator from "../assets/badges/eco-innovator.svg";
import ecoLeader from "../assets/badges/eco-leader.svg";
import ecoLearner from "../assets/badges/eco-learner.svg";
import ecoLegend from "../assets/badges/eco-legend.svg";
import ecoMaster from "../assets/badges/eco-master.svg";

export default function BadgeList({ userCredits }) {
  const rewards = [
    {
      name: "Eco Beginner",
      minCredits: 10,
      description: "Getting started with eco habits",
      svg: ecoBeginner,
      money: 5,
    },
    {
      name: "Eco Learner",
      minCredits: 20,
      description: "Learning eco-friendly actions",
      svg: ecoLearner,
      money: 10,
    },
    {
      name: "Eco Explorer",
      minCredits: 30,
      description: "Discovering new green solutions",
      svg: ecoExplorer,
      money: 15,
    },
    {
      name: "Eco Champion",
      minCredits: 40,
      description: "Driving large-scale eco changes",
      svg: ecoChampion,
      money: 20,
    },
    {
      name: "Eco Hero",
      minCredits: 50,
      description: "Making a significant positive impact",
      svg: ecoHero,
      money: 50,
    },
    {
      name: "Eco Guardian",
      minCredits: 60,
      description: "Protecting the environment",
      svg: ecoGuardian,
      money: 60,
    },
    {
      name: "Eco Innovator",
      minCredits: 70,
      description: "Pioneering new sustainable ideas",
      svg: ecoInnovator,
      money: 75,
    },
    {
      name: "Eco Leader",
      minCredits: 80,
      description: "Leading the green movement",
      svg: ecoLeader,
      money: 100,
    },
    {
      name: "Eco Master",
      minCredits: 90,
      description: "Mastering eco-friendly practices",
      svg: ecoMaster,
      money: 120,
    },
    {
      name: "Eco Legend",
      minCredits: 100,
      description: "A symbol of environmental commitment",
      svg: ecoLegend,
      money: 150,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {rewards.map((badge) => (
        <Badge
          key={badge.name}
          name={badge.name}
          description={badge.description}
          unlocked={userCredits >= badge.minCredits}
          svg={badge.svg}
          credits={badge.minCredits}
          money={badge.money}
        />
      ))}
    </div>
  );
}