import sys
import joblib
import json

# Load vectorizer and model
model = joblib.load('trained_model.pkl')
tfidf = joblib.load('tfidf_vectorizer.pkl')
label_encoder = joblib.load('label_encoder.pkl')

def predict(ingredients):
    ingredients = [ingredients]
    X = tfidf.transform(ingredients).toarray()
    pred_class = model.predict(X)
    category = label_encoder.inverse_transform(pred_class)
    return {
        'predicted_class': int(pred_class[0]),
        'predicted_category': category[0]
    }

if __name__ == "__main__":
    ingredients_input = sys.argv[1]
    result = predict(ingredients_input)
    print(json.dumps(result))
