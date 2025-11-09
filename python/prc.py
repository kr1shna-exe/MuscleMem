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

def traverse(obj: Dict[str, Any]):
    result = {}
    for key, value in obj.items():
        if (type(value) == type(obj)):
            inner = traverse(value)
            result.update(inner)
        else:
            result[key] = value
    return result
#
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
# Output: [1, 2, 3, 4, 5]

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
# Output = 6 (1, 2, 3, 4, 5, 6)

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
