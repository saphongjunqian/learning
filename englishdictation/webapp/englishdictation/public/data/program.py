import json

data = []
srcfile = 'highschool2a.json'
tgtfile = 'highschool2b.json'
with open(srcfile, 'r', encoding = 'utf-8') as file:
    lines = file.readlines()
    for i in range(0, len(lines), 2):
        enword = lines[i].strip()
        cnword = lines[i+1].strip()
        data.append({"enword": enword, "cnword": cnword})

# Append the data to file cet4.json
with open(tgtfile, 'w', encoding = 'utf-8') as file:
    json.dump(data, file, ensure_ascii = False)
