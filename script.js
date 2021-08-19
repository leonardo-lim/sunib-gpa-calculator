// Selectors
const left = document.getElementById('left');
const right = document.getElementById('right');
const addedCourse = document.getElementById('added-course');
const image = document.getElementById('image');
const title = document.getElementById('title');
const courseInput = document.getElementById('course-input');
const compInput = document.getElementById('comp-input');
const addCourseButton = document.getElementById('add-course');
const checkButton = document.getElementById('check');
const refreshButton = document.getElementById('refresh');
const finalScore = document.getElementById('final-score');
const copyright = document.getElementById('copyright');
const warning = document.getElementById('warning');
const closeButton = document.getElementById('close');

// Arrays & Variables
let currentCourse;
let currentComp = 0;
let currentPercent = 0;
let total = 0;
let courses = [];
let credits = [];
let components = [];
let percents = [];
let scores = [];
let totals = [];

// Event Listeners
addCourseButton.addEventListener('click', addCourse);
checkButton.addEventListener('click', gpaCheck);
closeButton.addEventListener('click', hideWarning);

// Functions
function addCourse() {
    addCourseButton.classList.add('dis');
    addCourseButton.disabled = true;
    checkButton.classList.add('dis');
    checkButton.disabled = true;

    compInput.innerHTML = `
        <input type="text" id="course" placeholder="Course">
        <input type="number" min="0" id="credit" placeholder="SCU">
        <button type="button" id="next"><i class="fa fa-arrow-right"></i> Next</button>
        <button type="button" id="cancel"><i class="fa fa-times"></i> Cancel</button>
    `;

    const nextButton = document.getElementById('next');
    const cancelButton = document.getElementById('cancel');

    nextButton.addEventListener('click', addComponent);
    cancelButton.addEventListener('click', cancel);
}

function addComponent() {
    if (addCourseButton.disabled == false) {
        addCourseButton.classList.add('dis');
        addCourseButton.disabled = true;
    }

    const course = document.getElementById('course');
    const credit = document.getElementById('credit');

    if (course.value == '' || credit.value == '') {
        alert('Please fill all the field.');
    } else {
        left.style.right = '60%';
        right.style.left = '40%';
        image.style.display = 'none';
        title.style.display = 'none';

        currentCourse = course.value;
        courses.push(course.value);
        credits.push(credit.value);

        addedCourse.innerHTML = '';
        courseInput.style.top = '50%';
        courseInput.style.transform = 'translate(-50%, -50%)';

        if (currentComp > 1) {
            courseInput.innerHTML = `
                <h2>${currentCourse} Course</h2>
                <h3 class="data"><i class="fa fa-cube"></i> Added Component<br>${currentComp} items</h3>
                <h3 class="data"><i class="fa fa-percentage"></i> Current Percentage<br>${currentPercent}%</h3>
            `;
        } else {
            courseInput.innerHTML = `
                <h2>${currentCourse} Course</h2>
                <h3 class="data"><i class="fa fa-cube"></i> Added Component<br>${currentComp} item</h3>
                <h3 class="data"><i class="fa fa-percentage"></i> Current Percentage<br>${currentPercent}%</h3>
            `;
        }

        compInput.innerHTML = `
            <input type="text" id="component" placeholder="Component">
            <input type="number" min="0" max="100" id="percent" placeholder="Percentage">
            <input type="number" min="0" max="100" id="score" placeholder="Score">
            <button type="button" id="add-comp"><i class="fa fa-plus"></i> Add Component</button>
            <button type="button" id="undo"><i class="fa fa-undo"></i> Undo</button>
            <button type="button" id="done"><i class="fa fa-check"></i> Done</button>
        `;
            
        const addCompButton = document.getElementById('add-comp');
        const undoButton = document.getElementById('undo');
        const doneButton = document.getElementById('done');

        addCompButton.addEventListener('click', addMore);
        undoButton.addEventListener('click', undo);
        doneButton.addEventListener('click', done);
    }
}

function cancel() {
    addCourseButton.classList.remove('dis');
    addCourseButton.disabled = false;
    compInput.innerHTML = '';
}

