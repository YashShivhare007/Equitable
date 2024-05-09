from flask import Flask
from flask_cors import CORS
import os
import sqlite3
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'yash-22'
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app,origins='http://localhost:3000', supports_credentials=True)

def get_db_connection():
    db_path = os.path.join(os.path.dirname(__file__), '..', 'ImageClassifier.db')
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn
def create_tables():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    conn.commit()
    cursor.execute("CREATE TABLE IF NOT EXISTS users (id varchar(255) PRIMARY KEY, username varchar(255), email varchar(255), age int, password varchar(255))")
    conn.commit()

    cursor.execute("CREATE TABLE IF NOT EXISTS image_classifier (id varchar(255) PRIMARY KEY, name varchar(255), image BLOB, user_id varchar(255), category varchar(255), type varchar(255), FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE)")
    conn.commit()

    cursor.execute("CREATE TABLE IF NOT EXISTS manager_salary (id varchar(255) PRIMARY KEY, salary int, FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE)")
    conn.commit()
    
    conn.close()

create_tables()


if __name__ == '__main__':
    app.run(debug=True,port=6000)
from app.resources.UserResource import *
from app.resources.ManagerResource import *
import os