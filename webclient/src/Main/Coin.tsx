import {useLoaderData} from "react-router-dom";

export async function loader({params}) {
    return params.coinId;
}

function Coin() {
    const loaderData = useLoaderData();

    return (
        <>
            {/*header*/}
            <div className="flex items-center justify-between py-2 px-4">
            <span className="relative right-0 justify-self-center text-white font-semibold">
                {loaderData}
            </span>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    + Add To Wallet
                </button>
            </div>
            {/*charts*/}
            <div className={'grid grid-cols-2 text-white font-semibold'}>
                <div className={'justify-self-center'}>
                    technical
                </div>
                <div className={'justify-self-center'}>
                    sentiment
                </div>
            </div>
            {/*sentiment breakdown*/}
            <div className={'flex justify-center  font-semibold text-white'}>
                sentiment breakdown
            </div>
        </>
    );
}

export default Coin;