"use client";

import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingBasket } from "react-icons/md";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { usePathname } from "next/navigation";
import { RiLogoutBoxLine } from "react-icons/ri";
import { handleLogout } from "./action/action";

const Navbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const pathname = usePathname();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const initialValue = e.target.value;
    setSearch(initialValue);

    setTimeout(() => {
      // Get latest search value
      setSearch((latestValue) => {
        if (initialValue === latestValue) {
          if (pathname === "/products") {
            router.replace(`/products?search=${latestValue}`);
            router.refresh();
          } else {
            router.push(`/products?search=${latestValue}`);
          }
        }
        return latestValue;
      });
    }, 500);
  };

  return (
    <>
      {/* NavBar */}
      <div className="pb-[30px] border-b-2">
        <div className="mx-[48px] flex flex-row h-[70px] mt-[30px] items-center py-1 justify-between">
          <Link href="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Ikea_logo.svg"
              alt="Logo"
            />
          </Link>
          <div className="flex bg-slate-100 h-full items-center px-8 py-4 rounded-full w-2/3 mx-8">
            <FaSearch className=" mr-4" />
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              className="h-full w-full bg-slate-100 border-none outline-none"
            />
          </div>
          <ul className="flex flex-row gap-8">
            <li>
              <Link href={"/login"}>
                <IoPersonOutline size={25} />
              </Link>
            </li>
            <li>
              <Link href={"/"}>
                <FaRegHeart size={25} />
              </Link>
            </li>
            <li>
              <Link href={"/wishlist"}>
                <MdOutlineShoppingBasket size={25} />
              </Link>
            </li>
            <li>
              <form action={handleLogout}>
                <button type="submit">
                  <RiLogoutBoxLine size={25} />
                </button>
              </form>
            </li>
          </ul>
        </div>
      </div>
      {/* END NAVBAR */}
    </>
  );
};
export default Navbar;
