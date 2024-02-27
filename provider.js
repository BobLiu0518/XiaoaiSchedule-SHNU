// 由于上海师范大学的系统一次只能查看一周的课表，抓包抓出来的数据也相当诡异，
// 因此这里选择让 Provider 一次获取多周页面，顺便把 Parser 的活一起干了。

async function scheduleHtmlProvider(
    iframeContent = '',
    frameContent = '',
    dom = document
) {
    let classes = [];
    await loadTool('AIScheduleTools');

    function sleep(time) {
        return new Promise((resolve) => {
            setTimeout(resolve, time);
        });
    }
    function range(start, count) {
        let arr = [];
        for (let i = 0; i < count; i++) {
            arr.push(start + i);
        }
        return arr;
    }

    // 模拟切换周数
    function changeWeek(week) {
        dom.querySelector('#startWeek').value = week.toString();
        dom.querySelector('#startWeek').dispatchEvent(new Event('change'));
    }

    // 解析表格数据
    function parseData(dom) {
        let tbody = dom.querySelector('#manualArrangeCourseTable').children[1];
        let skipCols = [0, 0, 0, 0, 0, 0, 0];

        // 遍历行（section为节数）
        for (let section = 1; section <= tbody.children.length; section++) {
            let skipRows = 0;
            // 遍历列
            for (let weekday = 0; weekday < 7; weekday++) {
                if (skipCols[weekday] > 0) {
                    skipCols[weekday]--;
                    skipRows++;
                    continue;
                }
                // 取出单元格
                let cell =
                    tbody.children[section - 1].children[
                        weekday + 1 - skipRows
                    ];
                if (!cell?.innerHTML) continue;

                // 解析单元格 innerHTML
                let [, className, classID, teacherName, week, place] =
                    /^(.+?)\((\d+?)\.\d+?\) \((.+?)\)\((\d+?),(.+?)\)$/.exec(
                        cell.innerHTML.replace(/<br>/g, '')
                    );
                let duration = cell.rowSpan;
                skipCols[weekday] += duration - 1;

                // 添加到列表
                classes.push({
                    name: className,
                    position: place,
                    teacher: teacherName,
                    weeks: [parseInt(week)],
                    day: weekday,
                    sections: range(section, duration),
                });
            }
        }
    }

    try {
        // 读取周数
        weeks = dom.querySelector('#startWeek').children.length;
        await AIScheduleAlert({
            titleText: '开始导入',
            contentText:
                '该学期共' +
                weeks +
                '周，导入需要一定时间（一般不超过半分钟），请不要关闭本页面。',
            confirmText: '知道了',
        });
        for (let week = 1; week <= weeks; week++) {
            changeWeek(week);
            do {
                await sleep(200);
            } while (
                dom.querySelector('#messageZone').style.visibility != 'hidden'
            );
            parseData(dom);
        }
    } catch (e) {
        await AIScheduleAlert({
            titleText: '导入失败',
            contentText:
                '出现错误：' +
                e.message +
                '，请确保已进入“我的课表”页面后再试。',
            confirm: '知道了',
        });
        return 'do not continue';
    }

    return JSON.stringify(classes);
}
