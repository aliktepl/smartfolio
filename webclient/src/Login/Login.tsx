import {SetStateAction, useState} from 'react';
import Logo from "../assets/Logo.tsx";
import {Link, useNavigate} from "react-router-dom";
import {AuthProvider} from "../Authentication/AuthProvider.tsx";
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {ModeToggle} from "@/components/mode-toggle.tsx";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setPassword(e.target.value);
    }

    async function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        // Handle login logic here
        await AuthProvider.signIn(email)
        navigate('/', {replace: true});
    }

    return (
        <div className='flex h-screen items-center'>
            <div className='hidden'><ModeToggle/></div>
            <Card className="mx-auto w-full max-w-sm">
                <CardHeader>
                    <CardTitle>
                        <div className="mb-6 flex justify-center">
                            <Logo/>
                        </div>
                        <h2 className="font-bold text-center mb-6">Welcome to SmartFolio</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={email} onChange={handleEmailChange}
                                       placeholder="m@example.com" required/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" value={password} onChange={handlePasswordChange}
                                       placeholder="Enter your password" required/>
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link to={'/signup'} className="underline">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login;