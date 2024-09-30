from textblob import TextBlob
import pandas as pd


testimonial = TextBlob("Textblob is amazingly simple to use. What great fun!")
print(testimonial.sentiment.polarity)

# Specify the path to your Excel file
excel_file_path = 'data_bitcoin.xlsx'

# Load the Excel file into a pandas dataframe
df = pd.read_excel(excel_file_path)

# Specify the column you want to iterate over
column_name = 'Text'

# Check if the specified column exists in the dataframe
if column_name in df.columns:
    # Iterate over every line in the specified column
    for value in df[column_name]:
        testimonial = TextBlob(str(value))
        # testimonial.sentiment
        print(testimonial.sentiment.polarity)
        # Your code to process each value in the column
        print(value)


else:
    print(f"Column '{column_name}' not found in the Excel file.")


