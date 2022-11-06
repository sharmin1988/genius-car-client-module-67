import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import { JwtToken } from '../../../api/JWTtoken';

const GoogleLogin = () => {
    const { googleSignIn, } = useContext(AuthContext)
    const googleProvider = new GoogleAuthProvider()

    const handelGoogleSignIn = () => {
        googleSignIn(googleProvider)
            .then(result => {
                const user = result.user
                JwtToken(user)
            })
            .catch(error => console.error(error))
    }

    return (
        <div className='text-center'>
            <p><small>Or login With</small></p>
            <button onClick={handelGoogleSignIn} className='btn btn-ghost btn-outline w-full mt-2'>GOOGLE</button>
        </div>
    );
};

export default GoogleLogin;