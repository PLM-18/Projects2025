# CRUD Operation Daemon

- Would you look it that, another daemon😂
- This daemon is used to perform **CRUD** operations and manage various json objects.

## Expected JSON Objects
The objects will be stored in document stores nested into complex structures.
```json
{
  "_id": "user123",
  "name": "Alice",
  "age": 30,
  "email": "alice@example.com",
  "address": {
    "street": "123 Main St",
    "city": "Wonderland",
    "zip": "12345"
  }
}
```

## The Goal
To Create Components for
- Data Storage
- Indexing (This can be challenging, might have to swicth to key-value storage).
- Query Processing