import Logo from "@/assets/Logo.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {replace} from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
    try {
        const response = await fetch("http://localhost:3000/api/user", {
            credentials: "include", // Ensures cookies are sent with the request
        });
        if (response.ok) {
            return replace("/");
        } else {
            return null
        }
    } catch (error) {
        console.error("Error connecting to server", error);
        return null;
    }
}

function Login() {
    const [isLoading, setIsLoading] = useState(false);

    function handleLogin() {
        setIsLoading(true);
        window.location.replace(`http://localhost:3000/api/auth/google`);
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
                        <h2 className="font-bold text-center">Welcome to SmartFolio</h2>
                    </CardTitle>
                </CardHeader>
                <CardContent className='flex justify-center'>
                    <Button onClick={handleLogin} disabled={isLoading}>
                        {isLoading ? 'Redirecting...' : 'Login with Google'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default Login;