import TopBar from "@/components/reusable_components/search_topbar";
import Sidebar from "@/components/siderbar/main";
import SavedNewsComponent from "@/components/news_component/SavedNewsComponent";

const SavedNews = () => {



  return (
    <>
      <div className="flex gap-5 bg-white text-black min-h-screen">
        <Sidebar />
        <div className="flex-1 lg:ml-0 lg:mt-10 mt-20 px-4 lg:px-0 lg:mr-10">
          <TopBar />

          <h1 className="my-5 font-bold text-xl">Saved News</h1>
          <SavedNewsComponent />
        </div>
      </div>
    </>
  );
};

export default SavedNews;
