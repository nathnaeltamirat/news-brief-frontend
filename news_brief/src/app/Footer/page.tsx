"use client";
import Link from "next/link";
import { FaApple, FaGooglePlay } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 py-10 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo */}
        <div>
          <h2 className="text-2xl font-bold text-white">NewsBrief</h2>
          <p className="mt-2 text-sm text-gray-400">
            Stay updated with the latest news from around the world.
          </p>
        </div>

        {/* Sections */}
        <div>
          <h3 className="text-white font-semibold mb-3">SECTIONS</h3>
          <ul className="space-y-2 text-sm">
            {[
              "World",
              "National",
              "Politics",
              "Business",
              "Economy",
              "Finance",
              "Technology",
              "Science",
              "Health",
              "Environment",
              "Education",
              "Law",
              "Crime",
              "Weather",
              "Opinion",
            ].map((topic) => (
              <li key={topic}>
                <Link
                  href={`/${topic.toLowerCase()}`}
                  className="hover:text-white transition"
                >
                  {topic}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-3">SUPPORT</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/help" className="hover:text-white transition">
                Help / FAQ
              </Link>
            </li>
            <li>
              <Link href="/feedback" className="hover:text-white transition">
                Feedback
              </Link>
            </li>
          </ul>
        </div>

        {/* About + App */}
        <div>
          <h3 className="text-white font-semibold mb-3">ABOUT</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white transition">
                Privacy Policy
              </Link>
            </li>
          </ul>

          <div className="mt-5">
            <h4 className="text-white font-semibold mb-2">Get Our App</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg hover:bg-gray-700"
              >
                <FaApple className="text-xl" /> <span>App Store</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg hover:bg-gray-700"
              >
                <FaGooglePlay className="text-xl" /> <span>Google Play</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} NewsBrief. All rights reserved.
      </div>
    </footer>
  );
}
