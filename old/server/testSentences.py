from textblob import TextBlob

#testimonial = TextBlob("Just under a month from when Bitcoin broke 50k it has now officially broken 60k. This Bullrun is going great and the potential for Alts to grow is increasing by the day. Dont go anywhere things are about to get crazy.")
prompt="at least"
print(prompt)
testimonial = TextBlob(prompt)
print(testimonial.sentiment.polarity)