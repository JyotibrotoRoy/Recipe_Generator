import os
import pandas as pd

# df = pd.read_csv(r"data/RAW_recipes.csv")
# df.head()

# df.to_json(r"data/RAW_recipes.json", orient="records", indent=4)
# print("Conversion successful! JSON saved.")

file_path = "data/RAW_recipes.csv"

# Check if file exists
if not os.path.exists(file_path):
    print(f"Error: File '{file_path}' not found!")
else:
    df = pd.read_csv(file_path)
    df.to_json("data/RAW_recipes.json", orient="records", indent=4)
    print("Conversion successful! JSON saved.")