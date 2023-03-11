# the flask post request receiver
from io import BytesIO
from flask import jsonify, request, Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_file():
    """Handles the upload of a file."""
    d = {}
    try:
        file = request.files['file']
        filename = file.filename
        print(f"Uploading file {filename}")
        file_bytes = file.read()
        file_content = BytesIO(file_bytes).readlines()
        print(file_content)
        d['status'] = 1

    except Exception as e:
        print(f"Couldn't upload file {e}")
        d['status'] = 0

    return jsonify(d)


@app.route('/train', methods=['POST'])
def train_model():
    return
