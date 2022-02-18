from re import template
from flask import Flask, render_template, url_for, request, session, redirect
from flask_pymongo import PyMongo
from matplotlib.pyplot import connect
from pymongo import MongoClient
from flaskext.mysql import MySQL
import bcrypt

app = Flask(__name__)

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'jaglike'
app.config['MYSQL_DATABASE_DB'] = 'dep'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
db = MySQL(app)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/login', methods = ['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        connect = db.connect()
        cursor = connect.cursor()
        cursor.execute("SELECT * FROM user_auth WHERE username = %s",(username))
        data = cursor.fetchall()
        if not data or data[0][1]!=password:
            return 'Invalid Username or Password'
        session["logged_in"]=1
        session["username"]=username
        return render_template('home.html')

    return render_template('login.html')

@app.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        connect = db.connect()
        cursor = connect.cursor()
        cursor.execute("SELECT * FROM user_auth WHERE username = %s",(username))
        data = cursor.fetchall()
        if not data:
            cursor.execute("INSERT INTO user_auth(username, password) VALUES (%s, %s)",(username, password))
            connect.commit()
            cursor.close()
            session["logged_in"]=1
            session["username"]=username
            return render_template('home.html')
        else:
            return "Username already exists."
    return render_template('register.html')

@app.route('/logout')
def logout():
    session["logged_in"]=0
    return render_template('home.html')

if __name__ == '__main__':
    app.secret_key='secret123'
    app.run(debug=True)
