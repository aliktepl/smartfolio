import {SetStateAction, useState} from 'react';
import Logo from "../assets/Logo.tsx";
import {Link, useNavigate} from "react-router-dom";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleNameChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Handle login logic here
        navigate('/login')
    }

    return (
        <div className='flex h-screen items-center'>
            <Card className="mx-auto w-full max-w-sm">
                <CardHeader>
                    <CardTitle>
                        <div className="mb-6 flex justify-center">
                            <Logo/>
                        </div>
                        <h2 className="font-bold text-center mb-6">Sign Up</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" type="text" value={name} onChange={handleNameChange}
                                       placeholder="Enter your Name" required/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={email} onChange={handleEmailChange}
                                       placeholder="m@example.com" required/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" value={password} onChange={handlePasswordChange}
                                       placeholder="Enter your password"
                                       required/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword">Password Confirmation</Label>
                                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange}
                                       placeholder="Confirm your password" required/>
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link to={'/login'} className="underline">
                                Login here!
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Signup;