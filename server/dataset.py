import praw
import pandas as pd
import re
from textblob import TextBlob
import openpyxl


# search queries in posts
def search_queries(data, query):
    res = []
    pattern = r"{0}".format(query)
    compiled_pattern = re.compile(pattern, re.IGNORECASE)
    for text in data['Text']:
        match = compiled_pattern.search(text)
        if match:
            start_index = match.start()
            res.append("POST:" + text[start_index:])
    return res


username = "behavior_course"
clientid = "DMtFbBZI6naKOBJ7DVigcQ"
clientsecret = "ZgVu9bYXW38L4wnEdhY6HWpr7Yrkvw"

reddit = praw.Reddit(client_id=clientid, client_secret=clientsecret, user_agent="human_behavior")
subreddit = reddit.subreddit('cryptocurrency')
titles = []
urls = []
text = []
first_ts = 1e11
last_ts = 0
# queries to search in mentalhealth subreddit
topic_lst = ['bitcoin']

for topic in topic_lst:
    for submission in subreddit.search(topic, sort='relevance', limit=1000):
        titles.append(submission.title)
        urls.append(submission.url)
        text.append(submission.selftext)
        first_ts = min(submission.created_utc, first_ts)
        last_ts = max(submission.created_utc, last_ts)

data = pd.DataFrame()
data['Title'] = titles
data['URL'] = urls
data['Text'] = text

data = data.drop_duplicates(subset=['Title', 'URL', 'Text'])
query = search_queries(data, "")
for q in query:
    print(q)
data.to_excel('data_bitcoin.xlsx', index=False)
