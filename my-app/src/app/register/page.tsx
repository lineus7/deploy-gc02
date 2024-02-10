import { LoginProtection } from "@/components/ServerProtectedComponent";
import RegisterPage from "@/components/RegisterComponent";

const Page = () => {
  return (
    <>
      <LoginProtection>
        <RegisterPage />
      </LoginProtection>
    </>
  );
};
export default Page;
