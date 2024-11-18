import requests
import praw
import pandas as pd
from datetime import datetime, timedelta

# Initialize PRAW with your credentials
username = "smartfolio"
clientid = "_R8bExVBisPWMQACqQ3EpA"
clientsecret = "6OWMvLjYGg_Fi1hjAPTMr1yg9Gjyag"

reddit = praw.Reddit(client_id=clientid, client_secret=clientsecret, user_agent="human_behavior")

# Set up subreddit and keywords
subreddit_name = 'cryptocurrency'
topic_lst = ['bitcoin']

# Calculate timestamps for the last 24 hours
end_timestamp = int(datetime.now().timestamp())
start_timestamp = int((datetime.now() - timedelta(days=1)).timestamp())

# Fetch comments within the last day for each topic in the list
comments_data = []
for topic in topic_lst:
    url = f"https://api.pushshift.io/reddit/comment/search/?subreddit={subreddit_name}&q={topic}&after={start_timestamp}&before={end_timestamp}&size=1000"
    response = requests.get(url)
    comments = response.json().get('data', [])

    for comment_data in comments:
        comment_id = comment_data['id']
        comment = reddit.comment(comment_id)
        comments_data.append({
            'Title': comment.submission.title,
            'URL': comment.submission.url,
            'Text': comment.body
        })

# Convert to a DataFrame
data = pd.DataFrame(comments_data)

# Display or save the DataFrame as needed
print(data)
