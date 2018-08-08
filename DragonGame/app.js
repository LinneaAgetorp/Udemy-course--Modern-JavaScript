let count = 1;
let playersTurn = true;
let game_over = false;
// UI values
const playerBox = document.querySelector('.player');
const logBox = document.querySelector('.log');
const dragonBox = document.querySelector('.dragon');
const playerHP = document.querySelector('.playerHP');
const dragonHP = document.querySelector('.dragonHP');
const playerHPBar = document.querySelector('#myBar');
const dragonHPBar = document.querySelector('#dragonBar');

const onInit = {

    getRandomNum(min, max){
        return Math.floor(Math.random()* (max-min+1)+min)
    },

    isHit(number) {
        const num = onInit.getRandomNum(1,100);
        return number >= num;
    },

    startGame() {
        renderPlayer()
        renderDragon()

        Player.Attacks.forEach((attack, index)=> {
            let btn = onInit.createAttackButton(attack, index);
            playerBox.appendChild(btn)
        });

        Dragon.Attacks.forEach((attack, index)=> {
            let btn = onInit.createAttackButton(attack, index);
            dragonBox.appendChild(btn);
            btn.disabled = true;
        })
    },

    createAttackButton(attack, i){
        let btn = document.createElement('button');
        btn.innerHTML = `${attack.name}, ${attack.info}`;
        btn.className = `attackBtn-${i}`;
        btn.addEventListener('click', ()=>{
            Player.makeMove(attack)
        });
        return btn
    }
};


const Player = {
    HP: 100,
    Attacks: [
        {
            name: 'Kick',
            verb: 'kicked',
            info: '30% chance to hit, 30-40 damage points',
            use: () =>onInit.isHit(30) ? onInit.getRandomNum(30, 40) : 0
        },
        {
            name: 'Slap',
            verb: 'slapped',
            info: '80% chance to hit, 6-10 damage points',
            use: () => onInit.isHit(80) ? onInit.getRandomNum(6, 10) : 0
        },
        {
            name: 'Poison',
            verb: 'poisoned',
            info: '50% chance to hit, 1-4 poison',
            use: () => onInit.isHit(50) ? onInit.getRandomNum(1, 4) : 0
        }
    ],
    makeMove(attack){
        if(!playersTurn){ return;}
        log(`  ---->  Round ${count}`);

        let damage = attack.use();
        if(damage === 0){
            log(`You missed. It's the dragon's turn`, 'white')

        } else {
            // makes sure HP wont go below 0

            const targetHP = (Dragon.HP - damage) < 1 ? 0 : Dragon.HP - damage;
            // setInterval to make progressbar move down slower after attack

            const id = setInterval(()=> {
                if(Dragon.HP > targetHP){
                    Dragon.HP --;
                    renderDragon()
                } else {
                    clearInterval(id)

                }
            }, 15);

            log(`YOU ${attack.verb} the dragon for ${damage} damage`, '#651414')

        }
        playersTurn = false;
        setTimeout(Dragon.dragonAttack, 1000)
        count ++;
    }
};

const Dragon = {
    HP: 100,
    Attacks: [
        {
            name: 'Breath Fire',
            verb: 'breathed fire on',
            info: '90% chance to hit, 20-40 damage points',
            use: () =>onInit.isHit(90) ? onInit.getRandomNum(20, 40) : 0
        },
        {
            name: 'Kick',
            verb: 'kicked',
            info: '30% chance to hit, 6-10 damage points',
            use: () => onInit.isHit(30) ? onInit.getRandomNum(6, 10) : 0
        }
    ],
    dragonAttack(){
    if(game_over){return} // stop the dragon from attacking when it's dead
    let attack = Dragon.Attacks[Math.floor(Math.random() * Dragon.Attacks.length)]; //randomizes what attack the dragon will use
    let damage = attack.use()

    if(damage === 0){
        log(`Dragon missed. It's your turn`, 'white')
    } else {
        // makes sure the HP wont go below 0
        const realTargetHp = Player.HP - damage;
        const targetHP = realTargetHp < 1 ? 0 : realTargetHp;
        //make the progressbar move down slower
        const id = setInterval(()=> {
            if(Player.HP > targetHP){
                Player.HP --;
                renderPlayer()
            } else {
                clearInterval(id) //stops the progressbar from going down to 0
            }
        }, 15);

        log(`The Dragon ${attack.verb} you for ${damage} damage`, '#651414');
    }
    playersTurn = true;
}
};


function renderPlayer(){
    playerHPBar.style.width = Player.HP+'%';
    if(Player.HP > 0){
        playerHP.innerText = `HP: ${Player.HP} / 100`;
    } else {
        playerHPBar.style.width = '0';
        playerHP.innerText = `Dead`;
        // make the players attack-buttons disabled
        document.querySelector('.attackBtn-0').disabled = true;
        document.querySelector('.attackBtn-1').disabled = true;

        gameOver('The dragon slayed you!')
    }
}

function renderDragon() {
    dragonHPBar.style.width = Dragon.HP+'%';
    if(Dragon.HP > 0){
        dragonHP.innerText = `HP: ${Dragon.HP} / 100`;
    } else {
        dragonHPBar.style.width = '0';
        dragonHP.innerText = 'Dead';
        // make the players attack-buttons disabled
        document.querySelector('.attackBtn-0').disabled = true;
        document.querySelector('.attackBtn-1').disabled = true;

        gameOver('You slayed the dragon!')
    }
}

function log(message, color='black') {
    const div = document.createElement('div')
    div.innerHTML = message;
    div.style.color = color;


    logBox.insertBefore(div, logBox.firstChild)
}


function gameOver(message) {

    playersTurn = true;

    log(message, 'gold')
    //Play again button
    let btn = document.createElement('button');
    btn.className = 'attackBtn';
    btn.innerHTML = `Play again?`;
    document.querySelector('.container').insertBefore(btn, logBox); //place btn at top of messages

    btn.addEventListener('click', () => {
        window.location.reload(true);
    });
    game_over = true;
}




onInit.startGame();