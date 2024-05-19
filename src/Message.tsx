import { FC, useContext, useState } from 'react';
import { truncate } from 'lodash';
import Button from './components/Button';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { AuthContext } from './context/AuthContext';
import { GrStatusGood } from 'react-icons/gr';

const Message: FC = () => {
  const { userReceivedMessages, readMessage, updateClickedMessage } =
    useContext(AuthContext) || {};

  const navigate = useNavigate();
  const [collapseIndex, setCollapseIndex] = useState<number | null>(null);

  const handleCollapse = (index: number) => {
    setCollapseIndex(index === collapseIndex ? null : index);
  };

  return (
    <div className="bg-[#babac0] min-h-screen">
      <div className="w-full max-w-[900px] m-auto border bg-[#312e2e] text-[#fff] min-h-screen px-8 py-12">
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
              className="border-b-2 border-[grey] mb-4 max-w-max"
              onClick={() => {
                handleCollapse(index);
                if (updateClickedMessage) {
                  updateClickedMessage(item?._id);
                }
              }}
            >
              <div className="flex gap-4">
                <h4 className="font-semibold">{item.subject}</h4>
                {item?.isRead && (
                  <GrStatusGood size={15} className="fill-[green]" />
                )}
              </div>
              <p className="text-[.9rem] cursor-pointer">
                {collapseIndex === index
                  ? item.content
                  : truncate(item.content, { length: 5, omission: '...' })}
                <span className="ml-4">
                  {collapseIndex === index || item.content.length <= 20 ? (
                    <button className="bg-[#bb6868] text-[#fff] rounded-md px-3">
                      close
                    </button>
                  ) : (
                    <button
                      className="bg-[green] text-[#fff] rounded-md px-3 "
                      onClick={readMessage}
                    >
                      view
                    </button>
                  )}
                </span>{' '}
              </p>
            </div>
          ))}

        {!userReceivedMessages?.length && (
          <div>
            <p className="text-center text-[#909090]">No Messages Found</p>
          </div>
        )}
        <SendMessage />
      </div>
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
            >
              send
            </Button>
          </div>

          <div>
            <Button onClick={() => navigate('/')}>back</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Message;
