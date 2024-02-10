"use client";
import Link from "next/link";
import { ClientFlashParams } from "@/components/ClientFlashError";
import Swal from "sweetalert2";
import { handleRegister } from "@/app/register/action";

const RegisterPage = () => {
  return (
    <>
      <div className="mx-[48px] flex-1 flex pt-12">
        <div className="flex-1 flex flex-col justify-center items-center">
          <p className="text-justify text-3xl m-36 mt-8 font-bold leading-loose">
            Buat Akun AEKI Family Anda
          </p>
        </div>
        <div className="flex-1 bg-slate-100 flex flex-col items-center">
          <div className=" w-4/5 my-[10%]">
            <form
              className="flex flex-col"
              action={async (formData) => {
                Swal.showLoading();
                await handleRegister(formData);
                Swal.hideLoading;
              }}
            >
              <ClientFlashParams />
              <label className="text-xl my-4">Email</label>
              <input
                type="email"
                placeholder="Type here"
                className="input input-bordered w-full"
                name="email"
              />
              <label className="text-xl my-4">Username</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                name="username"
              />
              <label className="text-xl my-4">Nama</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                name="name"
              />
              <label className="text-xl my-4">Kata Sandi</label>
              <input
                type="password"
                placeholder="Type here"
                name="password"
                className="input input-bordered w-full"
              />
              <button className="btn btn-active btn-primary bg-blue-400 border-none rounded-full mt-8 text-white">
                Daftar Sekarang
              </button>
            </form>
            <div className="flex justify-center mt-8">
              <Link href={"/login"} className="text-blue-800">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RegisterPage;