function addMore() {
    const comp = document.getElementById('component');
    const percent = document.getElementById('percent');
    const score = document.getElementById('score');

    if (percent.value == '' || score.value == '') {
        alert('Please fill the Percentage and Score field.');
    } else if (score.value > 100) {
        alert('Sorry, score can only be up to 100.')
        score.value = '';
    } else if (currentPercent + parseInt(percent.value) > 100) {
        alert('Sorry, percentage exceeds 100%.');
        percent.value = '';
    } else {
        components.push(comp.value);
        percents.push(percent.value);
        scores.push(score.value);

        currentComp++;
        currentPercent += parseInt(percent.value);
        total += ((percent.value * score.value) / 100);

        comp.value = '';
        percent.value = '';
        score.value = '';

        if (currentComp > 1) {
            courseInput.innerHTML = `
                <h2>${currentCourse} Course</h2>
                <h3 class="data"><i class="fa fa-cube"></i> Added Component<br>${currentComp} items</h3>
                <h3 class="data"><i class="fa fa-percentage"></i> Current Percentage<br>${currentPercent}%</h3>
            `;
        } else {
            courseInput.innerHTML = `
                <h2>${currentCourse} Course</h2>
                <h3 class="data"><i class="fa fa-cube"></i> Added Component<br>${currentComp} item</h3>
                <h3 class="data"><i class="fa fa-percentage"></i> Current Percentage<br>${currentPercent}%</h3>
            `;
        }
    }
}

function undo() {
    if (components.length == 0) {
        alert('Sorry, nothing to undo.');
    } else {
        let lastIndex = components.length - 1;

        currentComp--;
        currentPercent -= parseInt(percents[lastIndex]);
        total -= ((percents[lastIndex] * scores[lastIndex]) / 100);

        components.pop();
        percents.pop();
        scores.pop();

        if (currentComp > 1) {
            courseInput.innerHTML = `
                <h2>${currentCourse} Course</h2>
                <h3 class="data"><i class="fa fa-cube"></i> Added Component<br>${currentComp} items</h3>
                <h3 class="data"><i class="fa fa-percentage"></i> Current Percentage<br>${currentPercent}%</h3>
            `;
        } else {
            courseInput.innerHTML = `
                <h2>${currentCourse} Course</h2>
                <h3 class="data"><i class="fa fa-cube"></i> Added Component<br>${currentComp} item</h3>
                <h3 class="data"><i class="fa fa-percentage"></i> Current Percentage<br>${currentPercent}%</h3>
            `;
        }
    }
}

function done() {
    const comp = document.getElementById('component');
    const percent = document.getElementById('percent');
    const score = document.getElementById('score');

    if (components.length == 0 || comp.value != '' || percent.value != '' || score.value != '') {
        alert('Please add the component first.');
    } else if (currentPercent < 100) {
        alert('Please fill the field until 100%.');  
    } else {
        courseInput.innerHTML = '';
        compInput.innerHTML = `<h2>${currentCourse} added.</h2>`;

        totals.push((Math.round(total * 100) / 100).toFixed(2));
        total = 0;
        currentComp = 0;
        currentPercent = 0;

        components = [];
        percents = [];
        scores = [];

        addCourseButton.classList.remove('dis');
        addCourseButton.disabled = false;
        checkButton.classList.remove('dis');
        checkButton.disabled = false;

        left.style.right = '50%';
        right.style.left = '50%';
        image.style.display = 'none';
        title.style.display = 'none';

        courseInput.innerHTML = '';
        addedCourse.innerHTML = '';
        addedCourse.innerHTML += `<h2><i class="fa fa-book"></i> Added Courses</h2>`;

        for (let i = 0; i < courses.length; i++) {
            addedCourse.innerHTML += `<div class="course-text">${courses[i]}</div>`;
        }
    }
}

function gpaCheck() {
    let check = confirm('Are you sure you don\'t want to add any more courses? By clicking OK, your result will shown up and you can\'t add any more courses.');

    if (check) {
        checkButton.classList.add('dis');
        checkButton.disabled = true;
        addCourseButton.classList.add('dis');
        addCourseButton.disabled = true;

        let randomNumber = setInterval(() => {
            compInput.innerHTML = `
                <h2>Calculating GPA...</h2>
                <h2>${(Math.random() * 4).toFixed(2)}</h2>
            `;
        }, 100);

        setTimeout(() => {
            clearInterval(randomNumber);
        }, 1000);

        setTimeout(printData, 1000);
        
        setTimeout(() => {
            warning.classList.add('show');
        }, 1000);
    }
}

