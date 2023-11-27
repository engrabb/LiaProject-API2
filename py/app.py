from flask import Flask, jsonify, request
from openai import OpenAI

app = Flask(__name__)

openai.api_key = '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'

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
    if request.method == 'OPTIONS':
    # Handle preflight request
        response = jsonify({'message': 'Preflight request handled'})
    else:
        try:
            req_data = request.get_json()
            received_data = req_data.get('data', 'No data received')
            # Get the prompt from the frontend
            prompt = received_data

            # Make a request to OpenAI API
            response = openai.Completion.create(
                model="image-alpha-001",
                prompt=prompt,
                n=1,
                stop=None,
                temperature=0.7,
            )
            # Extract the generated image URL from the OpenAI response
            image_url = response['choices'][0]['text'].strip()
            response = jsonify({'image_url': image_url})
            response.headers.add('Access-Control-Allow-Origin', '*')
            response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
            
            return response
        except Exception as e:
            return jsonify({'error': str(e)})
# def post_data():
#     if request.method == 'OPTIONS':
#         # Handle preflight request
#         response = jsonify({'message': 'Preflight request handled'})
#     else:
#         # Handle actual POST request
#         req_data = request.get_json()
#         received_data = req_data.get('data', 'No data received')
#         response = jsonify({'message': f'Data received: {received_data}'})

#     response.headers.add('Access-Control-Allow-Origin', '*')
#     response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
#     response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    
#     return response

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