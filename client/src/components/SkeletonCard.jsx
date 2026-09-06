import React from 'react';

const SkeletonCard = () => (
  <div className="rounded-xl overflow-hidden animate-pulse">
    <div className="aspect-square w-full bg-[#1a1a2e]" />
  </div>
);

export default SkeletonCard;