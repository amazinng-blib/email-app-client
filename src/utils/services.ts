// Define a type for the request body
type RequestBody = Record<string, any>;
export const baseUrl = 'https://email-app-server.vercel.app/api/v1';

export const postRequest = async (
  url: string,
  body: RequestBody,
  token?: string
) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    let message;
    if (data?.message) {
      message = data?.message;
    } else {
      message = data;
    }
    return { error: true, message };
  }
  return data;
};

export const getRequest = async (url: string, token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    let message = 'An error occurred';

    if (data?.message) {
      message = data?.message;
    } else {
      message = data;
    }
    return { error: true, message };
  }

  return data;
};

export const putRequest = async (url: string, token?: string, body?: any) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  });

  const responseData = await response.json();

  if (!response.ok) {
    let errorMessage = 'An error occurred';

    if (responseData?.message) {
      errorMessage = responseData?.message;
    } else {
      errorMessage = responseData;
    }

    return { error: true, message: errorMessage };
  }

  return responseData;
};
