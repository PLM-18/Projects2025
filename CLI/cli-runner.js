const {Command} = require('commander');
const program = new Command();

program
    .name('cli-runner')
    .description('A simple CLI runner for NOQSL databases')
    .version('0.0.1')


program
    .command('list')
    .description('List all databases')
    .action(() => {
        console.log('List all databases')
    })

program.parse(process.argv)