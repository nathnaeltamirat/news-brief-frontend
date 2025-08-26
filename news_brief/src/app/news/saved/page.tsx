import Button from "@/components/reusable_components/Button";
import NewsComponent from "@/components/news_component/NewsComponent";
import TopBar from "@/components/reusable_components/search_topbar";
import Sidebar from "@/components/siderbar/main";
import SavedNewsComponent from "@/components/news_component/SavedNewsComponent";

const SavedNews = () => {
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
        <Sidebar />
        <div className="mt-10 flex-1 mr-10">
          <TopBar />

          <h1 className="my-5 font-bold text-xl">Saved News</h1>
          <SavedNewsComponent />
        </div>
      </div>
    </>
  );
};

export default SavedNews;
