document.addEventListener('DOMContentLoaded', function() {
    const drawBtn = document.getElementById('drawBtn');
    const status = document.getElementById('status');
    const teamInputs = [
        document.getElementById('team1'),
        document.getElementById('team2'),
        document.getElementById('team3'),
        document.getElementById('team4')
    ];
    
    const leftTeams = [
        document.getElementById('left-team1'),
        document.getElementById('left-team2')
    ];
    
    const rightTeams = [
        document.getElementById('right-team1'),
        document.getElementById('right-team2')
    ];
    
    const finalTeams = [
        document.getElementById('final-team1'),
        document.getElementById('final-team2')
    ];
    
    let teams = [];
    let remainingTeams = [];
    let drawCount = 0;
    
    function initialize() {
        teams = [];
        teamInputs.forEach((input, index) => {
            const name = input.value.trim();
            teams.push(name || `战队 ${index + 1}`);
        });
        
        remainingTeams = [...teams];
        drawCount = 0;
        
        leftTeams.forEach(team => {
            team.textContent = '';
            team.classList.remove('filled');
        });
        
        rightTeams.forEach(team => {
            team.textContent = '';
            team.classList.remove('filled');
        });
        
        finalTeams.forEach(team => {
            team.textContent = '待定';
            team.classList.remove('filled');
        });
        
        drawBtn.textContent = '开始抽签';
        drawBtn.disabled = false;
        status.textContent = '准备就绪，点击开始抽签';
        status.classList.remove('highlight');
    }
    
    function performDraw() {
        if (remainingTeams.length === 0) {
            status.textContent = '所有战队已分配完毕！';
            status.classList.add('highlight');
            drawBtn.textContent = '重新开始';
            return;
        }
        
        const randomIndex = Math.floor(Math.random() * remainingTeams.length);
        const selectedTeam = remainingTeams[randomIndex];
        
        remainingTeams.splice(randomIndex, 1);
        
        if (drawCount === 0) {
            leftTeams[0].textContent = selectedTeam;
            leftTeams[0].classList.add('filled');
        }
        else if (drawCount === 1) {
            rightTeams[0].textContent = selectedTeam;
            rightTeams[0].classList.add('filled');
        }
        else if (drawCount === 2) {
            leftTeams[1].textContent = selectedTeam;
            leftTeams[1].classList.add('filled');
        }
        else if (drawCount === 3) {
            rightTeams[1].textContent = selectedTeam;
            rightTeams[1].classList.add('filled');
        }
        
        drawCount++;
        
        if (remainingTeams.length > 0) {
            status.textContent = `已分配 ${selectedTeam}，点击继续抽签`;
            drawBtn.textContent = '继续抽签';
        }
        else {
            status.textContent = `已分配 ${selectedTeam}，所有战队分配完毕！`;
            status.classList.add('highlight');
            drawBtn.textContent = '重新开始';
        }
    }
    
    drawBtn.addEventListener('click', function() {
        if (drawBtn.textContent === '重新开始') {
            initialize();
        }
        else {
            if (drawCount === 0) {
                initialize();
            }
            performDraw();
        }
    });
    
    initialize();

});
