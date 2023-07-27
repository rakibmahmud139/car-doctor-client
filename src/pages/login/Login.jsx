import React, { useContext } from 'react';
import img from '../../../assets/images/login/login.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import SocialLogin from '../shared/socialLogin/SocialLogin';

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        loginUser(email, password)
            .then(res => {
                const user = res.user;
                console.log(user);
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.log(err.message);
            })


    }



    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="mr-16 w-1/2">
                    <img src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-5xl font-bold text-center mb-4 text-accent">Login!</h1>
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name='email' placeholder="email"
                                    required className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password"
                                    required className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-accent" type="submit" value="Login" />
                            </div>
                        </form>
                        <p className='my-4 text-center'>New To Cars Doctor? <Link className='text-accent font-bold' to='/signup'>Sign Up</Link></p>
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;