from flask import Flask, request
from feedback import FeedbackDatabase
from flasgger import Swagger

app = Flask(__name__)
swagger = Swagger(app)

# Initialize the database
db = FeedbackDatabase('feedback.db')

@app.route('/feedback', methods=['POST'])
def create_feedback():
    """
    Create a new feedback entry.
    ---
    tags:
      - Feedback
    parameters:
      - in: body
        name: body
        schema:
          type: object
          required:
            - rate
            - text
            - user_uuid
            - place_id
          properties:
            rate:
              type: integer
              minimum: 1
              maximum: 5
              description: Rate from 1 to 5
            text:
              type: string
              description: Feedback text
            user_uuid:
              type: string
              description: User UUID
            place_id:
              type: integer
              description: Place ID
    responses:
      201:
        description: Feedback created successfully
    """
    data = request.json
    db.create_feedback(data['rate'], data['text'], data['user_uuid'], data['place_id'])
    return {'message': 'Feedback created successfully'}, 201

@app.route('/feedback/unprocessed', methods=['GET'])
def get_unprocessed_feedback():
    """
    Get the first unprocessed feedback entry.
    ---
    tags:
      - Feedback
    responses:
      200:
        description: A feedback entry that has not been processed.
        schema:
          id: Feedback ID
          type: object
          properties:
            rate:
              type: integer
              description: Rate from 1 to 5
            text:
              type: string
              description: Feedback text
            user_uuid:
              type: string
              description: User UUID
            is_processed_by_ai:
              type: boolean
              description: Whether the feedback has been processed by AI
            place_id:
              type: integer
              description: Place ID
      404:
        description: No unprocessed feedback found.
    """
    feedback = db.get_first_unprocessed_feedback()
    if feedback:
        return {'feedback': feedback}, 200
    else:
        return {'message': 'No unprocessed feedback found'}, 404

@app.route('/feedback/<int:feedback_id>/process', methods=['PUT'])
def mark_feedback_as_processed(feedback_id):
    """
    Mark a feedback entry as processed.
    ---
    tags:
      - Feedback
    parameters:
      - name: feedback_id
        in: path
        required: true
        type: integer
        description: The ID of the feedback to be marked as processed.
    responses:
      200:
        description: Feedback marked as processed.
        schema:
          type: object
          properties:
            message:
              type: string
              description: Confirmation message of the feedback being processed.
    """
    db.mark_feedback_as_processed(feedback_id)
    return {'message': 'Feedback marked as processed'}, 200

if __name__ == '__main__':
    app.run(debug=True)
