import Logo from "@/assets/Logo.tsx";
import {redirect} from "react-router-dom";
import {AuthProvider} from "@/Authentication/AuthProvider.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {Button} from "@/components/ui/button.tsx";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
    if (AuthProvider.isAuthenticated) {
        return redirect("/");
    }
    return null;
}

function Login() {
    async function handleLoginSuccess() {
        window.location.href = 'http://localhost:3000/auth/google';
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
                <CardContent>
                    <Button onClick={handleLoginSuccess}>
                        Login with Google
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login;