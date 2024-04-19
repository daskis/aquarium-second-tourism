from flask import Flask, request
from flask_restplus import Api, Resource, fields
from feedback import FeedbackDatabase

app = Flask(__name__)
api = Api(app, version='1.0', title='Feedback API',
          description='A simple Feedback API')

# Define the model for the feedback input
feedback_model = api.model('Feedback', {
    'rate': fields.Integer(required=True, min=1, max=5, description='Rate from 1 to 5'),
    'text': fields.String(required=True, description='Feedback text'),
    'user_uuid': fields.String(required=True, description='User UUID'),
    'place_id': fields.Integer(required=True, description='Place ID')
})

# Initialize the database
db = FeedbackDatabase('feedback.db')

@api.route('/feedback')
class FeedbackList(Resource):
    @api.expect(feedback_model)
    def post(self):
        # Create a new feedback
        data = request.json
        db.create_feedback(data['rate'], data['text'], data['user_uuid'], data['place_id'])
        return {'message': 'Feedback created successfully'}, 201

@api.route('/feedback/unprocessed')
class UnprocessedFeedback(Resource):
    def get(self):
        # Get the first unprocessed feedback
        feedback = db.get_first_unprocessed_feedback()
        if feedback:
            return {'feedback': feedback}, 200
        else:
            return {'message': 'No unprocessed feedback found'}, 404

@api.route('/feedback/<int:feedback_id>/process')
@api.param('feedback_id', 'The Feedback identifier')
class FeedbackProcess(Resource):
    def put(self, feedback_id):
        # Mark feedback as processed
        db.mark_feedback_as_processed(feedback_id)
        return {'message': 'Feedback marked as processed'}, 200

app.run(debug=True)
