from gpt4free import G4FLLM
from langchain.llms.base import LLM
from g4f import Provider, models
import mysql.connector
from mysql.connector import Error
import time

def ProcessTextDB(text, id=1):
    llm: LLM = G4FLLM(
        model=models.gpt_35_turbo,
        # provider=Provider.Aichat,
    )

    print(f"Processing text: {text}")
    MSG = f"""
        Write a message using 5 words for the following text: {text}
    """

    res = llm(MSG)
    return res

def getDBData():
    try:
        # Establish a database connection
        connection = mysql.connector.connect(host='localhost',
                                             database='laravel',
                                             user='sail',
                                             password='password')
        if connection.is_connected():
            cursor = connection.cursor()
            print("Connected to MySQL database")  # Добавлено для логирования

            # Select the first item with is_processed=False and is_sended=False
            query = ("SELECT id, chat_id, text FROM messages "
                     "WHERE is_done = False AND is_send_to_processing = False "
                     "LIMIT 1")
            cursor.execute(query)

            # Fetch one record
            record = cursor.fetchone()
            print(f"Fetched record: {record}")

            if record:
                id, chat_id, text = record

                # Update is_sended to True for the fetched record
                update_query = ("UPDATE messages SET is_send_to_processing = True "
                                "WHERE text = %s")
                cursor.execute(update_query, (text,))
                connection.commit()

                # Call the ProcessTextDB function
                answer = ProcessTextDB(text, id)

                # Update is_processed to True for the fetched record
                update_query = ("UPDATE messages SET is_done = True "
                                "WHERE text = %s")
                cursor.execute(update_query, (text,))
                connection.commit()

                # Create a new message with the answer and actor set to 'ai'
                insert_query = ("INSERT INTO messages (chat_id, text, actor, is_done, is_send_to_processing) "
                                "VALUES (%s, %s, 'ai', True, True)")
                cursor.execute(insert_query, (chat_id, answer))
                connection.commit()

            else:
                print("No items to process.")

    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")

def main():

    while(True):
        getDBData()
        time.sleep(5)


if __name__ == "__main__":
    main()