function printData() {
    left.style.right = '40%';
    right.style.left = '60%';
    addCourseButton.style.display = 'none';
    checkButton.style.display = 'none';
    courseInput.classList.add('show');
    courseInput.style.top = '5%';
    courseInput.style.transform = 'translateX(-50%)';

    addedCourse.innerHTML = '';
    compInput.innerHTML = '';
    courseInput.innerHTML = '';
    courseInput.innerHTML += `<h2><i class="fa fa-list"></i> List of Courses</h2>`;

    for (let i = 0; i < courses.length; i++) {
        courseInput.innerHTML += `
            <div class="list-course-text">
                <h3>${courses[i]}</h3>
                <div class="percent-bar"></div>
                <span>Score</span>
                <span>Grade</span>
                <hr>
                <span>${totals[i]}</span>
                <span>${gradeCheck(totals[i])}</span>
            </div>
        `;
    }

    setTimeout(() => {
        const percentBar = document.getElementsByClassName('percent-bar');

        for (let i = 0; i < percentBar.length; i++) {
            percentBar[i].style.width = `${totals[i]}%`;
        }
    }, 500);

    finalScore.classList.add('show');

    setTimeout(() => {
        finalScore.innerHTML = `
            <h3 class="text"><i class="fa fa-balance-scale"></i> GPA</h3>
            <div class="gpa" style="--percentage: ${scoreCheck() * 25};">
                <span class="value">${scoreCheck()}</span>
                <span class="max-value"> / 4.00</span>
            </div>
            <hr>
            <h3 class="text"><i class="fa fa-tachometer"></i> Average Score</h3>
            <div class="avg-score" style="--percentage: ${averageScoreCheck()};">
                <span class="value">${averageScoreCheck()}</span>
                <span class="max-value"> / 100.00</span>
            </div>
        `;
    }, 1500);
}

function gradeCheck(value) {
    let grade;

    if (value > 89 && value <= 100) grade = 'A';
    else if (value > 84 && value <= 89) grade = 'A-';
    else if (value > 79 && value <= 84) grade = 'B+';
    else if (value > 74 && value <= 79) grade = 'B';
    else if (value > 69 && value <= 74) grade = 'B-';
    else if (value > 64 && value <= 69) grade = 'C';
    else if (value > 49 && value <= 64) grade = 'D';
    else if (value > 0 && value <= 49) grade = 'E';
    else grade = 'F';

    return grade;
}

function scoreCheck() {
    let current;
    let point = 0.0;
    let totalCredit = 0;

    for (let i = 0; i < totals.length; i++) {
        if (totals[i] > 89 && totals[i] <= 100) current = 4.0;
        else if (totals[i] > 84 && totals[i] <= 89) current = 3.67;
        else if (totals[i] > 79 && totals[i] <= 84) current = 3.33;
        else if (totals[i] > 74 && totals[i] <= 79) current = 3.0;
        else if (totals[i] > 69 && totals[i] <= 74) current = 2.5;
        else if (totals[i] > 64 && totals[i] <= 69) current = 2.0;
        else if (totals[i] > 49 && totals[i] <= 64) current = 1.0;
        else current = 0.0;

        point += (credits[i] * current);
    }
    
    for (let i = 0; i < credits.length; i++) {
        totalCredit += parseInt(credits[i]);
    }

    let result = (Math.round((point / totalCredit) * 100) / 100).toFixed(2);

    return result;
}

function averageScoreCheck() {
    let sum = 0.0;

    for (let i = 0; i < totals.length; i++) {
        sum += parseFloat(totals[i]);
    }

    let averageScore = (sum / totals.length).toFixed(2);

    return averageScore;
}

function hideWarning() {
    warning.style.transform = 'translateY(-100px)';
}

copyright.innerHTML = `Copyright &copy; ${new Date().getFullYear()} Sunib GPA Calculator.`;