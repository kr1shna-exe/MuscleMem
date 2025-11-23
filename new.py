from typing import Any, Dict, List, Union

Input = {
  "name": "harkirat",
  "address": {
    "place": {
      "street": {
        "houseno": {
          "building_name": "PNR Constructions",
          "city": "Delhi",
        },
      },
    },
  },
};

# Output = {"name": "harkirat", "building_name": "PNR Constructions", "city": "Delhi"}

def traverseObj(obj: dict) -> dict:
    result = {}
    for key,value in obj.items():
        if (type(value) == type(obj)):
            res = traverseObj(value)
            result.update(res)
        else:
            result[key] = value
    return result

def traverseObj1(obj: Dict[str, Any]) -> dict:
    result = {}
    for key,value in obj.items():
        if isinstance(value, dict):
            res = traverseObj(value)
            result.update(res)
        else:
            result[key] = value
    return result

Input = [1, [2, [3, 4]], 5]
# Output: [1, 2, 3, 4, 5]

def flatten(items: list) -> list:
    output = []
    for val in items:
        if (type(val) == type(items)):
            res = flatten(val)
            output.extend(res)
        else:
            output.append(val)
    return output

def flatten_list(items: List) -> List:
    output = []
    for val in items:
        if isinstance(val, list):
            res = flatten_list(val)
            output.extend(res)
        else:
            output.append(val)
    return output


Input = {
    "a": 1,
    "b": [2, 3],
    "c": {
        "d": 4,
        "e": [5, {"f": 6}]
    }
}
# Output = 6 (1, 2, 3, 4, 5, 6)

def list_count(obj: Union[Dict, List]) -> int:
    count = 0
    if isinstance(obj, list):
        for val in obj:
            if isinstance(val, (list, dict)):
                count += list_count(val)
            else:
                count += 1
    elif isinstance(obj, dict):
        for _, val in obj.items():
            if isinstance(val, (list, dict)):
                count += list_count(val)
            else:
                count += 1
    else:
        count += 1
    return count

Input = {
    "user": {
        "name": "Krishna",
        "scores": [10, 20, {"bonus": 5}]
    }
}
#
# # Output = 
# # clone = deep_copy(data)
# # clone["user"]["scores"][2]["bonus"] = 99
# #
# # print(data["user"]["scores"][2]["bonus"])  # 5  (unchanged)
# # print(clone["user"]["scores"][2]["bonus"]) # 99

def copy(data: Union[Dict, List]) -> Dict:
    if isinstance(data, dict):
        new_copy = {}
        for key,val in data.items():
            if isinstance(val, (list, dict)):
                inner = copy(val)
                new_copy[key] = inner
            else:
                new_copy[key] = val
    elif isinstance(data, list):
        new_copy = []
        for val in data:
            if isinstance(val, (list, dict)):
                inner = copy(val)
                new_copy.append(inner)
            else:
                new_copy.append(val)
    return new_copy

Input = "aaabbccccdaa"
# Output = a3b2c4d1a2 # If not shorter than Input then return Input

def trim(data: str) -> str:
    res, i = "", 0
    while i < len(data):
        ct = 1
        while i + 1 < len(data) and data[i] == data[i + 1]:
            ct += 1
            i += 1
        res += data[i] + str(ct)
        i += 1
    return res if len(res) < len(data) else data

# Output = 
# ""                  → True
# "()[]{}"            → True
# "( [ { } ] )"      → True   (ignore spaces if you want)
# "(]"                → False
# "([)]"              → False
# "((("               → False
# ")("                → False

def valid_braces(data: str) -> bool:
    stack = []
    pairs = {"}": "{", "]": "[", ")": "("}
    for i in range(len(data)):
        if data[i] in "({[":
            stack.append(data[i])
        elif data[i] in pairs:
            if pairs[data[i]] != stack.pop():
                return False
    return True if not stack else False
            
