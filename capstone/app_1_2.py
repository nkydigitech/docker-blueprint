from flask import Flask, jsonify
import redis, os
app = Flask(__name__)
r = redis.Redis(host=os.getenv('REDIS_HOST','localhost'), decode_responses=True)

@app.route('/health')
def health(): return {'status':'ok'}

@app.route('/api/menu')
def menu():
    r.incr('hits')
    return jsonify({"foods":["Jollof","Suya","Pounded Yam","Egusi"],"hits":r.get('hits')})

if __name__ == '__main__': app.run(host='0.0.0.0', port=5000)
