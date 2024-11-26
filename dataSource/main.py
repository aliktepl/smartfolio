from DBservice import insert_single_coin, insert_articles
from sentiment import get_sentiment
from DataFromAPI import get_coin_change
from DataFromAPI import get_coin_value
from config_DB import insert_coin_data, finish_DB_connection, create_tables
from scaningTheInternet import scan_Reddit
from scaningTheInternet import scan_news
from scaningTheInternet import top_stories
import json
from pytrends.request import TrendReq


def temp():
    # Initialize pytrends
    pytrends = TrendReq(hl='en-US', tz=360)

    # Build the payload for the keyword "Bitcoin" with today's timeframe
    pytrends.build_payload(
        kw_list=['Bitcoin'],
        cat=0,
        timeframe='now 1-d',  # 'now 1-d' means the last 24 hours
        geo='',
        gprop=''
    )

    # Get the interest over time
    bitcoin_trends = pytrends.interest_over_time()

    # Display the trend data
    print(bitcoin_trends)


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



    # insert_single_coin("USD Coin", "USDC")
    # insert_single_coin('Ethereum', "ETH")
    # insert_single_coin('Litecoin', "LTC")
    # insert_single_coin('Tether', "USDT")
    # insert_single_coin('Pepe', "PEPE")


if __name__ == "__main__":
    create_tables()
    #insert_top_articles()

    insert_coins()
    finish_DB_connection()
    # temp()
