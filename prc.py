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

Output = {"name": "harkirat", "building_name": "PNR Constructions", "city": "Delhi"}

def traverse(obj: Dict[str, Any]):
    result = {}
    for key, value in obj.items():
        if (type(value) == type(obj)):
            inner = traverse(value)
            result.update(inner)
        else:
            result[key] = value
    return result

output = traverse(object)
print("Output:\n", output)

def traverseobj(obj: Dict[str, Any]):
    result = {}
    for key, value in obj.items():
        if isinstance(value, dict):
            inner = traverseobj(value)
            result.update(inner)
        else:
            result[key] = value
    return result

output = traverseobj(object)
print("Output:\n", output)


Input = [1, [2, [3, 4]], 5]
Output: [1, 2, 3, 4, 5]

def flatten_list(lst: List) -> List:
    output = []
    for value in lst:
        if isinstance(value, list):
            flatten_list(value)
        else:
            output.append(value)
    return output

One = flatten_list(Input)
print("Output:\n", One)

Input = {
    "a": 1,
    "b": [2, 3],
    "c": {
        "d": 4,
        "e": [5, {"f": 6}]
    }
}
Output = 6 (1, 2, 3, 4, 5, 6)

def count_items(data: Union[Dict, List]) -> int:
    count = 0
    if isinstance(data, dict):
        for _, value in data.items():
            if isinstance(value, (list, dict)):
                count += count_items(value)
            else:
                count += 1
    elif isinstance(data, list):
        for value in data:
            if isinstance(value, (list, dict)):
                count += count_items(value)
            else:
                count += 1
    else:
        count += 1
    return count

output = count_items(Input)
print("Output:\n", output)


Input = {
    "user": {
        "name": "Krishna",
        "scores": [10, 20, {"bonus": 5}]
    }
}

# Output = 
# clone = deep_copy(data)
# clone["user"]["scores"][2]["bonus"] = 99
#
# print(data["user"]["scores"][2]["bonus"])  # 5  (unchanged)
# print(clone["user"]["scores"][2]["bonus"]) # 99

def deep_copy(data: Union[ Dict, List ]) -> Dict:
    if isinstance(data, dict):
        new_copy = {}
        for key, value in data.items():
            if isinstance(value, (list, dict)):
                inner = deep_copy(value)
                new_copy[key] = inner
            else:
                new_copy[key] = value
    elif isinstance(data, list):
        new_copy = []
        for value in data:
            if isinstance(value, (list, dict)):
                inner = deep_copy(value)
                new_copy.append(inner)
            else:
                new_copy.append(value)
    return new_copy

clone = deep_copy(Input)
clone["user"]["scores"][2]["bonus"] = 99
print(clone["user"]["scores"][2]["bonus"])
print(Input["user"]["scores"][2]["bonus"])

Input = "aaabbccccdaa"
Output = a3b2c4d1a2 # If not shorter than Input then return Input

def compress_string(s: str) -> str:
    res, i = '', 0
    while i < len(s):
        ct = 1
        while i + 1 < len(s) and s[i + 1] == s[i]:
            ct += 1
            i += 1
        res += s[i] + str(ct)
        i += 1
    return res if len(res) < len(s) else s

print(compress_string(Input))

def compress_string(s: str) -> str:
    res = ''
    ct = 1
    for i in range(len(s) - 1):
        if s[i] == s[i + 1]:
            ct += 1
        else:
            res += s[i] + str(ct)
            ct = 1
    return res if res < s else s
print(compress_string(Input))

Output = 
""                  → True
"()[]{}"            → True
"( [ { } ] )"      → True   (ignore spaces if you want)
"(]"                → False
"([)]"              → False
"((("               → False
")("                → False

def is_valid_brackets(s: str) -> bool:
    if not s:
        return True
    stack = []
    pairs = { ')' : '(', '}' : '{', ']' : '['}
    for i in range(len(s)):
        if s[i] in '({[':
            stack.append(s[i])
        elif s[i] in pairs:
            if pairs[s[i]] != stack.pop():
                return False
    return True if not stack else False

print(is_valid_brackets("a+(b*c)-[d]"))
