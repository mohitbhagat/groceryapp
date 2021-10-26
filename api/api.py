from flask import Flask
from flask import request
import sqlite3
import json
import os.path

app = Flask(__name__, static_folder="../build", static_url_path="/")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE_PATH = os.path.join(BASE_DIR, "grocery.db")

# DATABASE HELPER METHOD
def get_db():
  return sqlite3.connect(DATABASE_PATH)

@app.route("/items", methods=['GET'])
def items():
  connection = get_db()
  cursor = connection.cursor()
  cursor.execute("SELECT * FROM items;")
  result = cursor.fetchall()
  connection.close()
  return { "items": result }


@app.route("/update", methods=['POST'])
def update():
  message = ""
  data = request.get_json()
  try:
    connection = get_db()
    cursor = connection.cursor()
    cursor.execute(
      f"""
      UPDATE items SET
        itemName='{data["itemName"]}', amount={data["amount"]}, 
        units='{data["units"]}', checked={data["checked"]}
        WHERE id={data['id']};
      """)
    connection.commit()
    message = "success"
  except:
    connection.rollback()
    message = f"Error. Failed to update item with id {data['id']}"
  finally:
    connection.close()
    return {"message": message}

@app.route("/add", methods=['POST'])
def add():
  message = ""
  data = request.get_json()
  newID = None
  try:
    connection = get_db()
    cursor = connection.cursor()
    query = f"""
        INSERT INTO items (itemName, amount, units, checked) VALUES
          ('{data["itemName"]}', {data["amount"]}, 
          '{data["units"]}', {data["checked"]});
        """
    cursor.execute(query)
    connection.commit()
    newID = cursor.execute("SELECT MAX(id) FROM items;").fetchone()[0]
    message = "success"
  except:
    connection.rollback()
    message = "Error. Failed to add item."
  finally:
    return {"message": message, "id": newID}

@app.route("/delete", methods=['DELETE'])
def delete():
  message = ""
  data = request.get_json()
  try:
    connection = get_db()
    cursor = connection.cursor()
    cursor.execute(f"DELETE FROM items WHERE id == {data['id']};")
    connection.commit()
    message = "success"
  except:
    connection.rollback()
    message = f"Error. Failed to delete item with id {data['id']}"
  finally:
    connection.close()
    return {message: "message"}


@app.route("/deleteall", methods=['DELETE'])
def deleteAll():
  message = ""
  try:
    connection = get_db()
    cursor = connection.cursor()
    cursor.execute("DELETE FROM items;")
    connection.commit()
    message = "success"
  except:
    connection.rollback()
    message = "Error while deleting all items"
  finally:
    connection.close()
    return {"message": message}
