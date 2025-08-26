"use client";
import React, { useState } from "react";
import InterestList from "./InterestList";
import interests from "../../data/interests.json";

const InterestedSelectionPage = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleSelect = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="p-6">
      <InterestList
        interests={interests}
        selected={selectedInterests}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default InterestedSelectionPage;
