import requests
from datetime import datetime, timedelta
import time
import pandas as pd
import praw
import re
import spacy
import os
from dotenv import load_dotenv
load_dotenv()

# Load spaCy model

nlp = spacy.load("en_core_web_sm")

from newsapi import NewsApiClient

AMOUNT = 4

import json

from pytrends.request import TrendReq


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




def get_coin_details(name, symbol):
    url = "https://min-api.cryptocompare.com/data/pricemultifull"
    params = {
        "fsyms": symbol,  # Coin symbol (e.g., BTC for Bitcoin)
        "tsyms": "USD",  # Target currency (USD)
    }

    try:
        # Make the API request
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raise an error for bad responses (4xx and 5xx)
        data = response.json()

        # Extract relevant details
        display_data = data['DISPLAY'][symbol]['USD']
        coin_details = {
            "price": display_data['PRICE'],  # Current price
            "change": display_data['CHANGEPCTDAY'],  # Percentage change in 24h
            "market_cap": display_data['MKTCAP'],  # Market capitalization
            "total_supply": display_data['SUPPLY']  # Total supply
        }

        return coin_details

    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return None
    except KeyError:
        print("Invalid data returned by the API.")
        return None




def get_coin_24h_two_hour_intervals(coin):
    url = "https://min-api.cryptocompare.com/data/v2/histohour"
    params = {
        "fsym": coin,  # Coin symbol (e.g., BTC for Bitcoin)
        "tsym": "USD",  # Target currency (USD)
        "limit": 23,  # Get 24 data points (1 for each hour)
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


def top_stories(name, amount):
    # Define both API keys
    api_keys = [os.getenv("NEWSAPI_KEY"), os.getenv("NEWSAPI_KEY_BACKUP")]

    today = datetime.now()
    from_date = (today - timedelta(days=30)).strftime('%Y-%m-%d')
    to_date = today.strftime('%Y-%m-%d')

    topStories = []
    counter = 0

    # Attempt requests using each API key
    for api_key in api_keys:
        try:
            newsapi = NewsApiClient(api_key=api_key)
            headlines = newsapi.get_everything(
                q=name,
                sources=(
                    'bbc-news,bloomberg,financial-times,cnbc,reuters,associated-press,'
                    'cnn,fox-news,the-wall-street-journal,time,forbes,usa-today,newsweek,'
                    'business-insider,the-economist,marketwatch,yahoo-finance,'
                    'seeking-alpha,moneycontrol,investing-com,barrons'
                ),
                domains=(
                    'bbc.co.uk,bloomberg.com,ft.com,cnbc.com,reuters.com,apnews.com,'
                    'cnn.com,foxnews.com,wsj.com,time.com,forbes.com,usatoday.com,'
                    'newsweek.com,businessinsider.com,economist.com,marketwatch.com,'
                    'finance.yahoo.com,seekingalpha.com,moneycontrol.com,investing.com,'
                    'barrons.com,nasdaq.com,thestar.com,globeandmail.com,nbcnews.com'
                ),
                from_param=from_date,
                to=to_date,
                language='en',
                sort_by='relevancy'
            )

            # If request is successful, extract top stories
            if headlines['status'] == 'ok':
                for article in headlines['articles']:
                    if counter < amount:
                        topStories.append(article)
                        counter += 1
                    else:
                        break
                return topStories

        except Exception as e:
            print(f"Error with API key {api_key}: {e}")
            # Try the next API key

    print("Failed to retrieve top headlines after trying all API keys.")
    return topStories


# search queries in posts
def search_queries(data, query):
    res = []
    pattern = r"{0}".format(query)
    compiled_pattern = re.compile(pattern, re.IGNORECASE)
    for text in data['Text']:
        match = compiled_pattern.search(text)
        if match:
            start_index = match.start()
            res.append(text[start_index:])
    return res


def filter_relevant_text(comment, coin_name):
    doc = nlp(comment)
    relevant_sentences = []

    for sentence in doc.sents:
        # Check if the coin name is mentioned
        if coin_name.lower() in sentence.text.lower():
            relevant_sentences.append(sentence.text)

    return " ".join(relevant_sentences)


def prepare_for_top(submission):
    return {"username": submission.author.name if submission.author else "anonymous", "title": submission.title,
            "url": submission.url}


def scan_Reddit(name, symbol):
    username = "smartfolio"
    clientid = os.getenv("CLIENT_ID")
    clientsecret = os.getenv("CLIENT_SECRET")
    top_comments = []

    reddit = praw.Reddit(client_id=clientid, client_secret=clientsecret, user_agent="human_behavior")

    titles = []
    urls = []
    text = []
    first_ts = 1e11
    last_ts = 0
    counter = 0
    # queries to search in bitcoin subreddit
    subList = ['cryptocurrency', 'cryptoMarkets']
    for sub in subList:
        subreddit = reddit.subreddit(sub)
        for submission in subreddit.search(name, sort='relevance', limit=10000):
            if counter < 4:
                top_comments.append((counter + 1, symbol, prepare_for_top(submission)))
            counter += 1
            comment = filter_relevant_text(submission.selftext, name)
            if comment != "":
                text.append(comment)
                titles.append(submission.title)
                urls.append(submission.url)
                first_ts = min(submission.created_utc, first_ts)
                last_ts = max(submission.created_utc, last_ts)

    data = pd.DataFrame()
    data['Title'] = titles
    data['URL'] = urls
    data['Text'] = text

    data = data.drop_duplicates(subset=['Title', 'URL', 'Text'])
    query = search_queries(data, "")
    return query, counter, top_comments

