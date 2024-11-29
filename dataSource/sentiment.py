import os
import shutil
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
import tensorflow as tf
import tensorflow_text as text



tf.get_logger().setLevel('ERROR')

NEGATIVE_THRESHOLD = 0.4
POSITIVE_THRESHOLD = 0.6
saved_model_path = r"imdb_bert"
reloaded_model = tf.saved_model.load(saved_model_path)
def bar_chart_distribution(data):
    values = [0] * 10
    val = 0
    sum=0
    for s in data:
        sum+=1
        if s < 0.1:
            values[0] += 1
        elif s < 0.2:
            values[1] += 1
        elif s < 0.3:
            values[2] += 1
        elif s < 0.4:
            values[3] += 1
        elif s < 0.5:
            values[4] += 1
        elif s < 0.6:
            values[5] += 1
        elif s < 0.7:
            values[6] += 1
        elif s < 0.8:
            values[7] += 1
        elif s < 0.9:
            values[8] += 1
        elif s < 1.01:
            values[9] += 1
    sentiment = {str(i): (values[i - 1] /sum)*100 for i in range(1, 11)}
    return sentiment
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
    sentiment = {"positive": (pos / sum) * 100, "negative": (neg / sum) * 100, "neutral": (neutral / sum) * 100}
    return sentiment



def get_sentiment(data):
    reloaded_results = tf.sigmoid(reloaded_model(tf.constant(data)))
    sentiment = bar_chart_distribution(reloaded_results)
    return sentiment

