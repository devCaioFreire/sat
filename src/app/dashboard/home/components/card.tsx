import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler } from "react";
import Cart from '../../../../../assets/shopping-cart.svg';

interface CardProps {
  title: string;
  shortcut?: string;
  link: string;
  isDisabled?: boolean;
  withColor?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  targetBlank?: boolean;
}

export function Card({
  title,
  shortcut,
  link,
  isDisabled,
  withColor,
  onClick,
  targetBlank
}: CardProps) {
  const linkProps = {
    href: link,
    onClick: onClick,
    className: `flex flex-col items-center justify-around w-[90%] h-[90%] border border-border rounded-lg
      ${isDisabled && !withColor ? 'bg-block cursor-not-allowed blur-[1px]' : ''} ${withColor ? 'bg-indigo-900' : ''}`,
    target: targetBlank ? "_blank" : "_self"
  };

  return (
    <Link {...linkProps}>
      <h1 className="flex items-center px-3 text-2xl">{title}</h1>
      <p className="flex items-center text-base">{shortcut}</p>
      <Image src={Cart} alt="" className="w-[20%]" />
    </Link>
  );
}
