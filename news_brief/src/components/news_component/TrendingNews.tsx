import { Cpu, Briefcase, Film, Heart } from 'lucide-react';
import React from 'react'

const TrendingNews = () => {
  return (
    <div>
      <aside className="w-full lg:w-80 flex flex-col gap-6">
        <div className="shadow-lg rounded-xl bg-white p-4">
          <h3 className="font-semibold text-gray-700 mb-3">Trending News</h3>
          <ul className="text-sm text-gray-600 space-y-3">
            <div className="flex space-x-2 items-start">
              <img src="/thumb.png" />
              <li>
                <li>Meta rolls out new privacy features</li>
                <p className="text-sm text-gray-400">Bussiness</p>
              </li>
            </div>
            <div className="flex space-x-2 items-start">
              <img src="/thumb1.png" />
              <li>
                <li>Markets see mixed signals as inflation cools</li>
                <p className="text-sm text-gray-400">Economy</p>
              </li>
            </div>
            <div className="flex space-x-2 items-start">
              <img src="/thumb2.png" />
              <li>
                <li>Electric future: A world shifts gears</li>
                <p className="text-sm text-gray-400">Technology</p>
              </li>
            </div>
            <div className="flex space-x-2 items-start">
              <img src="/thumb2.png" />
              <li>
                <li>Electric future: A world shifts gears</li>
                <p className="text-sm text-gray-400">Technology</p>
              </li>
            </div>
            <div className="flex space-x-2 items-start">
              <img src="/thumb2.png" />
              <li>
                <li>Electric future: A world shifts gears</li>
                <p className="text-sm text-gray-400">Technology</p>
              </li>
            </div>
            <div className="flex space-x-2 items-start">
              <img src="/thumb2.png" />
              <li>
                <li>Electric future: A world shifts gears</li>
                <p className="text-sm text-gray-400">Technology</p>
              </li>
            </div>
          </ul>
        </div>

        <div className="shadow-lg rounded-xl bg-white p-4">
          <h3 className="font-semibold text-gray-700 mb-3">
            Trending Sections
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-center gap-2">
              <Cpu size={16} className="text-[#1E5A47]" />{" "}
              {/* Technology icon */}
              Technology <span className="text-gray-400">(23)</span>
            </li>

            <li className="flex items-center gap-2">
              <Briefcase size={16} className="text-[#1E5A47]" />{" "}
              {/* Business icon */}
              Business <span className="text-gray-400">(18)</span>
            </li>

            <li className="flex items-center gap-2">
              <Film size={16} className="text-[#1E5A47]" />{" "}
              {/* Entertainment icon */}
              Entertainment <span className="text-gray-400">(12)</span>
            </li>

            <li className="flex items-center gap-2">
              <Heart size={16} className="text-[#1E5A47]" /> {/* Health icon */}
              Health <span className="text-gray-400">(9)</span>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default TrendingNews
