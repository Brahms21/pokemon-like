class Pokemon {
  constructor(name, skill) {
    this._name = name;
    this._lvl = 1;
    this._hp = 20;
    this._exp = 0;
    this._requiredExp = 20;
    this._skill = skill;
    this._skillAtt = 1;
    this._giveExp = this._lvl * 5;
  }
  get name() {
    return this._name;
  }
  set name(name) {
    this._name = name;
  }
  get skill() {
    return this._skill;
  }
  set skill(newSkill) {
    this._skill = newSkill;
  }
  get skillAtt() {
    return this._skillAtt;
  }
  set skillAtt(newSkillAtt) {
    this._skillAtt = newSkillAtt;
  }
  get lvl() {
    return this._lvl;
  }
  set lvl(newLvl) {
    this._lvl = newLvl;
  }
  get hp() {
    return this._hp;
  }
  set hp(newHp) {
    this._hp = Math.floor(newHp);
  }
  get exp() {
    return this._exp;
  }
  set exp(newExp) {
    this._exp = newExp;
  }
  get requiredExp() {
    return this._requiredExp;
  }
  set requiredExp(requiredExp) {
    this._requiredExp = requiredExp;
  }
  get giveExp() {
    return this._giveExp;
  }
  set giveExp(newGiveExp) {
    this._giveExp = newGiveExp;
  }
  randomizeSkillAtt() {
    this._skillAtt = Math.floor(Math.random() * (this._lvl * 5));
  }
  useSkill(pokemon1, pokemon2) {
    pokemon1.randomizeSkillAtt();
    pokemon2.randomizeSkillAtt();
    if (pokemon1.skillAtt === 0) {
      console.log(`${pokemon1.name} missed his attack!`);
    } else {
      pokemon2.hp -= pokemon1.skillAtt;
      console.log(
        `${pokemon1.name} has used ${pokemon1.skill} doing ${pokemon1.skillAtt} damage!`
      );
      if (pokemon2.hp <= 0) {
        pokemon2.hp = 0;
      }
      console.log(`${pokemon2.name}'s health dropped down to ${pokemon2.hp}`);
    }
    if (pokemon2.skillAtt === 0) {
      console.log(`${pokemon2.name} missed his attack!`);
    } else {
      pokemon1.hp -= pokemon2.skillAtt;
      console.log(
        `${pokemon2.name} has used ${pokemon2.skill} doing ${pokemon2.skillAtt} damage!`
      );
      if (pokemon1.hp <= 0) {
        pokemon1.hp = 0;
      }
      console.log(`${pokemon1.name}'s health dropped down to ${pokemon1.hp}`);
    }
  }
  heal(pokemon1, pokemon2) {
    pokemon1.hp += 10;
    console.log(`${pokemon1.name} used HEAL, healing ${10} hp!`);
    console.log(`${pokemon1.name}'s HP is ${pokemon1.hp} now`);
    console.log(`${pokemon2.name} has used ${pokemon2.skill}`);
    pokemon1.hp -= pokemon2.skillAtt;
    console.log(`${pokemon1.name}'s health dropped down to ${pokemon1.hp}`);
  }
  run() {}
  levelUp() {
    this._lvl += 1;
    this._requiredExp *= 1.25;
    this._hp *= 1.1;
    console.log(`You have leveled up! Level: ${this._lvl}`);
  }
  gainExp(pokemon1, pokemon2) {
    console.log(`${pokemon1.name} has won the battle!`);
    pokemon1.exp += pokemon2.giveExp;
    console.log(`${pokemon1.name} gained ${pokemon2.giveExp} EXP points!`);
    if (pokemon1.exp >= pokemon1.requiredExp) {
      pokemon1.levelUp();
      pokemon1.exp = 0 + (this.exp - this.requiredExp);
    }
    console.log(`Exp to next level: ${pokemon1.requiredExp - pokemon1.exp}`);
  }
  loseExp(pokemon) {
    console.log(`${pokemon.name} has lost the battle!`);
    if (pokemon.exp <= 0) {
      pokemon.exp = 0;
    } else {
      pokemon.exp -= pokemon.lvl * 2.25;
    }
    console.log(
      `${pokemon.name} has lost ${pokemon.exp} exp! Get back on your feet and regain your honor! \n`
    );
    const restartGame = () => {
      readline.question(`Press 'R' to restart\n`, (input) => {
        if (input.toLowerCase() === "r") {
          playerPokemon.hp = 20;
          encounter();
        } else {
          restartGame();
        }
      });
    };
    console.log(`Exp to next level: ${pokemon.requiredExp - pokemon.exp}\n`);
    restartGame();
  }
}

