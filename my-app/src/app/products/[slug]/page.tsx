import WishListDetailButton from "@/components/WishListDetailClientButton";
import { MyResponse, Product } from "@/type/type";
import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Detail",
};

const Page = async ({ params }: { params: { slug: string } }) => {
  const url = process.env.NEXT_PUBLIC_API_URL as string;

  const response = (await (
    await fetch(url + `/product/${params.slug}`)
  ).json()) as MyResponse<unknown>;

  const product = response.data as Product;

  return (
    <>
      <div className="mx-[48px] flex-1 mt-12 flex">
        <Head>
          <title key="1">{product.name}</title>
          <meta property="og:title" content={product.name} key="title" />
        </Head>
        {/* KIRI */}
        <div className="w-[60%]">
          <div className=" flex justify-center">
            <div>
              <img
                src={product.thumbnail}
                alt="Chair"
                className="w-[500px] h-[500px]"
              />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <div className="p-4 gap-4 grid grid-cols-5">
              {product.images.map((url, idx) => {
                return (
                  <img
                    src={url}
                    alt="Chair"
                    className="w-[100px] h-[100px]"
                    key={idx}
                  />
                );
              })}
            </div>
          </div>
        </div>
        {/* KANAN */}
        <div className="w-[40%]">
          <div className="py-8">
            <p className="font-bold text-5xl">{product.name}</p>
            <p className="text-xl mt-4">{product.tags.join(`, `)}</p>
            <div className="mt-8 flex items-center">
              <div className="text-lg font-extrabold">Rp</div>
              <p className="text-2xl font-extrabold">
                {product.price.toLocaleString()}
              </p>
            </div>
            <p className="text-lg mt-4">1000 orang telah membeli produk ini</p>
          </div>
          <div>
            <WishListDetailButton productId={product._id as string} />
            <div className=" py-6 px-4 border-y-2">
              <p className="text-sm font-extrabold">
                Cash on Delivery (Bayar tunai saat pesanan tiba)
              </p>
              <p className="text-sm font-extrabold">Pelajari lebih lanjut.</p>
            </div>
            <div className="py-6 px-4 border-b-2">
              <p className="text-sm font-extrabold">
                Ongkir mulai dari Rp 29.000
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
