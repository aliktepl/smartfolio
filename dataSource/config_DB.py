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
def insert_coin_data(data):
    cur = conn.cursor()
    query = """
        INSERT INTO coins (id, name, symbol, sentiment, tech_info, graph)
        VALUES (%s, %s, %s, %s, %s, %s)
        ON CONFLICT (id)
        DO UPDATE SET
            name = EXCLUDED.name,
            symbol = EXCLUDED.symbol,
            sentiment = EXCLUDED.sentiment,
            tech_info = EXCLUDED.tech_info,
            graph = EXCLUDED.graph;
    """
    cur.execute(query, data)
    conn.commit()
    cur.close()


def finish_DB_connection():
    conn.close()




def insert_articles_to_DB(data):
    try:
        cur = conn.cursor()
        data = [(rank, coin, json.dumps(article)) for rank, coin, article in data]
        print(data)
        query =  """
            INSERT INTO articles (rank, coin, article)
            VALUES %s
            ON CONFLICT (rank, coin)
            DO UPDATE SET article = EXCLUDED.article
        """

        # Use execute_values for efficient bulk insertion
        execute_values(cur, query, data)
        conn.commit()

        print("Articles inserted successfully.")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        cur.close()
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


