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
    print("inserting this data to coins: \n", data)
    query = """
        INSERT INTO coins (id, name, symbol, sentiment, tech_info, graph, popularity)
        VALUES (%s, %s, %s, %s, %s, %s,%s)
        ON CONFLICT (id)
        DO UPDATE SET
            name = EXCLUDED.name,
            symbol = EXCLUDED.symbol,
            sentiment = EXCLUDED.sentiment,
            tech_info = EXCLUDED.tech_info,
            graph = EXCLUDED.graph,
            popularity =  EXCLUDED.popularity;
    """
    cur.execute(query, data)
    conn.commit()
    cur.close()


def finish_DB_connection():
    conn.close()


def insert_comments_to_DB(data):
    try:
        cur = conn.cursor()
        query = """
            INSERT INTO comments (rank, coin, comment)
            VALUES %s
            ON CONFLICT (rank, coin)
            DO UPDATE SET comment = EXCLUDED.comment
        """
        execute_values(cur, query, data)
        conn.commit()
        print("comments inserted successfully.")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        cur.close()
def insert_articles_to_DB(data):
    try:
        cur = conn.cursor()
        data = [(rank, coin, json.dumps(article)) for rank, coin, article in data]
        # print(data)
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


def create_tables():
    try:
        # Create a cursor object
        cur = conn.cursor()

        # SQL query to create the comments table
        create_comments_table = """
        CREATE TABLE IF NOT EXISTS comments (
            rank INTEGER,
            coin VARCHAR(255),
            comment JSON,
            PRIMARY KEY (rank, coin)
        );
        """

        # SQL query to create the articles table
        create_articles_table = """
        CREATE TABLE IF NOT EXISTS articles (
            rank INT,
            coin VARCHAR(255),
            article JSON,
            PRIMARY KEY (rank, coin)
        );
        """

        # SQL query to create the coins table
        create_coins_table = """
        CREATE TABLE IF NOT EXISTS coins (
            id VARCHAR NOT NULL PRIMARY KEY,
            name TEXT, 
            symbol VARCHAR,
            sentiment JSON,
            tech_info JSON,
            graph JSON,
            popularity INTEGER
        );
        """

        # SQL query to create the users table
        create_users_table = """
        CREATE TABLE IF NOT EXISTS users (
            id VARCHAR(100) PRIMARY KEY,
            name VARCHAR(100)
        );
        """

        # SQL query to create the wallets table
        create_wallets_table = """
        CREATE TABLE IF NOT EXISTS wallets (
            user_id VARCHAR(100),
            coin_id VARCHAR(100),
            amount DOUBLE PRECISION,
            UNIQUE (user_id, coin_id)
        );
        """

        # Execute the queries
        cur.execute(create_comments_table)
        cur.execute(create_articles_table)
        cur.execute(create_coins_table)
        cur.execute(create_users_table)
        cur.execute(create_wallets_table)

        # Commit the transaction
        conn.commit()

        print("Tables created successfully (if they did not exist).")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        cur.close()
