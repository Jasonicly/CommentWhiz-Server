from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer  # Importing VADER Sentiment Analyzer
from flask import Flask, request, jsonify  # Importing Flask for creating web server, request for handling HTTP requests, and jsonify for returning JSON responses
import json  # Importing JSON module for handling JSON data
from sentence_transformers import SentenceTransformer  # Importing SentenceTransformer for generating embeddings
from sklearn.cluster import KMeans  # Importing KMeans for clustering
import string  # Importing string module for string operations
import re  # Importing re module for regular expressions
import spacy  # Importing spaCy for natural language processing
from flask_cors import CORS  # Importing CORS for enabling Cross-Origin Resource Sharing

# Initialize SpaCy and Flask
nlp = spacy.load('en_core_web_sm')  # Load the English language model for SpaCy
app = Flask(__name__)  # Initialize Flask app
cors = CORS(app)  # Enable CORS for the app

# Load Sentence Transformer Model
sentence_transformer_model = SentenceTransformer('distilroberta-base-paraphrase-v1')  # Load a pre-trained Sentence Transformer model for generating embeddings

# Function to preprocess comments
def preprocess_comment(comment):
    """
    Preprocesses a comment by converting it to lowercase, removing punctuation, and extra whitespace.
    """
    comment = comment.lower()  # Convert comment to lowercase
    comment = re.sub(f"[{string.punctuation}]", " ", comment)  # Remove punctuation using regular expression
    comment = re.sub(r"\s+", " ", comment)  # Remove extra whitespace using regular expression
    return comment.strip()  # Remove leading and trailing whitespaces

# Function to extract phrases using SpaCy
def extract_phrases(comment):
    """
    Extracts noun phrases and adjectives followed by nouns from a comment using SpaCy.
    """
    doc = nlp(comment)  # Parse the comment using SpaCy
    
    phrases = []

    for token in doc:
        if token.pos_ == "NOUN":  # Check if token is a noun
            phrases.append(token.text)  # Add noun to phrases
        elif token.pos_ == "ADJ" and token.head.pos_ == "NOUN":  # Check if token is an adjective followed by a noun
            phrases.append(token.text + " " + token.head.text)  # Add adjective and noun to phrases

    lemmatized_phrases = [token.lemma_ for token in nlp(" ".join(phrases))]  # Lemmatize the extracted phrases

    return lemmatized_phrases  # Return lemmatized phrases

# Function to cluster phrases
def cluster_phrases(phrases_with_commentids):
    """
    Clusters phrases using KMeans based on their embeddings.
    """
    embeddings = [sentence_transformer_model.encode(phrase_with_comment[0]) for phrase_with_comment in phrases_with_commentids]  # Generate embeddings for phrases

    num_clusters = 10  # Define number of clusters
    clustering_model = KMeans(n_clusters=num_clusters, random_state=42)  # Initialize KMeans clustering model
    clustering_model.fit(embeddings)  # Fit the model to the embeddings
    cluster_assignment = clustering_model.labels_  # Get cluster assignments

    clustered_phrases = {}  # Initialize dictionary to store clustered phrases
    for phrase_with_commentids, cluster_id in zip(phrases_with_commentids, cluster_assignment):
        cluster_id = str(cluster_id)
        phrase = phrase_with_commentids[0]  # Get phrase
        comment_index = phrase_with_commentids[1]  # Get comment index

        if cluster_id not in clustered_phrases:
            clustered_phrases[cluster_id] = {"phrases": [], "comments_index": [], "unique_comment_count": 0}  # Initialize cluster in dictionary
        clustered_phrases[cluster_id]["phrases"].append(phrase)  # Add phrase to cluster

        if comment_index not in clustered_phrases[cluster_id]["comments_index"]:
            clustered_phrases[cluster_id]["unique_comment_count"] += 1  # Increase unique comment count for the cluster
        
        clustered_phrases[cluster_id]["comments_index"].append(comment_index)  # Add comment index to cluster

    return clustered_phrases  # Return clustered phrases

# Function to get sentiment scores
def sentiment_scores(sentence):
    """
    Calculates sentiment scores for a sentence using VADER Sentiment Analysis.
    """
    sentiment = ""
    sid_obj = SentimentIntensityAnalyzer()  # Create a SentimentIntensityAnalyzer object
    sentiment_dict = sid_obj.polarity_scores(sentence)  # Get sentiment scores for the sentence

    # Determine sentiment as positive, negative, or neutral based on compound score
    if sentiment_dict['compound'] >= 0.25:
        sentiment = 'Positive'
    elif sentiment_dict['compound'] <= -0.25:
        sentiment = 'Negative'
    else:
        sentiment = 'Neutral'

    ai_rating = round((sentiment_dict['compound'] + 1) * 2.5, 1)  # Normalize the compound score to a 0-5 scale

    return sentiment, ai_rating  # Return sentiment and AI rating

# Combined API endpoint for summarization and sentiment analysis
@app.route('/process_reviews', methods=['POST'])
def process_reviews():
    """
    Processes reviews, calculates sentiment, clusters key topics, and generates a summary.
    """
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        try:
            review_file = json.load(file)  # Load JSON data from file
        except Exception as e:
            return jsonify({"error": str(e)}), 400

        num_reviews = 0
        num_positive_reviews = 0
        num_negative_reviews = 0
        num_neutral_reviews = 0
        total_rating = 0
        all_phrases_with_commentids = []

        for i, review in enumerate(review_file):
            num_reviews += 1
            body = review.get("body", "")
            sentiment, ai_rating = sentiment_scores(body)  # Calculate sentiment scores for review body
            total_rating += ai_rating

            if sentiment == "Positive":
                num_positive_reviews += 1
            elif sentiment == "Negative":
                num_negative_reviews += 1
            else:
                num_neutral_reviews += 1

            review["sentiment"] = sentiment  # Add sentiment to review
            review["AI-rating"] = ai_rating  # Add AI rating to review

            processed_comment = preprocess_comment(body)  # Preprocess review body
            phrases = extract_phrases(processed_comment)  # Extract phrases from preprocessed comment
            for phrase in phrases:
                all_phrases_with_commentids.append([phrase, i])  # Add phrase and comment index to list

        clustered_phrases = cluster_phrases(all_phrases_with_commentids)  # Cluster phrases

        percentge_positive = round(num_positive_reviews / num_reviews * 100, 1)  # Calculate percentage of positive reviews
        percentge_negative = round(num_negative_reviews / num_reviews * 100, 1)  # Calculate percentage of negative reviews
        percentge_neutral = round(num_neutral_reviews / num_reviews * 100, 1)    # Calculate percentage of neutral reviews
        average_enhanced_rating = round(total_rating / num_reviews, 1)             # Calculate average enhanced rating

        # Generate summary of review data
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

        # Prepare output dictionary
        output = {
            "reviews": review_file,
            "summary": summary,
            "key_topics": {}
        }

        # Populate key topics in the output dictionary
        for cluster_id in clustered_phrases:
            first_phrase_of_cluster = clustered_phrases[cluster_id]["phrases"][0]
            unique_comment_count = clustered_phrases[cluster_id]["unique_comment_count"]
            comments_indexes = clustered_phrases[cluster_id]["comments_index"]

            output["key_topics"][first_phrase_of_cluster] = {"comments": [], "unique_comment_count": unique_comment_count}

            for idx in comments_indexes:
                output["key_topics"][first_phrase_of_cluster]["comments"].append(review_file[idx])

        return jsonify(output), 200  # Return output as JSON response with status code 200

if __name__ == '__main__':
    app.run(debug=True)  # Run the Flask app in debug mode if executed as main script

