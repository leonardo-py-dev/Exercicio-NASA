from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

NASA_API_KEY = os.getenv("NASA_API_KEY", "DEMO_KEY")
NASA_APOD_URL = "https://api.nasa.gov/planetary/apod"

@app.route('/api/apod', methods=['GET'])
def get_apod():
    date = request.args.get('date')
    if not date:
        return jsonify({"error": "Date parameter is required (YYYY-MM-DD)"}), 400
    
    params = {
        "api_key": NASA_API_KEY,
        "date": date
    }
    
    # Add verify=False to bypass SSL errors (common on some Windows environments)
    # We also suppress the insecure request warning for a cleaner console
    import urllib3
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
    
    try:
        response = requests.get(NASA_APOD_URL, params=params, verify=False)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.HTTPError as e:
        return jsonify({"error": f"NASA API Error: {str(e)}"}), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
