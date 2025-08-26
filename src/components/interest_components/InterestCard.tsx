import React from "react";

interface InterestCardProps {
  interest: string;
  selected: boolean;
  onSelect: (interest: string) => void;
}

const InterestCard: React.FC<InterestCardProps> = ({
  interest,
  selected,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(interest)}
      className={`cursor-pointer w-[150px] px-3 py-1 rounded-3xl border-2 transition-all 
        ${
          selected
            ? "bg-gray-200 rounded-2xl  text-black border-gray-200 "
            : "bg-black rounded-2xl  text-white border-black"
        }`}
    >
      {interest}
    </div>
  );
};

export default InterestCard;
