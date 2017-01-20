# 
#   Name: Shan Li Nio
#   Studentnumber: 6222420
#   Json Converter.py

#   Description: Function for formatting data into JSON format.

import csv
import json

with open('Europe_data.csv','r') as file:

    reader = csv.reader(file, delimiter=';')
    headerlist = next(reader)
    csvlist = []

    for row in reader:
        data = {}

        for i, value in enumerate(row):
            # use headerlist[i] as key
            data[headerlist[i]] = value

        csvlist.append(data)

with open('europe_data.json', 'w') as file:
    json.dump(csvlist,file)