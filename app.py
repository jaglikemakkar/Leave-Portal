from flask import Flask, render_template, url_for, request, session, redirect
from flask_pymongo import PyMongo
from pymongo import MongoClient
from flaskext.mysql import MySQL
import bcrypt

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/login', methods = ['GET', 'POST'])
def login():
    return render_template('login.html')

@app.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        print("Username:", request.form['username'])
        print("Password:", request.form['password'])
    return render_template('register.html')

if __name__ == '__main__':
    app.run(debug=True)