"use client";

import Select from "@/components/Sidebar/children/Select/Select";

const SelectList = () => {
  return (
    <div className={"flex flex-col gap-3 p-[10px] bg-paper-weak  rounded-2xl"}>
      <Select icon="ChartSquare1" label="왼쪽" state={"ACTIVE"} />
      <Select icon="Monitor1" label="왼쪽" state={"INACTIVE"} />
      <Select icon="PaperNote" label="왼쪽" state={"INACTIVE"} />
      <Select icon="Edit" label="왼쪽" state={"INACTIVE"} />
      <Select icon="Setting1" label="왼쪽" state={"INACTIVE"} />
    </div>
  );
};

export default SelectList;
