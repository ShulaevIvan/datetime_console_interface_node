// #!/usr/bin/env node
"use strict"

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

yargs(hideBin(process.argv))
.command({
    command: 'current',
    describe: 'описание',
    builder: (yargs) => {
        return (yargs
            .option('year', {
                alias: 'y',
                describe: 'описание year',
                type: 'boolean',
            })
            .option('month', {
                alias: 'm',
                describe: 'описание month',
                type: 'boolean',
            })
            .option('date', {
                alias: 'd',
                describe: 'описание date',
                type: 'boolean',
            })
        )
    },
    handler: (argv) => {
      const parametrs = [
        { key: 'year',  alias: 'y', func: () => console.log(new Date().getFullYear()) },
        { key: 'month', alias: 'm', func: () => console.log(new Date().getMonth() + 1) },
        { key: 'date', alias: 'd', func: () => console.log(new Date().getDate()) }
      ];
      const checkParam = parametrs.find((param) => argv[param.key]);
      
      return checkParam ? checkParam.func() : console.log(new Date().toISOString());
    }
})
.command({
    command: 'add',
    describe: 'описание',
    builder: (yargs) => {
        return (yargs
            .option('year', {
                alias: 'y',
                describe: 'описание year',
                type: 'number',
            })
            .option('month', {
                alias: 'm',
                describe: 'описание month',
                type: 'boolean',
            })
            .option('date', {
                alias: 'd',
                describe: 'описание date',
                type: 'boolean',
            })
        )
    },
    handler: (argv) => {
        console.log('2');
    }
})
.command({
    command: 'sub',
    describe: 'описание',
    builder: (yargs) => {
        return (yargs
            .option('year', {
                alias: 'y',
                describe: 'описание year',
                type: 'boolean',
            })
            .option('month', {
                alias: 'm',
                describe: 'описание month',
                type: 'boolean',
            })
            .option('date', {
                alias: 'd',
                describe: 'описание date',
                type: 'boolean',
            })
        )
    },
    handler: (argv) => {
        console.log('2');
    }
}).strict().parse();