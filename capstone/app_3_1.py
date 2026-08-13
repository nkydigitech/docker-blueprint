from flask import Flask, jsonify
import redis, os
app=Flask(__name__)
@app.route('/health')
def h(): return {'status':'ok'}
@app.route('/api/menu')
def m(): return jsonify({'foods':['Jollof','Suya']})
if __name__=='__main__': app.run(host='0.0.0.0',port=5000)
