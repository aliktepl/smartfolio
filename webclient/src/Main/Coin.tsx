import {useLoaderData} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {ModeToggle} from "@/components/mode-toggle.tsx";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export async function loader({params}) {
    return params.coinId;
}

function Coin() {
    const loaderData = useLoaderData() as string;

    return (
        <>
            {/*header*/}
            <div className="flex items-center justify-between py-2 px-4">
                <div className='hidden'><ModeToggle/></div>
                <span className="relative right-0 justify-self-center">
                    {loaderData}
                </span>
                <Button>+ Add To Wallet</Button>
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