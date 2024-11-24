import requests
from datetime import datetime
import json



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
def get_coin_details(coin):
    url = "https://min-api.cryptocompare.com/data/pricemultifull"
    params = {
        "fsyms": coin,  # Coin symbol (e.g., BTC for Bitcoin)
        "tsyms": "USD",  # Target currency (USD)
    }

    try:
        # Make the API request
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raise an error for bad responses (4xx and 5xx)
        data = response.json()

        # Extract relevant details
        display_data = data['DISPLAY'][coin]['USD']
        coin_details = {
            "price": display_data['PRICE'],             # Current price
            "change": display_data['CHANGEPCTDAY'], # Percentage change in 24h
            "market_cap": display_data['MKTCAP'],       # Market capitalization
            "total_supply": display_data['SUPPLY'],     # Total supply
        }

        return coin_details

    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return None
    except KeyError:
        print("Invalid data returned by the API.")
        return None
# print(get_coin_details("SOL"))
# def get_coin_24h_two_hour_intervals(coin):
#     url = "https://min-api.cryptocompare.com/data/v2/histohour"
#     params = {
#         "fsym": coin,  # Coin symbol (e.g., BTC for Bitcoin)
#         "tsym": "USD",  # Target currency (USD)
#         "limit": 23,    # Get 24 data points (1 for each hour)
#     }
#
#     try:
#         # Make the API request
#         response = requests.get(url, params=params)
#         response.raise_for_status()  # Raise an error for bad responses (4xx and 5xx)
#         data = response.json()
#
#         # Extract historical price data
#         if data['Response'] == 'Success':
#             # Keep every second hour's data (2-hour intervals)
#             history = [
#                 {"time":  datetime.utcfromtimestamp(entry["time"]).strftime('%H:%M'), "price": entry["close"]}
#                 for i, entry in enumerate(data['Data']['Data'])
#                 if i % 2 == 0  # Select data points at 2-hour intervals
#             ]
#             return history
#         else:
#             print(f"API error: {data.get('Message', 'Unknown error')}")
#             return None
#
#     except requests.exceptions.RequestException as e:
#         print(f"An error occurred: {e}")
#         return None


def get_coin_24h_two_hour_intervals(coin):
    url = "https://min-api.cryptocompare.com/data/v2/histohour"
    params = {
        "fsym": coin,  # Coin symbol (e.g., BTC for Bitcoin)
        "tsym": "USD",  # Target currency (USD)
        "limit": 23,    # Get 24 data points (1 for each hour)
    }

    try:
        # Make the API request
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raise an error for bad responses (4xx and 5xx)
        data = response.json()

        # Extract historical price data
        if data['Response'] == 'Success':
            # Keep every second hour's data (2-hour intervals) and store in a dictionary
            history = {
                i // 2 + 1: {  # Key starts from 1 and increments by 1 for each 2-hour interval
                    "time": datetime.utcfromtimestamp(entry["time"]).strftime('%H:%M'),
                    "price": entry["close"]
                }
                for i, entry in enumerate(data['Data']['Data'])
                if i % 2 == 0  # Select data points at 2-hour intervals
            }
            return history
        else:
            print(f"API error: {data.get('Message', 'Unknown error')}")
            return None

    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return None
# def get_coin_24h_two_hour_intervals(coin):
#     url = "https://min-api.cryptocompare.com/data/v2/histohour"
#     params = {
#         "fsym": coin,  # Coin symbol (e.g., BTC for Bitcoin)
#         "tsym": "USD",  # Target currency (USD)
#         "limit": 23,    # Get 24 data points (1 for each hour)
#     }
#
#     try:
#         # Make the API request
#         response = requests.get(url, params=params)
#         response.raise_for_status()  # Raise an error for bad responses (4xx and 5xx)
#         data = response.json()
#
#         # Extract historical price data
#         if data['Response'] == 'Success':
#             # Create a dictionary with data points at 2-hour intervals
#             history = {
#                 f"data{i//2 + 1}": entry["close"]
#                 for i, entry in enumerate(data['Data']['Data'])
#                 if i % 2 == 0  # Select data points at 2-hour intervals
#             }
#             return history
#         else:
#             print(f"API error: {data.get('Message', 'Unknown error')}")
#             return None
#
#     except requests.exceptions.RequestException as e:
#         print(f"An error occurred: {e}")
#         return None
# print(get_coin_24h_two_hour_intervals('BTC'))