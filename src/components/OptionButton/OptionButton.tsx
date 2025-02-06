interface OptionButtonProps {
  className?: string;
}

const OptionButton = ({ className }: OptionButtonProps) => {
  return (
    <div className={`flex gap-1 ${className}`}>
      <div className={"w-1 h-1 rounded-full bg-primary-strong"}></div>
      <div className={"w-1 h-1 rounded-full bg-primary-strong"}></div>
      <div className={"w-1 h-1 rounded-full bg-primary-strong"}></div>
    </div>
  );
};

export default OptionButton;
