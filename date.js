// #!/usr/bin/env node
"use strict"

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const addSubDateFunc = (argvObj, param='add') => {
    const parametrs = [
        { key: 'year',  alias: 'y', func: () => {
            const value = Object.values(argvObj).filter((value) => !isNaN(value))[0];
            const currentDate = new Date();
            const targetYear = param === 'sub' ? 
                new Date(currentDate.setFullYear(currentDate.getFullYear() - value)).toISOString() :
                    new Date(currentDate.setFullYear(currentDate.getFullYear() + value)).toISOString();

            return console.log(targetYear);
        } },
        { key: 'month', alias: 'm', func: () => {
            const value = Object.values(argvObj).filter((value) => !isNaN(value))[0];
            const currentDate = new Date();
            const targetMonth = param === 'sub' ? 
                new Date(currentDate.setMonth(currentDate.getMonth() - value)).toISOString() : 
                    (new Date(currentDate.setMonth(currentDate.getMonth() + value)).toISOString());

            return console.log(targetMonth);
        } },
        { key: 'date', alias: 'd', func: () => {
            const value = Object.values(argvObj).filter((value) => !isNaN(value))[0];
            const currentDate = new Date();
            const targetDate = param === 'sub' ?
                new Date(currentDate.setDate(currentDate.getDate() - value)).toISOString() :
                    new Date(currentDate.setDate(currentDate.getDate() + value)).toISOString();;

            return console.log(targetDate);
        }}
    ];
    const targetParam = parametrs.find((param) => argvObj[param.key]);
    if (!targetParam) return console.log('syntax error')
    targetParam.func();
}

yargs(hideBin(process.argv))
.command({
    command: 'current',
    describe: 'display current date; keys: [-y, --year, -m, --month, -d --date];',
    builder: (yargs) => {
        return (yargs
            .option('year', {
                alias: 'y',
                describe: 'current year',
                type: 'boolean',
            })
            .option('month', {
                alias: 'm',
                describe: 'current month',
                type: 'boolean',
            })
            .option('date', {
                alias: 'd',
                describe: 'current date',
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
    describe: 'display future date; keys: [-y, --year, -m, --month, -d --date]',
    builder: (yargs) => {
        return (yargs
            .option('year', {
                alias: 'y',
                describe: 'next (number) year to ISO format',
                type: 'number',
            })
            .option('month', {
                alias: 'm',
                describe: 'next (number) month to ISO format',
                type: 'number',
            })
            .option('date', {
                alias: 'd',
                describe: 'next (number) date to ISO format',
                type: 'number',
            })
        )
    },
    handler: (argv) => {
        const parametrs = [
            { key: 'year',  alias: 'y', func: () => addSubDateFunc(argv, 'add')},
            { key: 'month', alias: 'm', func: () => addSubDateFunc(argv, 'add')},
            { key: 'date', alias: 'd', func: () => addSubDateFunc(argv, 'add')}
        ];
        const targetParam = parametrs.find((param) => argv[param.key]);
        if (!targetParam) return console.log('syntax error');
        targetParam.func();
    }
})
.command({
    command: 'sub',
    describe: 'display prev date; keys: [-y, --year, -m, --month, -d --date]',
    builder: (yargs) => {
        return (yargs
            .option('year', {
                alias: 'y',
                describe: 'prev (number) year to ISO format',
                type: 'number'
            })
            .option('month', {
                alias: 'm',
                describe: 'prev (number) month to ISO format',
                type: 'number',
            })
            .option('date', {
                alias: 'd',
                describe: 'prev (number) date to ISO format',
                type: 'number',
            })
        )
    },
    handler: (argv) => {
        const parametrs = [
            { key: 'year',  alias: 'y', func: () => addSubDateFunc(argv, 'sub')},
            { key: 'month', alias: 'm', func: () => addSubDateFunc(argv, 'sub')},
            { key: 'date', alias: 'd', func: () => addSubDateFunc(argv, 'sub')}
        ];
        const targetParam = parametrs.find((param) => argv[param.key]);
        if (!targetParam) return console.log('syntax error')
        targetParam.func();
    }
}).help().strict().parse();