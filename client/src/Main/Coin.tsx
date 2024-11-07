import {useLoaderData, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {useEffect} from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line react-refresh/only-export-components
export async function loader({params}) {
    // should fetch coin data
    return params.coinId;
}

function Coin() {

    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is authenticated (e.g., by making an API call or checking cookies)
        const checkAuthStatus = async () => {
            const response = await fetch("http://localhost:3000/api/user", {
                credentials: "include",
            });

            if (response.status === 401) {
                navigate('/login', { replace: true }); // Redirect to login if unauthorized
            }
        };

        checkAuthStatus().then(() => {});
    }, [navigate]);

    const coinId = useLoaderData() as string;

    return (
        <>
            {/*header*/}
            <div className="flex items-center justify-between py-2 px-4">
                <div className="hidden">
                    <ModeToggle/>
                </div>
                <span className="flex-grow text-center">
                    {coinId.toUpperCase()}
                </span>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            + Add To Wallet
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Insert amount to add</DialogTitle>
                            <DialogDescription>
                                How much of the coin do you want to add to the wallet?
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center space-x-2">
                            <div className="flex-1">
                                <Input id="link" placeholder="Insert amount"/>
                            </div>
                            <Button type="submit">
                                Add
                            </Button>
                        </div>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            {/*charts*/}
            <div className={'grid grid-cols-2'}>
                <div className={'justify-self-center'}>
                    technical
                </div>
                <div className={'justify-self-center'}>
                    sentiment
                </div>
            </div>
            {/*sentiment breakdown*/}
            <div className={'flex justify-center'}>
                sentiment breakdown
            </div>
        </>
    );
}

export default Coin;