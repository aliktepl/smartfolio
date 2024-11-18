import requests
import praw
import pandas as pd
from datetime import datetime, timedelta

from DataFromAPI import get_coin_change
from config_DB import insert_coin_data, insert_articles_to_DB
from scaningTheInternet import scan_Reddit, scan_news, top_stories
from sentiment import get_sentiment
import json


def insert_single_coin(name, symbol):
    change = get_coin_change(symbol)
    social_sentiment = get_sentiment(scan_Reddit(name, symbol))

    # news = scan_news(name, symbol)
    # news_sentiment = get_sentiment(news)
    # print("news sentiment: ", news_sentiment)
    data = (
        symbol,  # id
        name,  # name
        symbol,  # symbol
        change,  # change
        json.dumps(social_sentiment)
    )
    print(data)
    insert_coin_data(data)


def insert_articles(name, symbol,amount):
    articles=top_stories(name,amount)
    data = []
    for i in range(1, amount + 1):
        article = articles[i - 1]
        source_name = article['source']['name']
        title = article['title']
        link = article['url']
        data.append((i, symbol, {"source": source_name, "title": title, "link": link}))
    insert_articles_to_DB(data)
