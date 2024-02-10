import HomeProductCard from "@/components/HomeProductCard";
import { Product } from "@/type/type";
import Link from "next/link";

const Home = async () => {
  const url = process.env.NEXT_PUBLIC_API_URL as string;

  const response = await (
    await fetch(url + "/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ length: 0 }),
    })
  ).json();

  const products: Product[] = response.data;
  const slicedProduct = products.slice(0, 8);
  return (
    <>
      <div className="flex-1 mt-8 px-[48px] flex flex-col items-center">
        <img
          src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page__en_us_1704043672595_0_1.webp"
          alt=""
          className=" w-full -mt-0 rounded object-contain"
        />
        <p className="text-3xl font-extrabold my-8">Produk Terlaku</p>
        <div className="w-full grid grid-cols-4 gap-6">
          {slicedProduct.map((product, index) => {
            return <HomeProductCard product={product} key={index} />;
          })}
        </div>
        <div className="w-full flex justify-center mt-8">
          <Link
            href="/products"
            className="h-[30px] w-3/5 rounded-full bg-[#f5f5f5] hover:bg-slate-400 transition-colors font-bold flex justify-center items-center"
          >
            See more
          </Link>
        </div>
      </div>
    </>
  );
};
export default Home;
