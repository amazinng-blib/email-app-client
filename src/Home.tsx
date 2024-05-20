import { useContext, useEffect } from 'react';
import Button from './components/Button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const Home = () => {
  const navigate = useNavigate();

  const {
    userReceivedMessages,
    totalUnReadMessages,
    unReadMessageCount,
    user,
  } = useContext(AuthContext) || {};

  const totalMessages = userReceivedMessages && userReceivedMessages?.length;

  // todo: call the function that counts unRead messages inside useEffect so that
  // todo: whenever user get's new message, the count will be updating
  useEffect(() => {
    if (userReceivedMessages) {
      totalUnReadMessages && totalUnReadMessages();
    }
  }, [userReceivedMessages]);

  return (
    <div className="">
      <div className="w-full max-w-[660px] m-auto border flex items-center justify-center flex-col min-h-screen bg-blue-200 px-4">
        <h2 className=" font-bold text-[1.5rem] lg:text-[2rem] capitalize">
          {user?.userDetails?.user?.first_name}{' '}
          {user?.userDetails?.user?.last_name}
        </h2>

        <p className="my-6 font-semibold ">
          You have {unReadMessageCount} unread messages out of {totalMessages}{' '}
          total
        </p>
        <div className="flex gap-4 mt-6">
          <Button variant="primary" onClick={() => navigate('/messages')}>
            View
          </Button>
          <Button
            className="border border-blue-800 text-blue-600"
            onClick={() =>
              navigate(`/messages/${user?.userDetails?.user?._id}`)
            }
          >
            Compose
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
