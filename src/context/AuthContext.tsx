import { createContext, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  baseUrl,
  getRequest,
  postRequest,
  putRequest,
} from '../utils/services';
import { UserInStorageType } from '../App';
type Props = {
  children: React.ReactNode;
};

export interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginInterface {
  email: string;
  password: string;
}

export interface MessageInterface {
  sender_email: string;
  receiver_email: string;
  subject: string;
  content: string;
}
export interface SentMailInterface {
  sender_email: string;
  receiver_email: string;
  subject: string;
  content: string;
  receiver_Id: string;
  sender_Id: string;
}

export interface UserReceivedMessagesInterface {
  sender_email: string;
  subject: string;
  content: string;
  _id: string;
  createdAt?: string;
  updatedAt?: string;
  isRead: boolean;
}

// context global object
export const AuthContext = createContext<{
  updateRegisterInfo: (info: UserInterface) => void;
  registerUser: (e: React.FormEvent) => Promise<void>;
  isRegisterLoading: boolean;
  registerError: string;
  registerInfo: UserInterface;
  login: LoginInterface;
  loginUser: (e: React.FormEvent) => void;
  setLogin: (info: LoginInterface) => void;
  isLoginLoading: boolean;
  loginError: string;
  userReceivedMessages: UserReceivedMessagesInterface[];
  updateMessageDetails: (details: MessageInterface) => void;
  sendEmail: (e: React.FormEvent) => Promise<void>;
  emailSendingMessage: string;
  emailSendingError: string;
  readMessage: (mail_id: string) => void;
  emailSendingSuccess: boolean;
  sendingEmailLoading: boolean;
  user: UserInStorageType | null;
  messageDetails: MessageInterface;
  totalUnReadMessages: () => void;
  unReadMessageCount: number;
} | null>(null);

