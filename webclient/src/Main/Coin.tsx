import { useParams } from "react-router-dom";

function Coin() {
    const  {coinId}  = useParams();
    return (
        <div className="flex items-center justify-between py-2 px-4">
            <span className="relative right-0 justify-self-center text-white font-semibold">
                {coinId}
            </span>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                + Add To Wallet
            </button>
        </div>
    );
}

export default Coin;