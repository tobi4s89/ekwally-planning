export const pascalCaseToArray = (pascalCaseName: string) => {
    const result: string[] = []
    let startIndex = 0

    for (let i = 1; i < pascalCaseName.length; i++) {
        if (pascalCaseName[i] === pascalCaseName[i].toLowerCase()) {
            result.push(pascalCaseName.substring(startIndex, i))
            startIndex = i
        }
    }

    result.push(pascalCaseName.substring(startIndex))

    return result
}