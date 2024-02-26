import CreateProjectButton from "./_components/CreateProjectButton";

const HomePage = () => {
  return (
    <div className="h-[150px] w-full border-b border-b-gray-500 flex items-center justify-around">
      <h1 className="font-bold text-4xl">My Projects</h1>
      <CreateProjectButton />
    </div>
  );
};

export default HomePage;
