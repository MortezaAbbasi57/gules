from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    course_type = data.get('course_type')

    if not name or not email or not course_type:
        return jsonify({'error': 'Missing required fields'}), 400

    # Save the registration data to a file
    with open('registrations.txt', 'a') as f:
        f.write(f'Name: {name}, Email: {email}, Course Type: {course_type}\n')

    return jsonify({'message': 'Registration successful'}), 201

if __name__ == '__main__':
    app.run(debug=True)
