# from config import DB_PATH
import sqlite3
import uuid
import random
import os

# Function to get a database connection
def get_db_connection():
    path  = os.path.join(os.path.dirname(__file__), '..', 'ImageClassifier.db')
    conn = sqlite3.connect(path)
    conn.row_factory = sqlite3.Row
    return conn

# def delete_table():
#     conn = get_db_connection()
#     cursor = conn.cursor()
#     cursor.execute("DROP TABLE IF EXISTS image_classifier")
#     conn.commit()
#     conn.close()

def delete_table_content():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM image_classifier")
    conn.commit()
    conn.close()