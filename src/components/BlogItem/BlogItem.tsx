import ItemText from "@/components/ItemText/ItemText";
import OptionButton from "@/components/OptionButton";

const BlogItem = () => {
  return (
    <div className="flex items-center gap-3 p-4 rounded-2xl bg-paper-weak shadow-small brightness-100 transition-all hover:brightness-90 hover:shadow-small-inset">
      <div
        className={"w-[60px] h-[60px] rounded-xl bg-primary-normal shrink-0"}
      ></div>
      <div className={"w-full flex gap-3 "}>
        <ItemText>Text</ItemText>
        <ItemText>Text</ItemText>
        <ItemText>Text</ItemText>
        <ItemText>Text</ItemText>
      </div>
      <OptionButton />
    </div>
  );
};

export default BlogItem;
