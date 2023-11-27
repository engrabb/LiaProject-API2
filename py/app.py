from flask import Flask, jsonify, request
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

OpenAI.api_key = os.getenv('MY_KEY')

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


            response = OpenAI.Completion.create(
                model="image-alpha-001",
                prompt=prompt,
                n=1,
                stop=None,
                temperature=0.7,
            )

            image_url = response['choices'][0]['text'].strip()
            response = jsonify({'image_url': image_url})
            response.headers.add('Access-Control-Allow-Origin', '*')
            response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
            
            return response
        except Exception as e:
            return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
    
client = OpenAI()

response = client.images.generate(
    model="dall-e-3",
    prompt="a white siamese cat",
    size="1024x1024",
    quality="standard",
    n=1,
)

image_url = response.data[0].url