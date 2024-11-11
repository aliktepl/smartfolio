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
import {SetStateAction, useEffect, useState} from "react";

// @ts-ignore
export async function loader({params}) {
    const responseCoin = await fetch(`http://localhost:3000/api/coins/${params.coinId.toUpperCase()}`, {
        credentials: "include",
    });
    const resCoin = await responseCoin.json()
    const responseWallet = await fetch("http://localhost:3000/api/wallet", {
        credentials: "include", // Ensures cookies are sent with the request
    });
    const resWallet = await responseWallet.json()

    return [resCoin, resWallet];
}

function Coin() {

    // @ts-ignore
    const [coin, wallet] = useLoaderData()
    console.log(coin[0].name);
    console.log(wallet)
    const [amount, setAmount] = useState('');
    const navigate = useNavigate();

    const hasCoin = wallet.some((item: { symbol: string; }) => item.symbol === coin[0].symbol);

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        const value = event.target.value
        if (value === '' || parseFloat(value as string) > 0) {
            setAmount(value); // Set the amount if it's positive or empty
        }
    };

    useEffect(() => {
        // Check if the user is authenticated
        const checkAuthStatus = async () => {
            const response = await fetch("http://localhost:3000/api/user", {
                credentials: "include",
            });

            if (response.status === 401) {
                navigate('/login', {replace: true});
            }
        };
        checkAuthStatus().then(() => {
        });
    }, [navigate]);

    const addCoinToWallet = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/wallet/${coin[0].symbol}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Include cookies if necessary for authentication
                body: JSON.stringify({amount: parseFloat(amount)}) // Send the amount in the body
            });
            if(response.ok) {
                return navigate(`/${coin[0].symbol}`)
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const removeCoinFromWallet = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/wallet/${coin[0].symbol}`, {
                method: "DELETE",
                credentials: "include"
            });
            if(response.ok) {
                console.log('here')
                return navigate(`/${coin[0].symbol}`);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            {/*header*/}
            <div className="flex items-center justify-between py-2 px-4">
                <div className="hidden">
                    <ModeToggle/>
                </div>
                <span className="flex-grow text-center">
                    {coin[0].name}
                </span>
                {/*Wallet dialog*/}
                <Dialog>
                    {hasCoin ?
                        <Button onClick={removeCoinFromWallet} variant='destructive'>
                            - Remove From Wallet
                        </Button> :
                        <DialogTrigger>
                            <Button>
                            + Add To Wallet
                            </Button>
                        </DialogTrigger>}
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Insert amount to add</DialogTitle>
                            <DialogDescription>
                                How much of the coin do you want to add to the wallet?
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center space-x-2">
                            <div className="flex-1">
                                <Input type="number" id="amount" value={amount} onChange={handleChange}
                                       placeholder="Insert amount"/>
                            </div>
                            <DialogClose asChild>
                                <Button onClick={addCoinToWallet}>
                                    Add
                                </Button>
                            </DialogClose>
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
                    <h1>Technical Analysis</h1>
                    <div>
                        Chart
                    </div>
                </div>
                <div className={'justify-self-center'}>
                    <h1>Sentiment Analysis</h1>
                    <div>
                        Chart
                    </div>
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