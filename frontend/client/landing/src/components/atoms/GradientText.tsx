import {ReactNode} from 'react';

interface GradientTextProps {
  children: ReactNode;
  colors?: string[];
  animationSpeed?: number;
}

export default function GradientText(
  {
    children,
    colors = ["#FFEB3B", "#8CC34B", "#FFEB3B", "#8CC34B", "#FFEB3B"],
    animationSpeed = 8,
  }: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  };
  
  return (
    <span
      className="inline-block relative z-2 text-transparent bg-cover animate-gradient"
      style={{
        ...gradientStyle,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        backgroundSize: "300% 100%",
      }}
    >
        {children}
      </span>
  );
}