var chalk = require('chalk'),
    program = require('commander'),
    utils = require('../utils'),
    yaspeller = require('../yaspeller'),
    hasErrors = false,
    counter = 0;

function getTypos(data, code) {
    var typos = [],
        num = 1;
    data.forEach(function(el, i) {
        if(el.code !== code) {
            return;
        }

        var comment = [],
            word = el.word;

        if(el.count > 1) {
            comment.push(chalk.cyan('count: ' + el.count));
        }

        if(utils.hasEnRu(word)) {
            comment.push(chalk.red('en: ' + word.replace(/[а-яё]/gi, '*')));
            comment.push(chalk.green('ru: ' + word.replace(/[a-z]/gi, '*')));
        }

        if(el.suggest) {
            comment.push(chalk.cyan('suggest: ' + el.suggest.join(', ')));
        }

        typos.push(num + '. ' + word + (comment.length ? ' (' + comment.join(', ') + ')' : ''));
        num++;
    });

    return typos;
}

function hasManyErrors(data) {
    return data.some(function(el) {
        return el.code === 4; // ERROR_TOO_MANY_ERRORS
    });
}

module.exports = {
    oneach: function(err, data) {
        counter++;

        var errors = [];
        if(err || (data && data.data && data.data.length)) {
            hasErrors = true;
        }

        if(err) {
            console.error(chalk.red(data));
        } else {
            if(hasManyErrors(data.data)) {
                errors.push(chalk.red('Too many errors'));
            }

            yaspeller.errors.forEach(function(el) {
                var typos = getTypos(data.data, el.code);
                if(typos.length) {
                    errors.push(chalk.red(el.title + ': ' +
                        typos.length + '\n') +
                        typos.join('\n') + '\n');
                }
            });

            var time = data.time ? ' ' + chalk.magenta(data.time + ' ms') : '',
                separator = chalk.red('-----\n'),
                res = data.resource;

            if(utils.isUrl(res)) {
                res = chalk.underline(res);
            }

            if(errors.length) {
                console.error(chalk.red(utils.errSym) +  ' ' + res + time + '\n' +
                    separator + errors.join('\n') + separator);
            } else if(!program.onlyErrors) {
                console.log(chalk.green(utils.okSym) + ' ' + res + time);
            }
        }
    },
    onend: function() {
        if(!program.onlyErrors && counter) {
            if(!hasErrors) {
                console.log(chalk.green('No errors.'));
            }

            console.log(chalk.magenta('Checking finished: ' + process.uptime() + ' sec.'));
        }
    }
};
