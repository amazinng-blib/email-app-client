import { useContext, useEffect, useState } from 'react';
import { FaRegEyeSlash } from 'react-icons/fa';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import Button from './components/Button';
import { AuthContext } from './context/AuthContext';

const Register = () => {
  const {
    isRegisterLoading,
    registerUser,
    updateRegisterInfo,
    registerInfo,
    registerError,
  } = useContext(AuthContext) || {};

  const [showPassword, setShowPassword] = useState(false);

  const endDateStr = '22-07-2024'; // sub_end_date
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth() + 1;
  const todayYear = today.getFullYear();

  const [endDay, endMonth, endYear] = endDateStr.split('-').map(Number);
  console.log({ endDay, endMonth, endYear });
  console.log({ todayDate, todayMonth, todayYear });

  const isDate = Boolean(
    todayDate === endDay && todayMonth === endMonth && todayYear === endYear
  );

  useEffect(() => {
    if (
      todayDate === endDay &&
      todayMonth === endMonth &&
      todayYear === endYear
    ) {
      // Invoke API call here

      console.log('Today is the end date. Invoking API call.');
    } else {
      console.log('Today is not the end date.');
    }
  }, [isDate]);

  return (
    <div className="bg-blue-100">
      <div className="w-full max-w-[660px] m-auto border flex items-center justify-center flex-col min-h-screen bg-blue-400 px-4">
        <h2 className="text-center text-3xl font-bold text-[#fff] mb-6">
          Email App
        </h2>
        <h2 className="text-center text-2xl font-bold text-[#fff]">Sign up</h2>
        {/*register form */}
        <form className="w-full" onSubmit={registerUser}>
          {/* api error messages */}
          {registerError && (
            <div className="my-6">
              <p className="text-center text-[.9rem] text-[#fff]">
                {registerError}
              </p>
            </div>
          )}
          {/* first name */}

          <div className="w-full mb-4">
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
                className="border-2 w-full  px-4 py-2 rounded-md  cursor-[red] "
              />
            </div>
          </div>
          {/* last name */}
          <div className="w-full mb-4">
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
                className="border-2 w-full px-4 py-2 rounded-md "
              />
            </div>
          </div>
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
          <div className="text-center my-4">
            <Button
              type="submit"
              isLoading={isRegisterLoading}
              className="text-black"
              disabled={
                !registerInfo?.lastName ||
                !registerInfo?.firstName ||
                !registerInfo?.email ||
                !registerInfo?.password
              }
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
