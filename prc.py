from typing import Any, Dict

result = {}

object = {
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

# def traverse(obj: Dict[str, Any]):
#     for key, value in obj.items():
#         if (type(value) == type(key)):
#             traverse(value)
#         else:
#             result[key] = value
#
# traverse(object)
# print("Output:\n", result)

def traverseobj(obj: Dict[str, Any]):
    for key, value in obj.items():
        if isinstance(value, dict):
            traverseobj(value)
        else:
            result[key] = value

traverseobj(object)
print("Output:\n", result)
