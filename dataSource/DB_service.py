from DataFromAPI import get_coin_change, get_coin_details, get_coin_24h_two_hour_intervals, scan_Reddit, top_stories
from DB_queries import insert_coin_data, insert_articles_to_DB, insert_comments_to_DB
from sentiment import get_sentiment
import json

AMOUNT_OF_ARTICLES = 4


def insert_single_coin(name, symbol):
    # change = get_coin_change(symbol)
    tech_info = get_coin_details(name, symbol)
    comments, popularity, top_comments = scan_Reddit(name, symbol)
    sentiment = get_sentiment(comments)
    graph = get_coin_24h_two_hour_intervals(symbol)
    data = (
        symbol,  # id
        name,  # name
        symbol,  # symbol
        json.dumps(sentiment),  # sentiment (replaces social_sentiment and news_sentiment)
        json.dumps(tech_info),  # tech_info
        json.dumps(graph),
        popularity
    )

    # todo - open this:
    insert_articles(name, symbol, AMOUNT_OF_ARTICLES)
    insert_comments(top_comments)
    insert_coin_data(data)


# inserting to article table articles about certien
def insert_articles(name, symbol, amount):
    articles = top_stories(name, amount)
    data = []
    for i in range(1, amount + 1):
        if (len(articles) - 1 >= i - 1):
            article = articles[i - 1]
            source_name = article['source']['name']
            title = article['title']
            link = article['url']
            data.append((i, symbol, {"source": source_name, "title": title, "link": link}))
    insert_articles_to_DB(data)


def insert_comments(data):
    data = [(rank, coin, json.dumps(comment)) for rank, coin, comment in data]
    insert_comments_to_DB(data)
