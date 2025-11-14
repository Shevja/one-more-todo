import chalk from "chalk";

function loggerPaddingTextUtil(text: string) {
    const padding = 40;
    return ' ' + text + ' '.repeat(padding)
}

export const logger = {
    padded: (text: string) => {
    },

    info: (...msg: unknown[]) =>
        console.log(chalk.bgBlue(' ИНФО '), ...msg, '\n'),

    success: (...msg: unknown[]) =>
        console.log(chalk.bgGreen(' УСПЕШНО '), ...msg, '\n'),

    error: (...msg: unknown[]) =>
        console.log(chalk.bgRed(' Ошибка '), ...msg, '\n'),

    debug: (...msg: unknown[]) =>
        console.debug(chalk.bgMagenta(' ОТЛАДКА '), ...msg, '\n'),

    group: {
        info: (...msg: unknown[]) => {
            const text = msg.join(' ')
            console.group(chalk.bgBlue(`                        ${text}                        `))
        },

        text: (...msg: unknown[]) => {
            const text = msg.join(' ')
            const padded = loggerPaddingTextUtil(text)
            console.group(chalk.bgWhite.black(padded), '\n')
        }
    },
}