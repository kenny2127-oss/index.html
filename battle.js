// battle.js

// Battle system state
let battleState = {
    playerPokemon: null,
    enemyPokemon: null,
    playerHP: 100,
    enemyHP: 100,
    inBattle: false
};

// Start a battle
function startBattle() {
    if (pokedex.length === 0) {
        showMessage("No Pokémon", "You need at least one Pokémon to battle!");
        announceForAccessibility("Cannot start battle. You have no Pokémon.");
        return;
    }

    // Pick a random Pokémon from the player's Pokédex
    battleState.playerPokemon = pokedex[Math.floor(Math.random() * pokedex.length)];
    // Pick a random wild Pokémon
    const wildPokemon = ["Bulbasaur","Charmander","Squirtle","Pikachu","Jigglypuff","Meowth"];
    battleState.enemyPokemon = wildPokemon[Math.floor(Math.random() * wildPokemon.length)];

    // Reset HP
    battleState.playerHP = 100;
    battleState.enemyHP = 100;
    battleState.inBattle = true;

    // Update the battle tab UI
    document.getElementById("battleEnemy").textContent = `Enemy: ${battleState.enemyPokemon} (HP: ${battleState.enemyHP})`;
    document.getElementById("battlePlayer").textContent = `Your Pokémon: ${battleState.playerPokemon} (HP: ${battleState.playerHP})`;
    document.getElementById("battleLog").innerHTML = `A wild ${battleState.enemyPokemon} appeared!`;

    announceForAccessibility(`Battle started! Your Pokémon is ${battleState.playerPokemon}. Enemy is ${battleState.enemyPokemon}.`);
}

// Attack action
function battleAttack() {
    if (!battleState.inBattle) return;

    // Damage calculation
    const playerHit = Math.floor(Math.random() * 20) + 5;
    const enemyHit = Math.floor(Math.random() * 15) + 3;

    // Apply damage
    battleState.enemyHP -= playerHit;
    battleState.playerHP -= enemyHit;

    // Update battle log
    const log = document.getElementById("battleLog");
    log.innerHTML = `Your ${battleState.playerPokemon} hits ${battleState.enemyPokemon} for ${playerHit} damage!<br>`;
    log.innerHTML += `${battleState.enemyPokemon} hits back for ${enemyHit} damage!`;

    // Update HP display
    document.getElementById("battleEnemy").textContent = `Enemy: ${battleState.enemyPokemon} (HP: ${Math.max(battleState.enemyHP, 0)})`;
    document.getElementById("battlePlayer").textContent = `Your Pokémon: ${battleState.playerPokemon} (HP: ${Math.max(battleState.playerHP, 0)})`;

    announceForAccessibility(`Your Pokémon hits ${battleState.enemyPokemon} for ${playerHit} damage. Enemy hits back for ${enemyHit} damage.`);

    // Check if battle is over
    if (battleState.enemyHP <= 0) {
        battleState.inBattle = false;
        showMessage("Victory!", `You defeated ${battleState.enemyPokemon}!`);
        announceForAccessibility(`You defeated ${battleState.enemyPokemon}`);
    } else if (battleState.playerHP <= 0) {
        battleState.inBattle = false;
        showMessage("Defeat!", `${battleState.playerPokemon} fainted!`);
        announceForAccessibility(`${battleState.playerPokemon} fainted`);
    }
}

// Run action
function battleRun() {
    if (!battleState.inBattle) return;
    battleState.inBattle = false;
    showMessage("You ran away!", "You escaped the battle safely.");
    announceForAccessibility("You ran away from the battle.");
}

// Attach buttons after the page loads
window.addEventListener("load", () => {
    const attackBtn = document.getElementById("battleAttackBtn");
    const runBtn = document.getElementById("battleRunBtn");
    attackBtn?.addEventListener("click", battleAttack);
    runBtn?.addEventListener("click", battleRun);
});