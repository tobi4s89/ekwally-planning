export const pascalCaseToArray = (input: string) => {
    const result: string[] = []
    let currentWord = ''

    for (const char of input) {
        if (char === char.toUpperCase()) {
            if (currentWord) {
                result.push(currentWord)
                currentWord = ''
            }
        }
        currentWord += char
    }

    if (currentWord) {
        result.push(currentWord)
    }

    return result
}