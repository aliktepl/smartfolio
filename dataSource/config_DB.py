import json

import psycopg2
from psycopg2.extras import execute_values

# Connection parameters
conn = psycopg2.connect(
    dbname='postgres',
    user='smartfolio',
    password='1234',
    host='localhost',
    port=5432  # Usually 5432 by default

)


# Create a cursor to execute queries
def insert_coin_data (data):
    cur = conn.cursor()
    query = """
        INSERT INTO coins (id, name, symbol, change, sentiment)
        VALUES (%s, %s, %s, %s, %s)
        ON CONFLICT (id) DO NOTHING
    """

    cur.execute(query,data)
    conn.commit()

    cur.close()
    conn.close()



def insert_articles_to_DB(data):
    try:
        cur = conn.cursor()
        data = [(rank, coin, json.dumps(article)) for rank, coin, article in data]
        print(data)
        query = """
            INSERT INTO articles (rank, coin, article)
            VALUES %s
        """

        # Use execute_values for efficient bulk insertion
        execute_values(cur, query, data)
        conn.commit()

        print("Articles inserted successfully.")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        cur.close()
        conn.close()
# data = (
#     'BTC',  # id
#     'Bitcoin',  # name
#     'BTC',  # symbol
#     2.5,  # change
#     json.dumps({"mood": "positive", "score": 8})  # sentiment as JSON
# )
# insert_coin_data(data)
# Example query

# Close the cursor and connection


