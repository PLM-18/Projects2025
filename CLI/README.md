# NoSQL CLI Tool

A simple Command Line Interface (CLI) tool for interacting with a NoSQL database.

## Features

### List Collections
- View all available collections in the database.

### Insert Data
- Add new documents, records, or key-value pairs into the database.

### Query Data
- Retrieve data using queries that match specific criteria.

### Update Data
- Modify existing records in the database.

### Delete Data
- Remove unwanted records from the database.

### Indexing (Optional)
- Create and manage indexes to improve query performance.

## Commands

### `show`
- List all available databases.

```sh
node cli-runner.js show
```
---
### `use <collection_name>`
- Selects a database to work with

```sh
node cli-runner.js use <collection_name>
```
---
### `insert`
- Insert a new document into a specified collection.

```sh
node cli-runner.js insert --collection <collection_name> --data '<JSON_string>'
```
- Parameters
    - `--collection` - Target collection name.
    - `--data**` - JSON string representing the document to insert.
---
## `query`
- retrieve documents based on a filter. Optional for sorting and pagination.

```sh
node cli-runner.js query --collection <collection_name> --filter '<JSON_string>' [--sort <criteria>] [--page <number>] [--limit <number>]
```
- Parameters:
    - `--collection` - Target collection name.
    - `--filter` - JSON string defining the query filter.
    - `--sort` (optional) - Sorting criteria.
    - `--page`, --limit (optional) - Pagination controls.
---
## `delete`
- Remove a document from a collection.

```sh
node cli-runner.js delete --collection <collection_name> --id <document_id>
```
- Parameters:
    - `--collection` - Target collection name.
    - `--id` - ID of the document to remove.
---
## `update`
- Update a document in a collection.

```sh
node cli-runner.js update --collection <collection_name> --id <document_id> --data '<JSON_string>'
```
- Parameters:
    - `--collection` - Target collection name.
    - `--id` - ID of the document to update.
    - `--data` - JSON string representing the updated document.
