from DB_service import insert_single_coin, insert_articles
from DB_queries import finish_DB_connection, create_tables





def insert_top_articles():
    insert_articles('cryptocurrency', "CRYPTO", 4)



def insert_coins():
    crypto_list = [
        ("Bitcoin", "BTC"),
        ("Ethereum", "ETH"),
        ("Tether", "USDT"),
        ("Binance Coin", "BNB"),
        ("USD Coin", "USDC"),
        ("XRP", "XRP"),
        ("Cardano", "ADA"),
        ("Solana", "SOL"),
        ("Dogecoin", "DOGE"),
        ("Polkadot", "DOT"),
        ("Shiba Inu", "SHIB"),
        ("Polygon", "MATIC"),
        ("Litecoin", "LTC"),
        ("Chainlink", "LINK"),
        ("Avalanche", "AVAX"),
        ("Uniswap", "UNI"),
        ("Stellar", "XLM"),
        ("VeChain", "VET"),
        ("TRON", "TRX"),
        ("Cosmos", "ATOM"),
        ("Filecoin", "FIL"),
        ("FTX Token", "FTT"),
        ("Ethereum Classic", "ETC"),
        ("Hedera", "HBAR"),
        ("Monero", "XMR"),
        ("Tezos", "XTZ"),
        ("PancakeSwap", "CAKE"),
        ("Algorand", "ALGO"),
        ("Theta Network", "THETA"),
        ("Elrond", "EGLD")
    ]

    for name, symbol in crypto_list:
        insert_single_coin(name, symbol)


if __name__ == "__main__":
    create_tables()
    insert_top_articles()
    insert_coins()
    finish_DB_connection()
