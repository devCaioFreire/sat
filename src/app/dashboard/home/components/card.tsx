import Image from "next/image";
import Link from "next/link";
import Cart from '../../../../../assets/shopping-cart.svg';

interface CardProps {
  title: string;
  shortcut: string;
  link: string;
  isDisabled?: boolean;
  withColor?: boolean;
}

export function Card({ title, shortcut, link, isDisabled, withColor }: CardProps) {

  return (
    <Link
      href={link}
      type="submit"
      className={`flex flex-col items-center justify-around w-[90%] h-[90%] border border-border rounded-lg
      ${isDisabled && !withColor ? 'bg-block cursor-not-allowed blur-[1px]' : ''} ${withColor ? 'bg-indigo-900' : ''}`}>
      <h1 className="flex items-center px-3 text-2xl">{title}</h1>
      <p className="flex items-center text-base">{shortcut}</p>
      <Image src={Cart} alt="" className="w-[20%]" />
    </Link>

  )
}
