import sqlite3

class FeedbackDatabase:
    def __init__(self, db_name):
        self.conn = sqlite3.connect(db_name)
        self.create_table()

    def create_table(self):
        self.conn.execute('''
            CREATE TABLE IF NOT EXISTS feedback (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                rate INTEGER CHECK(rate >= 1 AND rate <= 5),
                text TEXT,
                user_uuid TEXT,
                is_processed_by_ai BOOLEAN DEFAULT FALSE,
                place_id INTEGER
            )
        ''')
        self.conn.commit()

    def create_feedback(self, rate, text, user_uuid, place_id):
        self.conn.execute('''
            INSERT INTO feedback (rate, text, user_uuid, place_id)
            VALUES (?, ?, ?, ?)
        ''', (rate, text, user_uuid, place_id))
        self.conn.commit()

    def get_first_unprocessed_feedback(self):
        cursor = self.conn.execute('''
            SELECT * FROM feedback
            WHERE is_processed_by_ai = FALSE
            ORDER BY id ASC
            LIMIT 1
        ''')
        return cursor.fetchone()

    def mark_feedback_as_processed(self, feedback_id):
        self.conn.execute('''
            UPDATE feedback
            SET is_processed_by_ai = TRUE
            WHERE id = ?
        ''', (feedback_id,))
        self.conn.commit()

# Example usage:
# db = FeedbackDatabase('feedback.db')
# db.create_feedback(5, 'Great service!', '123e4567-e89b-12d3-a456-426614174000', 1)
# feedback = db.get_first_unprocessed_feedback()
# if feedback:
#     print('Processing feedback:', feedback)
#     db.mark_feedback_as_processed(feedback[0])
