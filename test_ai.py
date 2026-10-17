from ai_service import explain_python_error

code = """
numbers = [1, 2, 3]
print(numbers[5])
"""

result = explain_python_error(code)

print("\nCLEARCODE AI ANALYSIS:\n")
print(result)