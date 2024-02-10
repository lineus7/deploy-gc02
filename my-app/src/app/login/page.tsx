import { LoginProtection } from "@/components/ServerProtectedComponent";
import LoginComponent from "@/components/LoginComponent";

const Page = () => {
  return (
    <>
      <LoginProtection>
        <LoginComponent />
      </LoginProtection>
    </>
  );
};
export default Page;
