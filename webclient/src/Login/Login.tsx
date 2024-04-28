import {SetStateAction, useState} from 'react';
import Logo from "../assets/Logo.tsx";
import {Link, useNavigate} from "react-router-dom";
import {AuthProvider} from "../Authentication/AuthProvider.tsx";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Get the navigate function

    const handleEmailChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setPassword(e.target.value);
    };

    async function handleSubmit (e: { preventDefault: () => void; }) {
        e.preventDefault();
        // Handle login logic here
        await AuthProvider.signIn(email)
        navigate('/', {replace: true});
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full bg-sidebar rounded-lg shadow-md p-8">
                <div className="mb-6 flex justify-center">
                    <Logo/>
                </div>
                <h2 className="text-3xl font-bold text-center mb-6">Welcome to SmartFolio</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-300 font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Enter your email address"
                            className="w-full px-3 py-2 rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-300 font-bold mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Enter your Password"
                                className="w-full px-3 py-2 rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mb-6">
                        <span className="pr-1">Don't have an account yet?</span>
                        <Link to={'/signup'} className="text-blue-500 hover:text-blue-400 focus:outline-none">
                            Sign Up Here!
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 rounded-3xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;