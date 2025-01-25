import ItemText from "@/components/ItemText/ItemText";
import OptionButton from "@/components/OptionButton";

const IndexBar = () => {
  return (
    <div className="flex items-center gap-3 p-4">
      <div
        className={
          "w-[60px] h-[10px] rounded-xl bg-primary-normal opacity-0 shrink-0"
        }
      ></div>
      <div className={"w-full flex gap-3 "}>
        <ItemText>Text</ItemText>
        <ItemText>Text</ItemText>
        <ItemText>Text</ItemText>
        <ItemText>Text</ItemText>
      </div>
      <OptionButton className={"opacity-0"} />
    </div>
  );
};

export default IndexBar;
