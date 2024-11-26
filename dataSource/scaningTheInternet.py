import praw
import pandas as pd
import re
import spacy

# Load spaCy model

nlp = spacy.load("en_core_web_sm")
# from textblob import TextBlob
# import openpyxl

from newsapi import NewsApiClient

AMOUNT = 4


def scan_news(name, symbol):
    newsapi = NewsApiClient(api_key='81d1a6e52ee54215929a928dae60380a')

    # top_headlines = newsapi.get_top_headlines(q='bitcoin',
    #                                           sources='bbc-news,the-verge,cnn,techcrunch,bbc.co.uk,fox-news,reuters,abc-news,associated-press,forbes,independent,usa-today',
    #                                           language='en',
    #                                           )
    headlines = all_articles = newsapi.get_everything(q=name,
                                                      sources='bbc-news,the-verge',
                                                      domains='bbc.co.uk,techcrunch.com',
                                                      from_param='2024-11-05',
                                                      to='2024-11-21',
                                                      language='en',
                                                      sort_by='relevancy')
    # Check if the request was successful and print the top headlines
    articles = []
    if headlines['status'] == 'ok':
        print("news:")
        for article in headlines['articles']:
            text = filter_relevant_text(f"- {article['title']}. {article['description']}", name)
            if (text != ""):
                articles.append(text)
            print(f"- {article['title']} : {article['description']} ({article['source']['name']})")
    else:
        print("Failed to retrieve top headlines.")
    return articles


def top_stories(name, amount):
    newsapi = NewsApiClient(api_key='81d1a6e52ee54215929a928dae60380a')

    # top_headlines = newsapi.get_top_headlines(q='bitcoin',
    #                                           sources='bbc-news,the-verge,cnn,techcrunch,bbc.co.uk,fox-news,reuters,abc-news,associated-press,forbes,independent,usa-today',
    #                                           language='en',
    #                                           )
    headlines = all_articles = newsapi.get_everything(
        q=name,
        sources=(
            'bbc-news,the-verge,bloomberg,financial-times,cnbc,reuters,'
            'associated-press,cnn,fox-news,the-wall-street-journal,'
            'time,forbes,usa-today,newsweek,abc-news,'
            'business-insider,engadget,ars-technica,wired,'
            'techradar,politico,the-hill'
        ),
        domains=(
            'bbc.co.uk,techcrunch.com,bloomberg.com,ft.com,cnbc.com,reuters.com,'
            'apnews.com,cnn.com,foxnews.com,wsj.com,time.com,forbes.com,'
            'usatoday.com,newsweek.com,abcnews.go.com,businessinsider.com,'
            'engadget.com,arstechnica.com,wired.com,techradar.com,'
            'politico.com,thehill.com'
        ),
        from_param='2024-10-30',
        to='2024-11-21',
        language='en',
        sort_by='relevancy'
    )

    # Check if the request was successful and print the top headlines
    topStories = []
    counter = 0
    if headlines['status'] == 'ok':
        # print("Top Headlines:")
        for article in headlines['articles']:
            if counter < amount:
                topStories.append(article)
                counter += 1
            else:
                break
            # print(f"- {article['title']} : {article['description']} ({article['source']['name']})")
    else:
        print("Failed to retrieve top headlines.")
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


# def find_top_comments():
def prepare_for_top(submission):
    return {"username": submission.author.name if submission.author else "anonymous", "title": submission.title,
            "url": submission.url}


def scan_Reddit(name, symbol):
    username = "smartfolio"
    clientid = "_R8bExVBisPWMQACqQ3EpA"
    clientsecret = "6OWMvLjYGg_Fi1hjAPTMr1yg9Gjyag"
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
                # text.append(submission.selftext)
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

    # print(query)
    # for q in query:
    #      print(q)
    #     print("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    #     print(filter_relevant_text(q, coin_name="Bitcoin"))

# scan_news()
# query = scan_Reddit('bitcoin', 'BTC')
# print(query)
# n = 0
# for q in query:
#     n += 1
#     print("new ")
#     print(q)
# print(n)

# data.to_excel('data_bitcoin.xlsx', index=False)
