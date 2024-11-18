import requests
import praw
import pandas as pd
from datetime import datetime, timedelta

from DataFromAPI import get_coin_change, get_coin_details
from config_DB import insert_coin_data, insert_articles_to_DB
from scaningTheInternet import scan_Reddit, scan_news, top_stories
from sentiment import get_sentiment
import json



def insert_single_coin(name, symbol):
    # change = get_coin_change(symbol)
    tech_info=get_coin_details(symbol)
    sentiment = get_sentiment(scan_Reddit(name, symbol))
    # news = scan_news(name, symbol)
    # if len(news) > 0:
    #     news_sentiment = get_sentiment(news)
    # else:
    #     news_sentiment=""

    # print("news sentiment: ", news_sentiment)
    data = (
        symbol,  # id
        name,  # name
        symbol,  # symbol
        json.dumps(sentiment),  # sentiment (replaces social_sentiment and news_sentiment)
        json.dumps(tech_info)  # tech_info
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
