import { useContext, useState } from 'react';
import Button from './components/Button';
import { FaArrowLeft } from 'react-icons/fa6';

import {
  AuthContext,
  UserReceivedMessagesInterface,
} from './context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { truncate } from 'lodash';

const MessageDetailScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const id = pathname.split('/')[2];

  const { userReceivedMessages } = useContext(AuthContext) || {};
  const [collapseMessage, setCollapseMessage] = useState<boolean>(false);

  return (
    <div className="w-full max-w-[900px] m-auto border bg-blue-500 text-[#fff] min-h-screen px-8 py-12">
      <div className="ml-auto cursor-pointer my-8">
        <FaArrowLeft size={20} onClick={() => navigate('/messages')} />
      </div>
      {userReceivedMessages &&
        userReceivedMessages
          .filter((data: UserReceivedMessagesInterface) => data?._id === id)
          .map((message: UserReceivedMessagesInterface, index: number) => (
            <div
              key={index}
              onClick={() => setCollapseMessage((prev) => !prev)}
              className="bg-[grey] p-4"
            >
              {/* sender email */}
              <div className="font-bold mb-3">
                From : <span>{message?.sender_email}</span>
              </div>
              {/* message title */}
              <p className="font-semibold mb-1">
                Subject: <span>{message?.subject}</span>
              </p>
              {/* content or message body */}
              <article className="cursor-pointer">
                <p>
                  {' '}
                  {collapseMessage
                    ? message?.content
                    : truncate(message?.content, {
                        length: 25,
                        omission: '...',
                      })}
                </p>
              </article>
            </div>
          ))}
      <SendMessage />
    </div>
  );
};

const SendMessage = () => {
  const {
    user,
    sendEmail,
    sendingEmailLoading,
    messageDetails,
    updateMessageDetails,
    emailSendingError,
    emailSendingMessage,
  } = useContext(AuthContext) || {};

  const navigate = useNavigate();

  return (
    <div className="mt-6">
      <h2 className="font-semibold  text-[1.1rem] mb-6 text-center">
        Send Email
      </h2>
      {emailSendingError && (
        <div className="my-6">
          <p className="text-center text-[red] text-[.8rem]">
            {emailSendingError}
          </p>
        </div>
      )}

      {emailSendingMessage && (
        <div className="my-6">
          <p className="text-center text-[#fff] text-[.8rem]">
            {emailSendingMessage}
          </p>
        </div>
      )}
      <form onSubmit={sendEmail}>
        {/* to */}
        <div className="mb-4 flex flex-col lg:flex-row gap-2">
          <label htmlFor="to">To :</label>
          <input
            type="email"
            name="to"
            id="to"
            value={messageDetails?.receiver_email}
            onChange={(e) =>
              updateMessageDetails &&
              updateMessageDetails({
                ...messageDetails,
                receiver_email: e.target.value,
                content: messageDetails?.content || '',
                sender_email: messageDetails?.sender_email || '',
                subject: messageDetails?.subject || '',
              })
            }
            placeholder="To :"
            className="rounded-md w-full md:w-[25rem] px-2 py-2 border bg-inherit"
          />
        </div>
        {/* from */}
        <div className="mb-4 flex flex-col lg:flex-row gap-2">
          <label htmlFor="from">From :</label>
          <input
            type="email"
            name="from"
            id="from"
            value={messageDetails?.sender_email}
            onChange={(e) =>
              updateMessageDetails &&
              updateMessageDetails({
                ...messageDetails,
                sender_email: user?.userDetails?.user?.email || e.target.value,
                receiver_email: messageDetails?.receiver_email || '',
                content: messageDetails?.content || '',
                subject: messageDetails?.subject || '',
              })
            }
            placeholder="From"
            className="rounded-md w-full md:w-[25rem] px-2 py-2 border bg-inherit"
          />
        </div>
        {/* title */}
        <div className="mb-4 flex flex-col lg:flex-row gap-2">
          <label htmlFor="title">Subject :</label>
          <input
            type="text"
            name="subject"
            id="subject"
            value={messageDetails?.subject}
            onChange={(e) =>
              updateMessageDetails &&
              updateMessageDetails({
                ...messageDetails,
                subject: e.target.value,
                content: messageDetails?.content || '',
                receiver_email: messageDetails?.receiver_email || '',
                sender_email: messageDetails?.sender_email || '',
              })
            }
            placeholder="Title ..."
            className="rounded-md w-full md:w-[25rem] px-2 py-2 border bg-inherit"
          />
        </div>
        {/* content */}
        <div className="mb-4 flex flex-col lg:flex-row gap-2">
          <textarea
            name="content"
            id="content"
            value={messageDetails?.content}
            onChange={(e) =>
              updateMessageDetails &&
              updateMessageDetails({
                ...messageDetails,
                content: e.target.value,
                receiver_email: messageDetails?.receiver_email || '',
                sender_email: messageDetails?.sender_email || '',
                subject: messageDetails?.subject || '',
              })
            }
            className="h-[20rem] w-full lg:w-[40rem] p-4 border bg-inherit"
            placeholder="Content..."
          ></textarea>
        </div>
        {/* submit */}
        <div className="flex gap-3">
          <div>
            <Button
              type="submit"
              variant="primary"
              isLoading={sendingEmailLoading}
              disabled={
                !messageDetails?.content ||
                !messageDetails?.receiver_email ||
                !messageDetails?.subject
              }
              className={`${
                messageDetails?.content === '' ||
                messageDetails?.receiver_email === '' ||
                (messageDetails?.subject === ''
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer')
              }`}
            >
              send
            </Button>
          </div>

          <div>
            <Button onClick={() => navigate('/messages')}>back</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageDetailScreen;
