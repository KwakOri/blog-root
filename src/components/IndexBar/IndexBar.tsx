import IndexText from "@/components/IndexBar/IndexText/IndexText";
import OptionButton from "@/components/OptionButton";

interface IndexBarProps {
  index1: string;
  index2: string;
  index3: string;
  index4: string;
}

const IndexBar = ({ index1, index2, index3, index4 }: IndexBarProps) => {
  return (
    <div className="flex items-center gap-3 p-4">
      <div className={"w-full flex gap-3 "}>
        <IndexText>{index1}</IndexText>
        <IndexText>{index2}</IndexText>
        <IndexText>{index3}</IndexText>
        <IndexText>{index4}</IndexText>
      </div>
      <OptionButton className={"opacity-0"} />
    </div>
  );
};

export default IndexBar;
