'use client';
import { useContext, useState } from 'react';
import { FaRegEyeSlash } from 'react-icons/fa';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { AuthContext } from './context/AuthContext';
import Button from './components/Button';
const Login = () => {
  const { login, setLogin, loginError, isLoginLoading, loginUser } =
    useContext(AuthContext) || {};
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-blue-100">
      <div className="w-full max-w-[660px] m-auto border flex items-center justify-center flex-col min-h-screen bg-blue-400 px-4">
        <h2 className="text-center text-3xl font-bold text-[#fff] mb-6">
          Email App
        </h2>
        <h2 className="text-center text-2xl font-bold text-[#fff]">Login</h2>

        {/* form starts */}
        <form className="w-full" onSubmit={loginUser}>
          {/* api error messages */}
          {loginError && (
            <div className="my-6">
              <p className="text-center text-[.9rem] text-[#fff]">
                {loginError}
              </p>
            </div>
          )}
          {/* email */}
          <div className="w-full mb-4">
            <label htmlFor="email" className="mb-2 font-semibold">
              Email
            </label>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                value={login?.email}
                onChange={(e) =>
                  setLogin &&
                  setLogin({
                    ...login,
                    email: e.target.value,
                    password: login?.password || '',
                  })
                }
                placeholder="Enter First Name"
                className="border-2 w-full  px-4 py-2 rounded-md "
              />
            </div>
          </div>
          {/* password */}
          <div className=" mb-4">
            <label htmlFor="password" className="mb-2 font-semibold">
              Password
            </label>
            <div className="relative w-full ">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={login?.password}
                onChange={(e) =>
                  setLogin &&
                  setLogin({
                    ...login,
                    password: e.target.value,
                    email: login?.email || '',
                  })
                }
                className="border-2 w-full  px-4 py-2 rounded-md "
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                {showPassword ? (
                  <MdOutlineRemoveRedEye
                    className="mr-4 fill-[green] cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                ) : (
                  <FaRegEyeSlash
                    className="mr-4 cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                )}{' '}
              </div>
            </div>
          </div>
          {/* submit button */}
          <div className="text-center mt-8">
            <Button
              type="submit"
              isLoading={isLoginLoading}
              className="text-black"
              disabled={!login?.email || !login?.password}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
