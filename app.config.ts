export default defineAppConfig({
    transportTypes: [
        {
            type: 0,
            alternativeTypes: [],
            typeName: 'ICE/IC/EC',
            image: '/img/ice.png',
        },
        {
            type: 1,
            alternativeTypes: [],
            typeName: 'Zug',
            image: '/img/zug.png',
        },
        {
            type: 2,
            alternativeTypes: [],
            typeName: 'S-Bahn',
            image: '/img/sbahn.png',
        },
        {
            type: 3,
            alternativeTypes: [],
            typeName: 'U-Bahn',
            image: '/img/ubahn.png',
        },
        {
            type: 4,
            alternativeTypes: [],
            typeName: 'Straßenbahn',
            image: '/img/tram.png',
        },
        {
            type: 6,
            alternativeTypes: [],
            typeName: 'Schwebebahn',
            image: '/img/schwebebahn.png',
        },
        {
            type: 15,
            alternativeTypes: [5],
            typeName: 'Bus',
            image: '/img/bus.png',
        },
    ],
    defaultRowCount: 10,
    secondsToRefresh: 30,
})
