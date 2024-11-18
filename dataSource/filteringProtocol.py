import spacy

# Load spaCy model
nlp = spacy.load("en_core_web_sm")


def filter_relevant_text(comment, coin_name="Bitcoin"):
    doc = nlp(comment)
    relevant_sentences = []

    for sentence in doc.sents:
        # Check if the coin name is mentioned
        if coin_name.lower() in sentence.text.lower():
            relevant_sentences.append(sentence.text)

    return " ".join(relevant_sentences)


# Example usage
comment = "When you have an actual country (El Salvador) buying the dips, that's a saying on what's to come. Price is changing but Bitcoin fundamentals are strong, and hasn't changed, keep stacking those sats if you can. I have a strong conviction on Bitcoin for the future, this is only getting started. Started in October 2017 with the goal of 'enough bitcoin to retire'. Got the general idea from the FIRE community (financial independence, retire early) but instead of buying the S&P every month, I chose to buy bitcoin every month. So, basically I save as much as possible from every salary --> buy as much bitcoin every month as possible. And whatever your capacity and timing for stacking sats is, I'm pretty sure this kind of 'bitcoin retirement plan' is way more efficient than the government one, so starting anything similar is highly recommended. Ps. doesn't work with shitcoins"
relevant_text = filter_relevant_text(comment, coin_name="Bitcoin")
print(comment)
print(relevant_text)  # Output: "Bitcoin is good."
