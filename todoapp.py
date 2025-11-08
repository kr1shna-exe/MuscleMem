print("--------------Made In Python-------------------")
print("-----WELCOME TO TODO APPLICATION-----")
print("Let's Say Bye To Laziness & Strive Towards Consistency!")

todoList = []

def add_to_list():
    new_task = input("What do you want to add: ")
    todoList.append({"task": new_task, "status": "pending"})
    print("Task Added Successfully")

def show_task_list():
    print("\nTODO LIST")
    print("---------------------")
    # for i, task in todoList:
    #     print(f"{i+1}. {task['task']}")
    for i, task in enumerate(todoList, start=1):
        print(f"{i}. {task['task']} : {task['status']}")

def remove_task():
    if len(todoList) == 0:
        print("List is Empty")
        return 
    show_task_list() 
    task_to_remove = int(input("Enter the task number that you want to remove:"))
    if task_to_remove < 1 or task_to_remove > len(todoList):
        print("Please enter the correct number for the existing tasks")
        return
    # todoList.remove(todoList[task_to_remove - 1])
    todoList.pop(task_to_remove - 1)
    print(f"Successfully removed the task from the list")

def mark_as_done():
    if len(todoList) == 0:
        print("Nothing added to mark as done")
        return
    show_task_list()
    task_number = int(input("Enter the task number you want to mark: "))
    if task_number < 1 or task_number > len(todoList):
        print("Enter valid task number")
        return
    todoList[task_number - 1]['status'] = "completed"
    print("Task marked as done")

while True:
    print("\nOptions")
    print("-------")
    print("1. Add To List")
    print("2. Remove From List")
    print("3. Show The List")
    print("4. Mark Task As Done")
    print("0. To Exit\n")
    option = int(input("What do you want to do today(1/2/3/4/0): "))
    if option == 1:
        add_to_list()
    elif option == 2:
        remove_task()
    elif option == 3:
        show_task_list()
    elif option == 4:
        mark_as_done()
    elif option == 0:
        print("Exiting the program...")
        break
    else:
        print("Enter a valid option from the list")
