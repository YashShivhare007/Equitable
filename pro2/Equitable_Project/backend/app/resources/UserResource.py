from flask import Flask,jsonify, request
from app import app, bcrypt
from app.dao.UserDao import UserDao
from app.dao.ManagerDao import ManagerDao
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

user_dao = UserDao()
manager_dao = ManagerDao()
# Hash password before storing
def hash_password(password):
    return bcrypt.generate_password_hash(password).decode('utf-8')

# Verify password
def verify_password(plain_password, hashed_password):
    return bcrypt.check_password_hash(hashed_password, plain_password)
class UserResource:
    @app.route('/users/<int:user_id>', methods=['GET'])
    @jwt_required()
    def get_user(user_id):
        user_id = get_jwt_identity()
        user = user_dao.get_user_by_id(user_id)
        if user:
            return jsonify(user.serialize())
        return jsonify({'error': 'User not found'}), 404

    @app.route('/users/add', methods=['POST'])
    def add_user():
        username = request.json['username']
        email = request.json['email']
        age = request.json['age']
        password = request.json['password']
        # hash the password before storing
        password = hash_password(password)
        user_id = user_dao.create_user(username, email, age, password)
        if user_id is None:
            return jsonify({'error': 'Username already taken'}), 400
        return jsonify({'id': user_id})
            
                
    @app.route('/users/login', methods=['POST'])
    def login():
        username = request.json['username']
        password = request.json['password']
        user = user_dao.get_user_by_username(username)
        response = None
        if user and user.get_username() == 'admin':
            response = user.serialize()
            response['role'] = 'admin'
            access_token = create_access_token(identity=user.get_id(),  additional_claims={'role': 'admin'})
            response['access_token'] = access_token
            response = jsonify(response)
            return response
        if user and verify_password(password, user.get_password()):
            manager = manager_dao.get_manager_by_id(user.get_id())
            response = user.serialize()
            if(user.get_username() == 'admin'):
                response['role'] = 'admin'
                access_token = create_access_token(identity=user.get_id(),  additional_claims={'role': 'admin'})
                # response = jsonify(response)
                # response.set_cookie('access_token', access_token)
            elif manager:
                response['role'] = 'manager'
                # add a variable role to the user object
                access_token = create_access_token(identity=user.get_id(),  additional_claims={'role': 'manager'})
                # response = jsonify(response)
                # response.set_cookie('access_token', access_token)
            else:
                response['role'] = 'user'
                # add a variable role to the user object
                access_token = create_access_token(identity=user.get_id(),  additional_claims={'role': 'user'})
                # response = jsonify(response)
                # response.set_cookie('access_token', access_token)
            response['access_token'] = access_token
            response = jsonify(response)
        else:
            response = jsonify({'error': 'Invalid credentials'}), 401
        return response

    @app.route('/classify', methods=['POST'])
    @jwt_required()
    def classify():
        print("Reached Backend")
        userId = get_jwt_identity()
        files = request.files.getlist('files')
        categories = request.form.getlist('categories')
        types = request.form.getlist('types')
        for file,category,type in zip(files,categories,types):
            filename = file.filename
            file_content = file.read()
            img_type = type
            img_category = category
            print("THINGS GOING TO THE QUERY: ", filename, file_content, userId, img_category,img_type)
            user_dao.classify(filename, file_content, userId, img_category,img_type)
        return jsonify({"status": "Query Ran Successfully"}),200
    
    @app.route('/change_category', methods=['POST'])
    @jwt_required()
    def change_category():
        data = request.get_json()
        print(data)
        for image in data:
            image_id = image['id']
            new_category = image['category']
            user_dao.change_category(image_id, new_category)
        return jsonify({'message': 'Category updated successfully'}), 200

    @app.route('/delete_image', methods=['DELETE'])
    @jwt_required()
    def delete_image():
        data = request.get_json()
        image_id = data['imageId']
        user_dao.delete_image(image_id)
        return jsonify({'message': 'Image deleted successfully'}), 200
    



    @app.route('/get_user_classifications', methods=['POST'])
    @jwt_required()
    def get_user_classifications():
        userId = get_jwt_identity()
        data = user_dao.get_user_classifications(userId)
        return jsonify(data)
    

    @app.route('/get_all_classifications', methods=['POST'])
    @jwt_required()
    def get_all_classifications():
        userId = get_jwt_identity()
        data = user_dao.get_all_classifications(userId)
        return jsonify(data)
        
