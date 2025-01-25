import BlogItem from "@/components/BlogItem";
import IndexBar from "@/components/IndexBar";

const page = () => {
  return (
    <div className={"flex flex-col gap-3 p-4"}>
      <IndexBar />
      <BlogItem />
      <BlogItem />
      <BlogItem />
      <BlogItem />
      <BlogItem />
    </div>
  );
};

export default page;
