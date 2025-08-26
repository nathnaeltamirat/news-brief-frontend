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
    <ChatBot/>
      <div className="flex gap-5 bg-white text-black">
        <Sidebar />
        <div className="mt-10 flex-1 mr-10">
          <div className="flex justify-between">
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
