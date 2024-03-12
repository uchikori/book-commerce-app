"use client";
import { getProviders, signOut } from "next-auth/react";
import { signIn } from "next-auth/react";
// eslint-disable-next-line @next/next/no-async-client-component
const Login = async () => {
  const providers = await getProviders().then((res) => {
    console.log(res);
    return res;
  });

  return (
    <div className="flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            アカウントにログイン
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          {providers &&
            Object.values(providers).map((provider) => {
              return (
                <div className="text-center" key={provider.id}>
                  <button
                    onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                    className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center w-full"
                  >
                    <span>{provider.name}でログイン</span>
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Login;