const run = () => {
  console.log(`You ran away from battle.\n`);
};
class Fire extends Pokemon {
  constructor(name, skill) {
    super(name, skill);
  }
}

class Water extends Pokemon {
  constructor(name, skill) {
    super(name, skill);
  }
}

class Plant extends Pokemon {
  constructor(name, skill) {
    super(name, skill);
  }
}
const createPokemon = (pokemon) => {
  if (pokemon === "c") {
    pokemon = new Fire("CHARMANDER", "BLAZE");
  } else if (pokemon === "s") {
    pokemon = new Water("SQUIRTLE", "TORRENT");
  } else if (pokemon === "b") {
    pokemon = new Plant("BULBASAUR", "OVERGROW");
  }
  return pokemon;
};
const enemyPokemonOptions = ["c", "s", "b"];

let playerPokemon;
let player;

const encounter = () => {
  let enemyPokemon = enemyPokemonOptions[Math.floor(Math.random() * 3)];

  enemyPokemon = createPokemon(enemyPokemon);
  enemyPokemon.lvl = Math.floor(Math.random() * playerPokemon.lvl + 1);
  if (playerPokemon === enemyPokemon) {
    encounter();
  } else {
    battle(enemyPokemon);
  }
};

const nextEncounter = () => {
  readline.question(`Press 'N' for next encounter\n`, (input) => {
    if (input.toLowerCase() === "n") {
      encounter();
    } else {
      nextEncounter();
    }
  });
};
const battle = (enemyPokemon) => {
  console.log(
    `A wild ${enemyPokemon.name}(lvl: ${enemyPokemon.lvl}) has appeared!`
  );
  const redo = () => {
    readline.question(
      ` 'S' to use SKILL, 'H' to HEAL POKEMON, 'R' to RUN\n`,
      (playerInput) => {
        let rawInput = playerInput;
        if (rawInput.toLowerCase() === `s`) {
          playerPokemon.useSkill(playerPokemon, enemyPokemon);
          if (playerPokemon.hp <= 0) {
            playerPokemon.loseExp(playerPokemon);
          } else if (enemyPokemon.hp <= 0) {
            playerPokemon.gainExp(playerPokemon, enemyPokemon);
            nextEncounter();
          } else {
            redo();
          }
        } else if (rawInput.toLowerCase() === "h") {
          playerPokemon.heal(playerPokemon, enemyPokemon);
          redo();
        } else if (rawInput.toLowerCase() === "r") {
          run();
          encounter();
        } else {
          redo();
        }
      }
    );
  };
  redo();
};

// game begin
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const gameText1 = () => {
  readline.question(
    `Hello fellow Adventurer! It's been a while! Please remind me, what was your name again? \n`,
    (name) => {
      player = name;
      console.log(
        `${player}! right! How in the world could I forget such a nice name?! \n`
      );
      gameText2();
    }
  );
};

const gameText2 = () => {
  readline.question(
    `Choose yourself a pokemon will ya'?\n (press 'C' for CHARMANDER, 'S' for SQUIRTLE or 'B' for BULBASAUR\n `,
    (pokemon) => {
      playerPokemon = pokemon;
      if (playerPokemon.toLowerCase() === "c") {
        playerPokemon = "c";
        playerPokemon = createPokemon(playerPokemon);
      } else if (playerPokemon.toLowerCase() === "s") {
        playerPokemon = "s";
        playerPokemon = createPokemon(playerPokemon);
      } else if (playerPokemon.toLowerCase() === "b") {
        playerPokemon = "b";
        playerPokemon = createPokemon(playerPokemon);
      } else {
        console.log("please choose a vaild pokemon");
        gameText2();
      }
      console.log(
        `You have chosen ${playerPokemon.name}, it seems to like you!\n`
      );
      encounter();
    }
  );
};
gameText1();

//module.exports = terminalPokemon;
