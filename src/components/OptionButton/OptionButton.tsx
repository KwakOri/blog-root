interface OptionButtonProps {
  className?: string;
}

const OptionButton = ({ className }: OptionButtonProps) => {
  return (
    <div
      className={`flex items-center gap-1 p-4 rounded-2xl bg-paper-normal brightness-100 transition-all hover:brightness-90 hover:shadow-small-inset cursor-pointer ${className}`}
    >
      <div className={"w-1 h-1 rounded-full bg-primary-strong"}></div>
      <div className={"w-1 h-1 rounded-full bg-primary-strong"}></div>
      <div className={"w-1 h-1 rounded-full bg-primary-strong"}></div>
    </div>
  );
};

export default OptionButton;
