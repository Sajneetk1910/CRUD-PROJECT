import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const handleLoginSuccess = async (credentialResponse) => {
    console.log("login ho raha hai");
    const decoded = jwtDecode(credentialResponse.credential);
    console.log(credentialResponse);
    const user = {
      id: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture
    };

    console.log("Google user decoded:", user);

    try {
      const checkRes = await fetch(`http://localhost:3001/users?id=${user.id}`);
      const existingUsers = await checkRes.json();
      if (existingUsers.length === 0) {
        await fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user)
        });
        console.log('User saved to db.json');
      } else {
        console.log('User already exists in db.json');
      }
    } catch (err) {
      console.error('Error interacting with db.json:', err);
    }
  };

  return (
    <GoogleOAuthProvider clientId="575735354732-a1phvefjqu6a2kulnrp0c659ck10inmh.apps.googleusercontent.com">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-white px-4">
        <h2 className="text-2xl font-semibold text-gray-700 mb-8 text-center">
          Welcome! Please sign in here to view  to Books listing
        </h2>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => console.error('Login failed')}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
