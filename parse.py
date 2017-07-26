import json
from collections import defaultdict

datas = json.load(open("newcountry.json", "r"))

# region = defaultdict(int)

# num = 0

# for node in datas["nodes"]:
# 	if node["type"] == "region":
# 		num += 1
# 	# region[node["type"]] += 1

# print num
print len(datas["nodes"])