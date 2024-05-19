import React, { useContext, useState } from 'react';
import { FaRegEyeSlash } from 'react-icons/fa';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import Button from './components/Button';
import { AuthContext } from './context/AuthContext';

export interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Register = () => {
  const { isRegisterLoading, registerUser, updateRegisterInfo, registerInfo } =
    useContext(AuthContext) || {};

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-[#babac0]">
      <div className="w-full max-w-[660px] m-auto border flex items-center justify-center flex-col min-h-screen bg-[grey] px-4">
        <div className="max-w-md m-auto w-full space-y-8">
          <div>
            <h2 className="text-center text-3xl font-bold text-[#f3f5f3] mb-6">
              Email App
            </h2>
            <h2 className="text-center text-2xl font-bold text-[#f3f5f3]">
              Sign up
            </h2>
            <form className="w-full  " onSubmit={registerUser}>
              <div className="w-full mb-2">
                <label htmlFor="firstName" className="mb-2 font-semibold">
                  First Name
                </label>
                <div>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={registerInfo?.firstName}
                    onChange={(e) =>
                      updateRegisterInfo &&
                      updateRegisterInfo({
                        ...registerInfo,
                        firstName: e.target.value,
                        lastName: registerInfo?.lastName || '',
                        email: registerInfo?.email || '',
                        password: registerInfo?.password || '',
                      })
                    }
                    placeholder="Enter First Name"
                    className="border-2 w-full  px-4 py-2 rounded-md bg-[#909090] text-[#000] cursor-[red] "
                  />
                </div>
              </div>
              <div className="w-full mb-2">
                <label htmlFor="lastName" className="mb-2 font-semibold">
                  Last Name
                </label>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={registerInfo?.lastName}
                    onChange={(e) =>
                      updateRegisterInfo &&
                      updateRegisterInfo({
                        ...registerInfo,
                        firstName: registerInfo?.firstName || '',
                        lastName: e.target.value,
                        email: registerInfo?.email || '',
                        password: registerInfo?.password || '',
                      })
                    }
                    placeholder="Enter First Name"
                    className="border-2 w-full px-4 py-2 rounded-md bg-[#909090] text-[#000]"
                  />
                </div>
              </div>
              <div className="w-full mb-2">
                <label htmlFor="email" className="mb-2 font-semibold">
                  Email
                </label>
                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={registerInfo?.email}
                    onChange={(e) =>
                      updateRegisterInfo &&
                      updateRegisterInfo({
                        ...registerInfo,
                        firstName: registerInfo?.firstName || '',
                        lastName: registerInfo?.lastName || '',
                        email: e.target.value,
                        password: registerInfo?.password || '',
                      })
                    }
                    placeholder="Enter First Name"
                    className="border-2 w-full  px-4 py-2 rounded-md bg-[#909090] text-[#000]"
                  />
                </div>
              </div>

              <div className=" mb-2">
                <label htmlFor="password" className="mb-2 font-semibold">
                  Password
                </label>
                <div className="relative w-full ">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    value={registerInfo?.password}
                    onChange={(e) =>
                      updateRegisterInfo &&
                      updateRegisterInfo({
                        ...registerInfo,
                        firstName: registerInfo?.firstName || '',
                        lastName: registerInfo?.lastName || '',
                        email: registerInfo?.email || '',
                        password: e.target.value,
                      })
                    }
                    className="border-2 w-full  px-4 py-2 rounded-md bg-[#909090] text-[#000]"
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

              <div className="text-center my-4">
                <Button type="submit" isLoading={isRegisterLoading}>
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;