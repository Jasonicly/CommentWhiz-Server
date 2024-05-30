from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from flask import Flask, request, jsonify
import json
from sentence_transformers import SentenceTransformer
from sklearn.cluster import KMeans
import string
import re
import spacy
from flask_cors import CORS

# Initialize SpaCy and Flask
nlp = spacy.load('en_core_web_sm')
app = Flask(__name__)
cors = CORS(app)

# Load Sentence Transformer Model
sentence_transformer_model = SentenceTransformer('distilroberta-base-paraphrase-v1')

# Function to preprocess comments
def preprocess_comment(comment):
    comment = comment.lower()
    comment = re.sub(f"[{string.punctuation}]", " ", comment)  # Remove punctuation
    comment = re.sub(r"\s+", " ", comment)  # Remove extra whitespace
    return comment.strip()

# Function to extract phrases using SpaCy
def extract_phrases(comment):
    # Parse the comment using spaCy
    doc = nlp(comment)
    
    phrases = []

    for token in doc:
        if token.pos_ == "NOUN":
            phrases.append(token.text)
        elif token.pos_ == "ADJ" and token.head.pos_ == "NOUN":
            phrases.append(token.text + " " + token.head.text)

    # Lemmatize the extracted phrases
    lemmatized_phrases = [token.lemma_ for token in nlp(" ".join(phrases))]

    return lemmatized_phrases

# Function to cluster phrases
def cluster_phrases(phrases_with_commentids):
    embeddings = [sentence_transformer_model.encode(phrase_with_comment[0]) for phrase_with_comment in phrases_with_commentids]

    # Perform clustering
    num_clusters = 10
    clustering_model = KMeans(n_clusters=num_clusters, random_state=42)
    clustering_model.fit(embeddings)
    cluster_assignment = clustering_model.labels_

    clustered_phrases = {}
    for phrase_with_commentids, cluster_id in zip(phrases_with_commentids, cluster_assignment):
        cluster_id = str(cluster_id)
        phrase = phrase_with_commentids[0]
        comment_index = phrase_with_commentids[1]

        if cluster_id not in clustered_phrases:
            clustered_phrases[cluster_id] = {"phrases": [], "comments_index": [], "unique_comment_count": 0} # Initialize dictionary if cluster id not already inside
        clustered_phrases[cluster_id]["phrases"].append(phrase)

        # Check if comment index is not inside already, increase count
        if comment_index not in clustered_phrases[cluster_id]["comments_index"]:
            clustered_phrases[cluster_id]["unique_comment_count"] += 1
        
        clustered_phrases[cluster_id]["comments_index"].append(comment_index)

    return clustered_phrases

# Function to get sentiment scores
def sentiment_scores(sentence):
    sentiment = ""
    # Create a SentimentIntensityAnalyzer
    sid_obj = SentimentIntensityAnalyzer()
    # Polarity scores method of SentimentIntensityAnalyzer
    # gives a sentiment dictionary
    # which contains pos, neg, neu, and compound scores
    sentiment_dict = sid_obj.polarity_scores(sentence)

    '''print("Overall sentiment dictionary is : ", sentiment_dict)
    print("sentence was rated as ", sentiment_dict['neg']*100, "% Negative")
    print("sentence was rated as ", sentiment_dict['neu']*100, "% Neutral")
    print("sentence was rated as ", sentiment_dict['pos']*100, "% Positive")
    print("Sentence Overall Rated As", end = " ")'''

    # Decide sentiment as positive, negative and neutral
    if sentiment_dict['compound'] >= 0.25:
        sentiment = 'Positive'
    elif sentiment_dict['compound'] <= -0.25:
        sentiment = 'Negative'
    else:
        sentiment = 'Neutral'

    # Normalize the compound score to a 0-5 scale
    ai_rating = round((sentiment_dict['compound'] + 1) * 2.5, 1)

    return sentiment, ai_rating

# Combined API endpoint for summarization and sentiment analysis
@app.route('/process_reviews', methods=['POST'])
def process_reviews():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        try:
            review_file = json.load(file)
        except Exception as e:
            return jsonify({"error": str(e)}), 400

        # Variables
        num_reviews = 0
        num_positive_reviews = 0
        num_negative_reviews = 0
        num_neutral_reviews = 0
        total_rating = 0
        all_phrases_with_commentids = []

        for i, review in enumerate(review_file):
            num_reviews += 1
            body = review.get("body", "")
            sentiment, ai_rating = sentiment_scores(body)
            total_rating += ai_rating

            if sentiment == "Positive":
                num_positive_reviews += 1
            elif sentiment == "Negative":
                num_negative_reviews += 1
            else:
                num_neutral_reviews += 1

            review["sentiment"] = sentiment
            review["AI-rating"] = ai_rating

            processed_comment = preprocess_comment(body)
            phrases = extract_phrases(processed_comment)
            for phrase in phrases:
                all_phrases_with_commentids.append([phrase, i])

        clustered_phrases = cluster_phrases(all_phrases_with_commentids)

        # Calculations
        percentge_positive = round(num_positive_reviews / num_reviews * 100, 1)
        percentge_negative = round(num_negative_reviews / num_reviews * 100, 1)
        percentge_neutral = round(num_neutral_reviews / num_reviews * 100, 1)
        average_enhanced_rating = round(total_rating / num_reviews, 1)

        summary = {
            "Number of Reviews": num_reviews,
            "Number of Positive Reviews": num_positive_reviews,
            "Number of Negative Reviews": num_negative_reviews,
            "Number of Neutral Reviews": num_neutral_reviews,
            "Percentage of Positive Reviews": percentge_positive,
            "Percentage of Negative Reviews": percentge_negative,
            "Percentage of Neutral Reviews": percentge_neutral,
            "Enhanced Rating": average_enhanced_rating
        }

        output = {
            "reviews": review_file,
            "summary": summary,
            "key_topics": {}
        }

        for cluster_id in clustered_phrases:
            first_phrase_of_cluster = clustered_phrases[cluster_id]["phrases"][0]
            unique_comment_count = clustered_phrases[cluster_id]["unique_comment_count"]
            comments_indexes = clustered_phrases[cluster_id]["comments_index"]

            output["key_topics"][first_phrase_of_cluster] = {"comments": [], "unique_comment_count": unique_comment_count}

            for idx in comments_indexes:
                output["key_topics"][first_phrase_of_cluster]["comments"].append(review_file[idx])

        return jsonify(output), 200

if __name__ == '__main__':
    app.run(debug=True)
