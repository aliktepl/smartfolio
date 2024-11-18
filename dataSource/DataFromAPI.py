import requests


def get_coin_value(coin):
    # Set the coin (e.g., 'BTC' for Bitcoin) and the currencies you want (e.g., USD, EUR)
    url = "https://min-api.cryptocompare.com/data/price"
    params = {
        "fsym": coin,  # Coin symbol (e.g., BTC for Bitcoin)
        "tsyms": "USD",  # Target currencies (USD, EUR, etc.)
    }

    # Make the API request
    response = requests.get(url, params=params)
    data = response.json()

    # Get current price in USD and EUR
    price_usd = data.get("USD")
    return price_usd

# def to_stories(news):
#

def get_coin_change(coin):
    url = "https://min-api.cryptocompare.com/data/pricemultifull"
    params = {
        "fsyms": coin,  # Coin symbol (e.g., BTC for Bitcoin)
        "tsyms": "USD",  # Target currency (USD)
    }

    # Make the API request
    response = requests.get(url, params=params)
    data = response.json()

    # Get 24-hour price change (percentage change in 24h)
    price_change_24h = data['DISPLAY'][coin]['USD']['CHANGEPCTDAY']

    return price_change_24h

# value = get_coin_value("BTC")
# change = get_coin_change("BTC")
# print(change)
