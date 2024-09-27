from app import app, db
from flask import request, jsonify
from models import Friend


# Get All Friends
@app.route("/api/friends/", methods=["GET"])
def get_friends():
    friends = Friend.query.all()
    result = [friend.to_json() for friend in friends]
    return jsonify(result), 200

# Creat A Friend


@app.route('/api/friends', methods=['POST'])
def create_friend():
    try:
        data = request.json

        # Validation
        required_fields = ['name', 'role', 'description', 'gender']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f'Missing required field: {field}'}), 400

        name = data.get('name')
        role = data.get('role')
        description = data.get('description')
        gender = data.get('gender')

        # Fetch Avatar Image Based on Gender
        if gender == 'male':
            img_url = f'https://avatar.iran.liara.run/public/boy?username={
                name}'
        elif gender == 'female':
            img_url = f'https://avatar.iran.liara.run/public/girl?username={
                name}'

        new_friend = Friend(name=name, role=role,
                            description=description, gender=gender, img_url=img_url)

        db.session.add(new_friend)
        db.session.commit()

        return jsonify(new_friend.to_json()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# Delete a Friend
@app.route('/api/friends/<int:id>', methods=["DELETE"])
def delete_friend(id):
    try:
        friend_id = Friend.query.get(id)
        if friend_id is None:
            return jsonify({'error': 'Friend not found'}), 404

        db.session.delete(friend_id)  # Delete the Friend With id
        db.session.commit()
        return jsonify({'msg': f'Friend with this id Deleted : {friend_id}'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# Update a Friend Profile
@app.route('/api/friends/<int:id>', methods=["PATCH"])
def update_friend(id):
    try:
        friend_id = Friend.query.get(id)

        if friend_id is None:
            return jsonify({'error': 'Friend not found'}), 404

        data = request.json

        friend_id.name = data.get('name', friend_id.name)
        friend_id.role = data.get('role', friend_id.role)
        friend_id.description = data.get('description', friend_id.description)
        friend_id.gender = data.get('gender', friend_id.gender)

        db.session.commit()
        return jsonify(friend_id.to_json()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
