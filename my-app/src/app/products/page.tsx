import { Suspense } from "react";
import ProductsComponent from "./ProductsComponent";

const Page = () => {
  return (
    <>
      <Suspense>
        <ProductsComponent />
      </Suspense>
    </>
  );
};
export default Page;
