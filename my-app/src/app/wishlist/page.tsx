import { ServerProtected } from "@/components/ServerProtectedComponent";
import WishlistClientComponent from "@/components/WishlistClientComponent";

const Page = async () => {
  return (
    <>
      <ServerProtected>
        <WishlistClientComponent />
      </ServerProtected>
    </>
  );
};
export default Page;
