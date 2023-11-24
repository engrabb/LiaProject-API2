from flask import Flask, jsonify, request

app = Flask(__name__)

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
def post_data():
    if request.method == 'OPTIONS':
        # Handle preflight request
        response = jsonify({'message': 'Preflight request handled'})
    else:
        # Handle actual POST request
        req_data = request.get_json()
        received_data = req_data.get('data', 'No data received')
        response = jsonify({'message': f'Data received: {received_data}'})

    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')

    return response

if __name__ == '__main__':
    app.run(debug=True)