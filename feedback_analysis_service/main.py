from gpt4free import G4FLLM
from langchain.llms.base import LLM
from g4f import Provider, models
import mysql.connector
from mysql.connector import Error
import time

def ProcessTextDB(rate, text, categories):
    print(f"Processing text: {text}")
    MSG = f"""
        Answer as an analyst would answer. I will send you a user review, after reading which you must decide on the numerical indicators for this tourist enterprise. The visitor wrote: '{text}' and rated {rate} out of 5. In the response, return only a numerical indicator from 0.1 to 0.9 separated by a symbol ; showing customer loyalty in the following categories: {categories}. For example: 0.5;0.3;0.7;...
    """


    llm: LLM = G4FLLM(
        model=models.gpt_35_turbo,
        # provider=Provider.Aichat,
    )

    res = llm(MSG)
    print("========================")
    print(categories)
    print(res)
    print("========================")


def getDBData():
    try:
        # Establish a database connection
        connection = mysql.connector.connect(host='localhost',
                                            database='laravel',
                                            user='sail',
                                            password='password')
        if connection.is_connected():
            cursor = connection.cursor()

            # Select the first item with is_processed=False and is_sended=False
            query = ("SELECT rate, text FROM feedback_jobs "
                    "WHERE is_processed = False AND is_sended = False "
                    "LIMIT 1")
            cursor.execute(query)

            # Fetch one record
            record = cursor.fetchone()
            if record:
                rate, text = record

                # Update is_sended to True for the fetched record
                update_query = ("UPDATE feedback_jobs SET is_sended = True "
                                "WHERE text = %s")
                cursor.execute(update_query, (text,))
                connection.commit()

                # Fetch all the organization categories
                cursor = connection.cursor()
                query = 'SELECT name FROM organization_categories'
                cursor.execute(query)
                results = cursor.fetchall()
                names_string = ', '.join([name[0] for name in results])


                # Call the ProcessTextDB function
                ProcessTextDB(rate, text, names_string)

                # Update is_processed to True for the fetched record
                update_query = ("UPDATE feedback_jobs SET is_processed = True "
                                "WHERE text = %s")
                cursor.execute(update_query, (text,))
                connection.commit()

            else:
                print("No items to process.")

    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            # print("MySQL connection is closed")

def main():

    while(True):
        getDBData()
        time.sleep(5)


if __name__ == "__main__":
    main()
