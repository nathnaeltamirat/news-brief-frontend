
import { Bell, Globe } from "lucide-react";
import Button from "@/components/reusable_components/Button";
import NewsComponent from "@/components/news_component/NewsComponent";


const News = () => {

  const SearchBar = () => {
    return (
      <input
        type="text"
        placeholder="Search..."
        className="border rounded-md px-3 py-1 w-60"
      />
    );
  };

  const NavBar = () => {
    return (
      <>
        <div className="h-full bg-black  md:w-[20%]"></div>
      </>
    );
  };
  const categories = [
    "All",
    "Technology",
    "Business",
    "Sports",
    "Science",
    "Health",
    "World",
  ];
  const MainTopics = () => {
    return (
      <div className="flex gap-7 my-5">
        {categories.map((item, index) => (
          <Button variant="tertiary" key={index}>
            {item}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="flex gap-5 bg-white text-black">
        <NavBar />
        <div className="mt-10 flex-1 mr-10">
          <div className="flex justify-between">
            <SearchBar />
            <div className="flex gap-2 items-center">
              <button className="w-9 h-9 flex items-center justify-center rounded-full shadow-sm border">
                <Bell className="h-5 w-5" />
              </button>
              <div className="flex  items-center border rounded px-2 py-1">
                <Globe className="h-4 w-4 mr-1" />
                <select className="bg-transparent outline-none">
                  <option value="English">English</option>
                  <option value="Amharic">Amharic</option>
                </select>
              </div>
            </div>
          </div>
          <MainTopics />
          <NewsComponent/>
        </div>
      </div>
    </>
  );
};

export default News;
