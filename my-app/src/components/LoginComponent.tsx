import { handleLogin } from "@/app/login/action";
import { ClientFlashParams } from "@/components/ClientFlashError";
import Link from "next/link";

const LoginComponent = () => {
  return (
    <>
      <ClientFlashParams />
      <div className="mx-[48px] flex-1 flex pt-12">
        <div className="flex-1 flex justify-center items-center">
          <p className="text-justify text-3xl m-36 font-bold leading-loose">
            Silahkan Masuk ke Akun AEKI Family Anda
          </p>
        </div>
        <div className="flex-1 bg-slate-100 flex flex-col items-center">
          <div className=" w-4/5 my-[10%]">
            <form className="flex flex-col" action={handleLogin}>
              <label className="text-xl my-4">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <label className="text-xl my-4">Kata Sandi</label>
              <input
                type="Password"
                name="password"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <button className="btn btn-active btn-primary bg-blue-400 border-none rounded-full mt-8 text-white">
                Masuk
              </button>
            </form>
            <div className="flex justify-center mt-8">
              <Link href={"/register"} className="text-blue-800">
                Daftar Sekarang?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginComponent;
