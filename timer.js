async function scheduleTimer({ providerRes, parserRes } = {}) {
    return {
        // 开学时间实在找不到方法推断了，就填个当前时间吧QwQ
        startSemester: Date.now().toString(),
        totalWeek: document.querySelector('#startWeek').children.length,
        startWithSunday: false,
        showWeekend: false,
        forenoon: 5,
        afternoon: 5,
        night: 4,
        sections: [
            {
                section: 1,
                startTime: '08:00',
                endTime: '08:45',
            },
            {
                section: 2,
                startTime: '08:45',
                endTime: '09:30',
            },
            {
                section: 3,
                startTime: '09:45',
                endTime: '10:30',
            },
            {
                section: 4,
                startTime: '10:30',
                endTime: '11:15',
            },
            {
                section: 5,
                startTime: '11:30',
                endTime: '12:15',
            },
            {
                section: 6,
                startTime: '13:00',
                endTime: '13:45',
            },
            {
                section: 7,
                startTime: '13:45',
                endTime: '14:30',
            },
            {
                section: 8,
                startTime: '14:45',
                endTime: '15:30',
            },
            {
                section: 9,
                startTime: '15:30',
                endTime: '16:15',
            },
            {
                section: 10,
                startTime: '16:30',
                endTime: '17:15',
            },
            {
                section: 11,
                startTime: '18:00',
                endTime: '18:45',
            },
            {
                section: 12,
                startTime: '18:45',
                endTime: '19:30',
            },
            {
                section: 13,
                startTime: '19:40',
                endTime: '20:25',
            },
            {
                section: 14,
                startTime: '20:25',
                endTime: '21:10',
            },
        ],
    };
}
