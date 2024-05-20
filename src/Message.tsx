import { FC, useContext, useState } from 'react';
import { truncate } from 'lodash';

import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { AuthContext } from './context/AuthContext';

const Message: FC = () => {
  const { userReceivedMessages, readMessage } = useContext(AuthContext) || {};

  const navigate = useNavigate();

  return (
    <div className="bg-blue-100 min-h-screen w-full ">
      <div className="w-full max-w-[900px] m-auto border bg-blue-700 text-[#fff] min-h-screen px-8 py-12">
        <div className="my-4">
          <FaArrowLeftLong
            size={20}
            onClick={() => navigate('/')}
            className="cursor-pointer"
          />
        </div>
        <h2 className="font-bold lg:text-[2rem] text-[1.5rem] mb-6">
          Messages
        </h2>
        {userReceivedMessages &&
          userReceivedMessages?.map((item, index: number) => (
            <div
              key={index}
              className={`${
                item?.isRead ? 'bg-[grey] text-[#fff]' : 'bg-white'
              } w-full  p-2 mb-2`}
              onClick={() => {
                if (readMessage) {
                  readMessage(item?._id);
                  navigate(`/messages/${item?._id}`);
                }
              }}
            >
              <div className="flex gap-4">
                <h4 className="font-semibold">{item.subject}</h4>
              </div>
              <p className="text-[.9rem] cursor-pointer">
                {truncate(item.content, { length: 25, omission: '...' })}
              </p>
            </div>
          ))}

        {!userReceivedMessages?.length && (
          <div>
            <p className="text-center text-[#909090]">No Messages Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
