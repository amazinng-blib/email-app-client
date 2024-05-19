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
    <div className="bg-[#babac0]">
      <div className="w-full max-w-[660px] m-auto border flex items-center justify-center flex-col min-h-screen bg-[grey] px-4">
        <h2 className="my-8 font-bold text-[1.5rem] lg:text-[2rem] capitalize">
          {user?.userDetails?.user?.first_name}{' '}
          {user?.userDetails?.user?.last_name}
        </h2>

        <p className="my-6 font-semibold text-[#e6e0e0]">
          You have {unReadMessageCount} unread messages out of {totalMessages}{' '}
          total
        </p>
        <div>
          <Button variant="primary" onClick={() => navigate('/messages')}>
            View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
