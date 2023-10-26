import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler } from "react";

interface CardProps {
  title: string;
  shortcut?: string;
  link: string;
  icon: string;
  isDisabled?: boolean;
  withColor?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  targetBlank?: boolean;
}

export function Card({
  title,
  shortcut,
  link,
  icon,
  isDisabled,
  withColor,
  onClick,
  targetBlank
}: CardProps) {
  const linkProps = {
    href: link,
    onClick: onClick,
    className: `flex flex-col items-center justify-around w-[90%] h-[90%] border border-border rounded-lg
      ${isDisabled && !withColor ? 'bg-block cursor-not-allowed blur-[1px]' : ''} 
      ${withColor ? 'bg-indigo-900' : ''}
      ${!isDisabled && !withColor ? 'hover:bg-stone-800' : ''} 
      ${withColor ? 'hover:bg-indigo-800' : ''}`,
    target: targetBlank ? "_blank" : "_self"
  };

  return (
    <Link {...linkProps}>
      <h1 className="flex items-center px-3 text-2xl">{title}</h1>
      {/* <p className="flex items-center text-base">{shortcut}</p> */}
      <Image src={icon} alt="" className="w-[15%]" />
    </Link>
  );
}
