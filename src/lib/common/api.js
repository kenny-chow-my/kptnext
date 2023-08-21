import { signOut } from 'next-auth/react';

const api = async (url, options) => {
  const { body, headers, ...opts } = options;
  const requestBody = JSON.stringify(body);
  const response = await fetch(url, {
    body: requestBody,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...opts,
  });

  if(response.status == 403){
    console.log("Unauthorized. Logout the user", response);
    signOut({ callbackUrl: '/' });
    return  { status: response.status, data: null, error: response.status + ": " + response.statusText, url };
  }
  else if(response.status >= 400 ){
    console.log("Unknown error", response);
    return  { status: response.status, data: null, error: response.status + ": " + response.statusText, url };
  }

  const result = await response.json();
  return { status: response.status, data: result, url };
};

export default api;
