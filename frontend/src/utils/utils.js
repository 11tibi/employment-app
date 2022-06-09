export const normalizeSalary = (min, max, interval) => {
    let str = `${min} - ${max} lei pe `;
    switch (interval) {
        case 'HOUR':
            str += 'ora';
            break;
        case 'YEAR':
            str += 'an';
            break;
        case 'MONTH':
            str += 'lună';
            break;
    }
    return str
}

export const normalizeJobType = (str) => {
    switch (str) {
        case 'FULL_TIME':
            return 'Full Time';
        case 'PART_TIME':
            return 'Part Time';
        case 'INTERNSHIP':
            return 'Internship/ Voluntariat';
        case 'PROJECT':
            return 'Proiect/ Sezonie';
    }
}
