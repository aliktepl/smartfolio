import os
import shutil

import tensorflow as tf
from scaningTheInternet import scan_Reddit
# import tensorflow_hub as hub
import tensorflow_text as text
# from official.nlp import optimization  # to create AdamW optimizer
#
# import matplotlib.pyplot as plt
#
# import matplotlib.pyplot as plt

tf.get_logger().setLevel('ERROR')

NEGATIVE_THRESHOLD = 0.4
POSITIVE_THRESHOLD = 0.6


def print_my_examples(inputs, results):
    result_for_printing = \
        [f'input: {inputs[i]:<30} : score: {results[i][0]:.6f}'
         for i in range(len(inputs))]
    print(*result_for_printing, sep='\n')
    print()


def positive_negative(data):
    pos = 0
    neg = 0
    neutral = 0
    for s in data:
        if s > POSITIVE_THRESHOLD:
            pos += 1
        elif s < NEGATIVE_THRESHOLD:
            neg += 1
        else:
            neutral += 1
    sum = pos + neg + neutral
    sentiment = {"positive: ": (pos / sum) * 100, "negative: ": (neg / sum) * 100, "neutral: ": (neutral / sum) * 100}
    return sentiment


def get_sentiment(data):
    saved_model_path = r"imdb_bert"
    reloaded_model = tf.saved_model.load(saved_model_path)
    # examples = scan_Reddit(name,symbol)
    print(data)
    reloaded_results = tf.sigmoid(reloaded_model(tf.constant(data)))
    print('Results from the saved model:')
    print_my_examples(data, reloaded_results)
    sentiment = positive_negative(reloaded_results)
    # print_my_examples(data,sentiment)
    return sentiment
# get_sentiment(["its bad"])


# See PyCharm help at https://www.jetbrains.com/help/pycharm/
# examples = [
#     "Just under a month from when Bitcoin broke 50k it has now officially broken 60k. This Bullrun is going great and the potential for Alts to grow is increasing by the day. Dont go anywhere things are about to get crazy.https://i.imgur.com/dKJEtQz.jpg",
#     'bitcoind is great investment',
#     'bitcoin is bad investment',
#     'even though some people think bitcoin is a bad investment that will make you loose money i think its ok',
#     'POST:Back in 2010 there was this website called The Bitcoin Faucet that gave away 5 BTC to anyone who visited and completed a simple CAPTCHA. https://preview.redd.it/b05ntu3b09kd1.jpg?width=973&format=pjpg&auto=webp&s=8b0d046542949d6ab542b349968932690ce233d1 The whole point of the faucet was to spread awareness and get people interested in Bitcoin - Keep in mind that it was worth just a few cents back then. Gavin Andresen was one of the most important developers of Bitcoin and was heavily involved in the project after Satoshi went MIA.'
# ]
