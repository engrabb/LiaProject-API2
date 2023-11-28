from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI
import openai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "methods": "OPTIONS,POST,GET", "headers": "Content-Type"}})

openai.api_key = os.getenv('MY_KEY')

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'message': 'Data from the backend'}
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    
    return response

@app.route('/api/post_data', methods=['POST', 'OPTIONS'])
def generate_image():
    print(request.method)
    if request.method == 'OPTIONS':
        
        response = jsonify({'message': 'Preflight request handled'})
    else:
        try:
            req_data = request.get_json()
            received_data = req_data.get('data', 'No data received')
  
            prompt = received_data


            response = openai.Completion.create(
                model="dall-e-3",
                prompt=prompt,
                n=1,
                stop=None,
                temperature=0.7,
            )
            print(response)

            if 'choices' in response and response['choices']:
                image_url = response['choices'][0].get('text', '').strip()
                if image_url:
                    response_data = {'image_url': image_url}
                else:
                    response_data = {'error': 'Image URL not found in response'}
            else:
                response_data = {'error': 'Unexpected response structure from OpenAI API'}

            # Always return a valid response
            response = jsonify(response_data)
    
        except Exception as e:
            response = jsonify({'error': str(e)})

    return response

if __name__ == '__main__':
    app.run(debug=True)