export const AuthContextProvider = ({ children }: Props) => {
  const navigate = useNavigate();

  // todo: user states
  const [user, setUser] = useState<UserInStorageType | null>(() => {
    const storedUser = localStorage.getItem('User');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // todo: register state
  const [isRegisterLoading, setIsRegisterLoading] = useState<boolean>(false);
  const [registerInfo, setRegisterInfo] = useState<UserInterface>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });
  const [registerError, setRegisterError] = useState('');

  // todo: Login state

  const [login, setLogin] = useState<LoginInterface>({
    email: '',
    password: '',
  });

  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);

  const [loginError, setLoginError] = useState('');

  // todo:  message state
  const [userReceivedMessages, setUserReceivedUserMessages] = useState<
    UserReceivedMessagesInterface[]
  >([]);

  const [unReadMessageCount, setUnreadMessageCount] = useState<number>(0);

  const [isRead, setIsRead] = useState<boolean>(false);

  const [messageDetails, setMessageDetails] = useState<MessageInterface>({
    content: '',
    receiver_email: '',
    sender_email: user?.userDetails?.user?.email || '',
    subject: '',
  });

  const [sendingEmailLoading, setSendingEmailLoading] =
    useState<boolean>(false);

  const [emailSendingError, setEmailSendingError] = useState('');

  const [emailSendingMessage, setEmailSendingMessage] = useState('');

  const [emailSendingSuccess, setEmailSendingSuccess] =
    useState<boolean>(false);

  //todo: Update register info function
  const updateRegisterInfo = useCallback((info: UserInterface) => {
    setRegisterInfo(info);
  }, []);

  // todo: update message function
  const updateMessageDetails = useCallback((details: MessageInterface) => {
    setMessageDetails(details);
  }, []);

  // todo: total user unread Message function
  const totalUnReadMessages = useCallback(() => {
    // Check if userReceivedMessages is defined and has been fetched properly
    if (!userReceivedMessages) {
      return [];
    }
    // Filter out unread messages
    const unReadMessages = userReceivedMessages.filter((message) => {
      return !message.isRead;
    });
    const unReadCount = unReadMessages?.length;
    setUnreadMessageCount(unReadCount);
  }, [userReceivedMessages, isRead]);

  // todo: register User function
  const registerUser = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsRegisterLoading(true);

      try {
        const response = await postRequest(`${baseUrl}/register`, registerInfo);
        setIsRegisterLoading(false);
        if (response.error) {
          setRegisterError(response?.message);
          setTimeout(() => {
            setRegisterError('');
          }, 5000);
        } else {
          navigate('/login');
        }
      } catch (error: any) {
        setIsRegisterLoading(false);
        setRegisterError(error?.message);
        setTimeout(() => {
          setRegisterError('');
        }, 5000);
      }
    },
    [registerInfo, navigate]
  );

  // todo: register User function
  const loginUser = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoginLoading(true);

      try {
        const response = await postRequest(`${baseUrl}/login`, login);
        setIsLoginLoading(false);
        if (response.error) {
          setLoginError(response?.message);
          setTimeout(() => {
            setLoginError('');
          }, 5000);
        } else {
          setUser(response);
          localStorage.setItem('Email-User', JSON.stringify(response));
          setMessageDetails((prev) => ({
            ...prev,
            sender_email: response
              ? response?.userDetails?.user?.email
              : JSON.parse(localStorage.getItem('Email-User') || ''),
          }));
          navigate('/');
        }
      } catch (error: any) {
        setIsLoginLoading(false);
        setLoginError(error?.message);
        setTimeout(() => {
          setLoginError('');
        }, 5000);
      }
    },
    [login, navigate]
  );

  // todo: Get user messages function

  const getMessages = async () => {
    const getUserMessages = await getRequest(
      `${baseUrl}/get-user-messages?userId=${user?.userDetails?.user?._id}`,
      user?.userDetails?.token
    );
    if (getUserMessages.error) {
      return console.log('Error fetching users', getUserMessages);
    }

    setUserReceivedUserMessages(getUserMessages?.userMessages);
  };

  useEffect(() => {
    getMessages();
  }, [user?.userDetails?.user?._id]);

  // todo: Send mail function
  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailSendingError('');
    setEmailSendingMessage('');
    setSendingEmailLoading(true);
    setEmailSendingSuccess(false);

    try {
      const response = await postRequest(
        `${baseUrl}/send-mail`,
        messageDetails,
        user?.userDetails?.token
      );
      setSendingEmailLoading(false);

      if (response.mail) {
        getMessages();
        // Show the message for 5 seconds
        setEmailSendingMessage('Email sent');
        setTimeout(() => {
          setEmailSendingMessage('');
        }, 5000);
        setEmailSendingSuccess(true);
      } else {
        //  Show the message for 5 seconds
        setEmailSendingError('Not sent');
        setTimeout(() => {
          setEmailSendingError('');
        }, 5000);
      }
    } catch (error: any) {
      setSendingEmailLoading(false);
      //Show the message for 5 seconds
      setEmailSendingError(
        error.message || 'Unable to send email at the moment'
      );
      setTimeout(() => {
        setEmailSendingError('');
      }, 5000);
    }
  };

  // todo: toggle isRead to true

  const readMessage = async (mail_id: string) => {
    const mailId = {
      mailId: mail_id,
    };
    try {
      const response = await putRequest(
        `${baseUrl}/read-mail`,
        user?.userDetails?.token,
        mailId
      );

      if (response.message === 'Success') {
        getMessages();
        setIsRead(true);
      }
    } catch (error: any) {
      console.log({ error: error?.message });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        updateRegisterInfo,
        registerUser,
        isRegisterLoading,
        userReceivedMessages,
        updateMessageDetails,
        sendEmail,
        registerInfo,
        emailSendingSuccess,
        user,
        sendingEmailLoading,
        messageDetails,
        totalUnReadMessages,
        unReadMessageCount,
        readMessage,
        emailSendingError,
        emailSendingMessage,
        registerError,
        login,
        loginError,
        setLogin,
        isLoginLoading,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
