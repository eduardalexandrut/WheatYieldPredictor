
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify, render_template
import pickle

app = Flask(__name__)
lrp = pickle.load(open('models/modelCatboost.pkl', 'rb'))

@app.route('/')
def home():
    return render_template('index.html')

@app.route("/predict",methods=['POST'])
def predict():
     if request.method == 'POST':
        req = request.get_json()

        if not req:
            return jsonify({'error': 'No JSON data provided'}), 400

        try:
            Year = req['Year']
            average_rain_fall_mm_per_year = req['average_rain_fall_mm_per_year']
            pesticides_in_t = req['pesticides_tonnes']
            avg_temp = req['avg_temp']
            Area = req['Area']
            tot_population = req['tot_population']
        except KeyError as e:
            return jsonify({'error': f'Missing key in JSON data: {str(e)}'}), 400

        # Convert input values
        try:
            Year = int(Year)
            average_rain_fall_mm_per_year = float(average_rain_fall_mm_per_year)
            pesticides_in_t = float(pesticides_in_t)
            avg_temp = float(avg_temp)
            Area = str(Area)
            tot_population = float(tot_population)
        except ValueError as e:
            return jsonify({'error': f'Invalid data type: {str(e)}'}), 400

        # Prepare features
        features = prepare_features(Year, Area, avg_temp, average_rain_fall_mm_per_year, pesticides_in_t, tot_population)
        
        # Predict
        prediction = lrp.best_estimator_.named_steps['model'].predict(features).reshape(1, -1)
        print(prediction[0][0])
        return jsonify({'prediction': prediction[0][0]})
        
def prepare_features(Year, Area, avg_temp, average_rain_fall_mm_per_year, pesticides_in_t, tot_population):
    data = {'Year':Year, 'Area':Area, 'avg_temp':avg_temp,
         'average_rain_fall_mm_per_year':average_rain_fall_mm_per_year, 'pesticides_in_t':pesticides_in_t,
         'Total population (k)':tot_population}
    y = pd.DataFrame(data = data, index = [0])
    preprocessor = lrp.best_estimator_.named_steps['preprocessor']
    model = lrp.best_estimator_.named_steps['model']

    # Transforma l'input
    transformed_y = preprocessor.transform(y)

    return transformed_y
        
if __name__ == "__main__":
    app.run(debug=True)
