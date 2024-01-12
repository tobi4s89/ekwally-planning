export default function adjustColors(color: any, factor: any) {
    // Ensure the factor is within the valid range [-1, 1]
    factor = Math.min(1, Math.max(-1, factor));

    // Convert hex to RGB
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);

    // Adjust RGB values
    r = Math.round(r * (1 + factor));
    g = Math.round(g * (1 + factor));
    b = Math.round(b * (1 + factor));

    // Ensure RGB values are within the valid range [0, 255]
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));

    // Return converted RGB back to hex
    // eslint-disable-next-line no-mixed-operators
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}