import Icon from "@/components/Icon";
import {
  selectBoxVariant,
  selectIconVariant,
  selectLabelVariant,
} from "@/components/Sidebar/children/Select/Select.variants";
import { IconMapTypes } from "@/icons/icons";
import { cn } from "@/utils/tailwind/cn";
import { VariantProps } from "class-variance-authority";

interface SelectProps extends VariantProps<typeof selectLabelVariant> {
  icon: IconMapTypes;
  label: string;
}

const Select = ({ icon, state }: SelectProps) => {
  return (
    <div className={cn(selectBoxVariant({ state }))}>
      <Icon
        size={"md"}
        icon={icon}
        className={cn(selectIconVariant({ state }))}
      />
    </div>
  );
};

export default Select;
