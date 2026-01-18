import { HeaderCart } from "@/components/HeaderCart";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      {/* <div className="font-mono text-[#4e2ce9]">STORE</div> */}
      <Link href="/" className="text-lg font-semibold uppercase text-blue-500">
        Store
      </Link>
      <HeaderCart />
    </header>
  );
}
