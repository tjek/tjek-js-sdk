const VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'] as const;
/**
 * get the prefixed property
 */
export default function prefixed(obj: CSSStyleDeclaration, property: string) {
    const camelProp = property[0].toUpperCase() + property.slice(1);

    return VENDOR_PREFIXES.find(
        (prefix) => (prefix ? prefix + camelProp : property) in obj
    );
}
