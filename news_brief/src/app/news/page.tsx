import Button from "@/components/reusable_components/Button";
import NewsComponent from "@/components/news_component/NewsComponent";
import TopBar from "@/components/reusable_components/search_topbar";
import Sidebar from "@/components/siderbar/main";
import ChatBot from "@/components/reusable_components/chatbot";


const News = () => {


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
      <div className="flex gap-3 sm:gap-7 my-3 sm:my-5 overflow-x-auto pb-3 scrollbar-hide w-full">
        {categories.map((item, index) => (
          <Button variant="tertiary" key={index} className="flex-shrink-0">
            {item}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <>
    <ChatBot/>
      <div className="flex gap-5 bg-white text-black min-h-screen w-full overflow-hidden">
        <Sidebar />
        <div className="flex-1 lg:ml-0 lg:mt-10 mt-16 px-4 lg:px-6 lg:mr-10 w-full overflow-hidden">
          <div className="flex justify-between w-full">
            <TopBar/>

          </div>
          <MainTopics />
          <NewsComponent/>
         
        </div>
      </div>
    </>
  );
};

export default News;
