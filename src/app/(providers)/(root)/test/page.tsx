import IndexBar from "@/components/IndexBar";
import BlogItem from "@/components/ListItem";

const TestPage = () => {
  return (
    <>
      <div className={"flex flex-col gap-3 p-4"}>
        <IndexBar />
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
      </div>
    </>
  );
};

export default TestPage;
