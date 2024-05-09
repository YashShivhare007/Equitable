from app import get_db_connection
from app.models.User import User
import uuid
from base64 import b64encode
import sqlite3
from flask import jsonify, request,Flask
class UserDao:

    def delete_image(self, image_id):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM image_classifier WHERE id=?", (image_id,))
        conn.commit()
        conn.close()
        return image_id
    
    def change_category(self, image_id, new_category):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("UPDATE image_classifier SET category=? WHERE id=?", (new_category, image_id))
        conn.commit()
        conn.close()
        return image_id
    def get_user_classifications(self, userId):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, image, category, type FROM image_classifier WHERE user_id=?", (userId,))
        rows = cursor.fetchall()
        conn.close()
        classifications = []
        for id,name,image,category,img_type in rows:
            file_content = b64encode(image).decode('utf-8')
            classifications.append({"id": id, "name": name, "image": f"data:{img_type};base64,{file_content}", "category": category, "type": img_type})
        return classifications
    def get_all_classifications(self, userId):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, image, category, type FROM image_classifier")
        rows = cursor.fetchall()
        conn.close()
        classifications = []
        for id,name,image,category,img_type in rows:
            file_content = b64encode(image).decode('utf-8')
            classifications.append({"id": id, "name": name, "image": f"data:{img_type};base64,{file_content}", "category": category, "type": img_type})
        return classifications
    
    def classify(self, name, file_content, userId, category,img_type):
        id = "img_" + str(uuid.uuid4())
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO image_classifier (id, name, image, user_id, category , type) VALUES (?, ?, ?, ?, ? , ?)", (id,name, file_content, userId, category,img_type))
        conn.commit()
        conn.close()
        return userId
    
    
    def get_user_by_id(self, user_id):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE id=?", (user_id,))
        user = cursor.fetchone()
        conn.close()
        # convert user to User object
        if user:
            return User(*user)
        return None
    
    def get_user_by_username(self, username):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE username=?", (username,))
        user = cursor.fetchone()
        conn.close()
        # convert user to User object
        if user:
            return User(*user)
        return None
    
    def create_user(self, username, email, age, password):
        id = "user_" + str(uuid.uuid4())
        # check if the username is already taken
        if self.get_user_by_username(username):
            return None
        # create a User Object

        user = User(id, username, email, age, password)
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO users (id, username, email, age, password) VALUES (?, ?, ?, ?, ?)", (user.get_id(), user.get_username(), user.get_email(), user.get_age(), user.get_password()))
        conn.commit()
        conn.close()
        return user.get_id()
    
    
    def update_user(self, user_id, username=None, email=None, age=None, password=None):
        conn = get_db_connection()
        cursor = conn.cursor()
        query = "UPDATE users SET"
        if username:
            query += " username='" + username + "',"
        if email:
            query += " email='" + email + "',"
        if age:
            query += " age=" + str(age) + ","
        if password:
            query += " password='" + password + "',"
        query = query[:-1] + " WHERE id='" + user_id + "'"
        cursor.execute(query)
        conn.commit()
        conn.close()
        return user_id