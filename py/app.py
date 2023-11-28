from flask import Flask, jsonify, request
from openai import OpenAI
import openai
import os
import requests
import json
from dotenv import load_dotenv


load_dotenv()

app = Flask(__name__)

openai.api_key = os.getenv('MY_KEY')

@app.after_request
def apply_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
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


            api_url = 'https://api.openai.com/v1/images/generations'
            headers = {
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {openai.api_key}'
            }
            data = {
                "model": "dall-e-3",
                "prompt": prompt,
                "n": 1,
                "size": "1024x1024"
            }

            response = requests.post(api_url, headers=headers, data=json.dumps(data))

            if response.status_code == 200:
                result = response.json()
                if 'data' in result and len(result['data']) > 0:
                    image_url = result['data'][0]['url']
                    response_data = {'image_url': image_url}
                else:
                    response_data = {'error': 'Image URL not found in response'}
            else:
                response_data = {'error': f'Error: {response.status_code}, {response.text}'}
                
                
            # Always return a valid response
            response = jsonify(response_data)
    
        except Exception as e:
            response = jsonify({'error': str(e)})

    return response

if __name__ == '__main__':
    app.run(debug=True)