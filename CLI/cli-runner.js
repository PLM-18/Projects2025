const {Command} = require('commander');
const program = new Command();

program
    .name('cli-runner')
    .description('A simple CLI runner for NOQSL databases')
    .version('0.0.1')


program
    .command('show')
    .description('List all databases')
    .action(() => {
        console.log('List all databases')
    })

program
    .command('use <db>')
    .description('Use a database')
    .action((db) => {
        console.log(`Use database ${db}`)
    })

program
    .command('create <db>')
    .description('Create a new database')
    .action((db) => {
        console.log(`Create database ${db}`)
    })

program
    .command('drop <db>')
    .description('Drop a database')
    .action((db) => {
        console.log(`Drop database ${db}`)
    })

program
    .command('insert')
    .description('Insert data into a database')
    .option('--collection <collection_name>', 'Collection name')
    .option('--data <JSON_string>', 'Data to insert')
    .action((options) => {
        const { collection, data } = options;
        console.log(`Insert data into collection ${collection}: ${data}`);
    });

program
    .command('query')
    .description('Query data from a database')
    .option('--collection <collection_name>', 'Collection name')
    .option('--filter <JSON_string>', 'Filter criteria')
    .option('--sort <criteria>', 'Sort criteria')
    .option('--page <number>', 'Page number')
    .option('--limit <number>', 'Limit number of results')
    .action((options) => {
        const { collection, filter, sort, page, limit } = options;
        console.log(`Querying collection ${collection} with filter ${filter}, sort ${sort}, page ${page}, limit ${limit}`);
    });

program
    .command('update')
    .description('Update data in a database')
    .option('--collection <collection_name>', 'Collection name')
    .option('--id <document_id>', 'Id to update')
    .option('--data <JSON_string>', 'Filter criteria')
    .action((options) => {
        const { collection, id, data } = options;
        console.log(`Update data in collection ${collection} with id ${id}: ${data}`);
    });

program
    .command('delete')
    .description('Delete data from a database')
    .option('--collection <collection_name>', 'Collection name')
    .option('--id <document_id>', 'Id to delete')
    .action((options) => {
        const { collection, id } = options;
        console.log(`Delete data from collection ${collection} with id ${id}`);
    });


program.parse(process.argv);