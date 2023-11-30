import os

# Get the current directory
current_directory = os.getcwd()

# Iterate through files in the current directory
for filename in os.listdir(current_directory):
    if filename.endswith(".png") and "-" in filename:
        new_filename = filename.replace("-", "")
        os.rename(filename, new_filename)