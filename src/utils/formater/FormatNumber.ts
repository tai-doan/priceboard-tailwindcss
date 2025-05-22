interface FormatNumberProps {
    value: number | '0' | ' ' | '';
    fractionSize?: 0 | 1 | 2 | 3 | 4;
    empty?: 1 | 0;
    key?: 'dash' | 'input_plcord' | 'short';
    translateFunc?: (key: string) => string;
}

const FormatNumber = ({
    value,
    fractionSize = 0,
    empty = 1,
    key,
    translateFunc
}: FormatNumberProps): string => {
    if (!value || value === '0' || value === ' ' || isNaN(value) || Number(value) === 0) {
        if (key === 'dash') return '---'
        if (empty === 1) {
            return ''
        } else if (fractionSize === 0) return '0'
        else if (fractionSize === 1) return '0.0'
        else if (fractionSize === 2) return '0.00'
        else if (fractionSize === 3) return '0.000'
        else if (fractionSize === 4) return '0.0000'
        return '0'
    }
    const DECIMAL_SEPARATOR = '.'
    const THOUSANDS_SEPARATOR = ','
    const precision = 10 ** (fractionSize || 1)
    const valueRound = Math.round(Number(value) * precision) / precision
    let [integer, fraction = ''] = valueRound.toString().split('.')

    // Chỉ thêm phần thập phân nếu có giá trị và fractionSize > 0
    fraction = fractionSize > 0 && fraction !== ''
        ? DECIMAL_SEPARATOR + fraction.padEnd(fractionSize, '0')
        : ''

    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, THOUSANDS_SEPARATOR)

    if (key === 'input_plcord') {
        if (integer.substr(0, integer.length) + fraction === '.00') return ''
        else return integer.substr(0, integer.length) + fraction
    }
    if (key === 'short') {
        if (Math.abs(value) < 999) return value.toString();
        let newValue = value,
            unit = ''
        if (Math.abs(value) >= 10 ** 3) {
            newValue = value / 10 ** 3
            unit = translateFunc ? translateFunc('unit_thousand') : ' K'
        }
        if (Math.abs(value) > 10 ** 6) {
            unit = translateFunc ? translateFunc('unit_millions') : ' M'
            newValue = value / 10 ** 6
        }
        if (Math.abs(value) > 10 ** 9) {
            unit = translateFunc ? translateFunc('unit_billions') : ' B'
            newValue = value / 10 ** 9
        }
        const precision = 10 ** (fractionSize || 1)
        const valueRound = Math.round(Number(newValue) * precision) / precision
        let [integer, fraction = ''] = (valueRound || '').toString().split('.')
        fraction = fractionSize > 0 ? DECIMAL_SEPARATOR + (fraction + '000000').substring(0, fractionSize) : ''
        integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, THOUSANDS_SEPARATOR)
        return integer.substr(0, integer.length) + fraction + unit
    }
    return integer + fraction
}

export default FormatNumber;
