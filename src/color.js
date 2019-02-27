let baseColor = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green',
    'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'blue-grey', 'grey'];

let types = [
    'lighten-5',
    'lighten-4',
    'lighten-3',
    'lighten-2',
    'lighten-1',

    'darken-1',
    'darken-2',
    'darken-3',
    'darken-4',
];

let color = [];

baseColor.forEach(item => {
    types.forEach(type => {
        color.push(`${item} ${type}`);
    });
});

export {color};

