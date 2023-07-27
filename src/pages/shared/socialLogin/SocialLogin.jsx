import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';

const SocialLogin = () => {
    const { signINWithGoogle } = useContext(AuthContext);


    //signINWithGoogle
    const handleGoogleSIgnIn = () => {
        signINWithGoogle()
            .then(res => {
                console.log(res.user);
            })
            .catch(err => {
                console.log(err.message);
            })
    }
    return (
        <div>
            <div className="divider">OR</div>
            <div className='text-center'>
                <button onClick={handleGoogleSIgnIn} className="btn btn-circle btn-outline btn-accent">
                    G
                </button>

            </div>
        </div>
    );
};

export default SocialLogin;