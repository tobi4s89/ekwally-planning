export default function fontVariants(fonts: any, styles: any) {
    const fontMap: any = {}

    for (let i = 0; i < fonts.length; i++) {
        const font = fonts[i];

        fontMap[font] = {};

        // Iterate over each font style using a for loop
        for (let j = 0; j < styles.length; j++) {
            const style = styles[j];

            // Set an empty array for the current font family and style
            fontMap[font][style] = [];
        }
    }

    return fontMap;
}
