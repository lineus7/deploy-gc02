import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | GC-02",
    default: "GC-02",
  },
  description: "The official Next.js Learn Dashboard built with App Router.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col justify-between">
          <div className="flex flex-col pb-12 flex-1">
            <Navbar />
            {children}
          </div>
          {/* FOOTER */}
          <div className=" px-[48px] h-[65px] bg-[#F5F5F5] flex items-center border-t-2 justify-between">
            <div>
              <p className="text-xs">© Inter AEKI Systems B.V. 2014 - 2024</p>
            </div>
            <div>
              <ul className="flex text-xs gap-4">
                <li className="">Kebijakan privasi</li>
                <li className="">Pembatasan Tanggung Jawab</li>
                <li className="">Pengungkapan yang Bertanggung Jawab</li>
                <li className="">Kebijakan Cookie</li>
              </ul>
            </div>
          </div>
          {/* FOOTER END */}
        </div>
      </body>
    </html>
  );
}
