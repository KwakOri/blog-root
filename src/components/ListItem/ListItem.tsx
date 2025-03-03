import ItemText from "@/components/ItemText/ItemText";
import OptionButton from "@/components/OptionButton";

interface ListItemProps {
  index1: string;
  index2: string;
  index3: string;
  index4: string;
}

const ListItem = ({ index1, index2, index3, index4 }: ListItemProps) => {
  return (
    <div className={"flex gap-2"}>
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-paper-normal shadow-small brightness-100 transition-all hover:brightness-90 hover:shadow-small-inset cursor-pointer w-full">
        <div className={"w-full grid grid-cols-4 gap-3 "}>
          <ItemText>{index1}</ItemText>
          <ItemText>{index2}</ItemText>
          <ItemText>{index3}</ItemText>
          <ItemText>{index4}</ItemText>
        </div>
      </div>

      <OptionButton />
    </div>
  );
};

export default ListItem;
