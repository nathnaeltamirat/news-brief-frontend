import React from "react";
import InterestCard from "./InterestCard";

interface InterestListProps {
  interests: string[];
  selected: string[];
  onSelect: (interest: string) => void;
}

const InterestList:React.FC<InterestListProps>= ({ interests, selected, onSelect }) => {
  return (
    <div className="bg-white flex flex-wrap gap-3 pl-3 max-w-[550px]   rounded-3xl border-2 border-black dark:border-white">
      {interests.map((interest) => (
        <InterestCard
          key={interest}
          interest={interest}
          selected={selected.includes(interest)}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default InterestList;
