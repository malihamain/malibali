<template>
  <div id="game">
    <!-- Heart burst effect when winning -->
    <div v-if="winner === 'win'" class="heart-burst">
      <span v-for="n in 20" :key="n" class="heart" :style="getHeartStyle(n)">
        💛
      </span>
    </div>
    <header>
      {{ $t("title") }}
      <div class="language-switcher">
        <button
          v-for="lang in languages"
          :key="lang.code"
          @click="setLocale(lang.code)"
          :class="{ active: $i18n.locale === lang.code }"
          class="lang-btn"
        >
          {{ lang.flag }} {{ lang.name }}
        </button>
      </div>
    </header>
    <div class="main-content">
      <div class="game-section">
        <section id="senang" class="container">
          <img :src="image" width="150" height="180" />
          <h2>{{ $t("moodOmeter") }}</h2>
          <div class="healthbar">
            <div class="healthbar__value" :style="moodBarStyles"></div>
          </div>
        </section>
        <section class="container" v-if="winner">
          <h2>{{ $t("gameOver") }}</h2>
          <h3 v-if="winner === 'lose'">
            <img
              src="./assets/images/lose.png"
              class="minus-image"
              width="150"
              height="180"
            />
            <div>{{ $t("loseMessage") }}</div>
          </h3>
          <h3 v-else-if="winner === 'win'">
            <img src="./assets/images/cium.png" width="150" height="180" />
            <div>{{ $t("winMessage") }}</div>
          </h3>
          <button @click="startGame">{{ $t("playAgain") }}</button>
        </section>
        <section id="controls" v-else>
          <button :disabled="caffeine" @click="coffeValue">
            {{ $t("buttons.coffee") }}
          </button>
          <button @click="makanValue">{{ $t("buttons.eat") }}</button>
          <button @click="complimentValue">
            {{ $t("buttons.compliment") }}
          </button>
          <button @click="debatValue">{{ $t("buttons.debate") }}</button>
          <button @click="kacangValue">{{ $t("buttons.ignored") }}</button>
          <button @click="cancelValue">{{ $t("buttons.cancelPlan") }}</button>
          <button :disabled="kadang" @click="specialValue">
            {{ $t("buttons.special") }}
          </button>
          <button @click="surrender">
            {{ $t("buttons.silentTreatment") }}
          </button>
        </section>
      </div>
      <section id="log" class="container">
        <h2>{{ $t("moodLog") }}</h2>
        <ul>
          <li v-for="(logMessage, index) in logMessages" :key="index">
            <span
              :class="{
                'log--senang': logMessage.actionFeeling === 'senang',
                'log--bete': logMessage.actionFeeling === 'bete',
              }"
              >{{
                logMessage.actionFeeling === "senang"
                  ? $t("log.happy") + " "
                  : $t("log.sad") + " "
              }}</span
            >
            <span v-if="logMessage.actionFeeling === 'senang'">
              {{ $t("log.because") }}
              {{ getActionTranslation(logMessage.actionType) }}
              {{ $t("log.increased") }}
              <span class="log--heal">{{ logMessage.actionValue }} </span>
            </span>
            <span v-else>
              {{ $t("log.because") }}
              {{ getActionTranslation(logMessage.actionType) }}
              {{ $t("log.decreased") }}
              <span class="log--damage">{{ logMessage.actionValue }}</span>
              {{ $t("log.points") }}!
            </span>
          </li>
        </ul>
      </section>
    </div>
    <footer>malibali for my loved one. 2022</footer>
  </div>
</template>

<script>
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
export default {
  name: "App",
  components: {},
  data() {
    return {
      mood: 0,
      currentRound: 0,
      coffeeRound: 0,
      winner: false,
      logMessages: [],
      languages: [
        { code: "en", name: "EN", flag: "🇬🇧" },
        { code: "id", name: "ID", flag: "🇮🇩" },
        { code: "sv", name: "SV", flag: "🇸🇪" },
      ],
    };
  },
  computed: {
    moodBarStyles() {
      if (this.mood < 0) {
        return { width: "0%" };
      } else {
        return { width: this.mood + "%" };
      }
    },
    kadang() {
      return this.currentRound % 3 !== 0;
    },
    caffeine() {
      return this.coffeeRound >= 2;
    },
    image() {
      //   const path =
      if (this.mood > 80) {
        const imagePath = "3.png";
        return require(`./assets/images/${imagePath}`);
      } else if (this.mood > 30) {
        const imagePath = "2.png";
        return require(`./assets/images/${imagePath}`);
      } else {
        return require("./assets/images/1.png");
      }
    },
  },
  watch: {
    mood(value) {
      // Don't set winner if we're resetting the game (winner is null and mood is 0)
      if (this.winner === null && value === 0) {
        return;
      }
      if (value > 100) {
        this.mood = 100;
        this.winner = "win";
      }
      if (value < 0 && this.loseHealth <= 0) {
        this.winner = "draw";
      } else if (value < 0) {
        this.winner = "lose";
      }
    },
  },
  methods: {
    startGame() {
      this.winner = null;
      this.currentRound = 0;
      this.coffeeRound = 0;
      this.logMessages = [];
      this.mood = 0;
    },
    makanValue() {
      this.currentRound++;
      const moodValue = getRandomValue(5, 12);
      this.mood += moodValue;
      this.addLogMessage("senang", "eat", moodValue);
    },
    complimentValue() {
      this.currentRound++;
      const moodValue = getRandomValue(5, 12);
      this.mood += moodValue;
      this.addLogMessage("senang", "compliment", moodValue);
    },
    cancelValue() {
      this.currentRound++;
      const moodValue = getRandomValue(5, 12);
      this.mood -= moodValue;
      this.addLogMessage("bete", "cancelPlans", moodValue);
    },
    kacangValue() {
      this.currentRound++;
      const moodValue = getRandomValue(5, 12);
      this.mood -= moodValue;
      this.addLogMessage("bete", "ignored", moodValue);
    },
    coffeValue() {
      this.currentRound++;
      this.coffeeRound++;
      const moodValue = getRandomValue(5, 12);
      this.mood += moodValue;
      this.addLogMessage("senang", "coffee", moodValue);
    },
    debatValue() {
      this.currentRound++;
      if (this.mood > 50) {
        const moodValue = getRandomValue(5, 12);
        this.mood += moodValue;
        this.addLogMessage("senang", "debate", moodValue);
      } else {
        const moodValue = getRandomValue(5, 12);
        this.mood -= moodValue;
        this.addLogMessage("bete", "debateTired", moodValue);
      }
    },
    specialValue() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.mood += attackValue;
      this.addLogMessage("senang", "special", attackValue);
    },
    surrender() {
      this.winner = "lose";
    },
    addLogMessage(what, what2, value) {
      this.logMessages.unshift({
        actionFeeling: what,
        actionType: what2,
        actionValue: value,
      });
    },
    setLocale(locale) {
      this.$i18n.locale = locale;
    },
    getActionTranslation(actionType) {
      // Map action keys to translation keys
      const actionMap = {
        eat: "log.eat",
        coffee: "log.coffee",
        compliment: "log.compliment",
        debate: "log.debate",
        debateTired: "log.debateTired",
        ignored: "log.ignored",
        cancelPlans: "log.cancelPlans",
        special: "log.special",
      };
      const translationKey = actionMap[actionType];
      if (translationKey) {
        return this.$t(translationKey);
      }
      return actionType;
    },
    getHeartStyle(index) {
      // Create random angles and distances for burst effect
      const angle = (360 / 20) * index;
      const angleRad = (angle * Math.PI) / 180;
      const distance = 200 + Math.random() * 100;
      const delay = Math.random() * 0.5;
      const duration = 2 + Math.random() * 1;

      // Calculate x and y positions
      const x = Math.cos(angleRad) * distance;
      const y = Math.sin(angleRad) * distance;
      const xEnd = Math.cos(angleRad) * distance * 1.2;
      const yEnd = Math.sin(angleRad) * distance * 1.2;

      return {
        "--x": `${x}px`,
        "--y": `${y}px`,
        "--x-end": `${xEnd}px`,
        "--y-end": `${yEnd}px`,
        "--delay": `${delay}s`,
        "--duration": `${duration}s`,
        "--rotation": `${angle + 180}deg`,
      };
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: "Nunito", sans-serif;
}

body {
  margin: 0;
  background: #f5f7fa;
  min-height: 100vh;
  font-family: "Nunito", sans-serif;
}

#game {
  padding: 15px;
  padding-bottom: 80px;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.heart-burst {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1000;
  width: 0;
  height: 0;
}

.heart {
  position: absolute;
  font-size: 30px;
  animation: heartBurst var(--duration) ease-out var(--delay) forwards;
  opacity: 0;
}

@keyframes heartBurst {
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(1) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: translate(var(--x), var(--y)) scale(1.2) rotate(180deg);
  }
  100% {
    opacity: 0;
    transform: translate(var(--x-end), var(--y-end)) scale(0.8)
      rotate(var(--rotation));
  }
}

header {
  margin-top: 15px;
  padding: 0.5rem;
  text-align: center;
  margin-bottom: 1rem;
  font-family: "Fredoka One", cursive;
  font-size: 48px;
  text-decoration: none;
  color: #2d3748;
  letter-spacing: 1px;
  position: relative;
}

.language-switcher {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

.lang-btn {
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  font-size: 12px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #4a5568;
  padding: 0.4rem 0.8rem;
  margin: 0;
  min-width: auto;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.lang-btn:hover {
  background: #f7fafc;
  border-color: #cbd5e0;
}

.lang-btn.active {
  background: #fed311;
  color: #000;
  border-color: #fed311;
}

.main-content {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1400px;
  margin: 0 auto;
}

.game-section {
  flex: 1;
  min-width: 400px;
  max-width: 600px;
}

.yellow {
  color: #f4b860;
}

span {
  font-family: "Nunito", sans-serif;
  font-style: normal;
}

section {
  width: 100%;
  margin: 0;
}

.healthbar {
  width: 100%;
  height: 30px;
  border: 2px solid #e2e8f0;
  margin: 1rem 0;
  background: #f7fafc;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
}

.healthbar__value {
  background: linear-gradient(90deg, #ff6b9d 0%, #f34ccf 100%);
  width: 100%;
  height: 100%;
  transition: width 0.5s ease;
  border-radius: 15px;
}

.container {
  text-align: center;
  padding: 1.2rem;
  margin: 0.8rem 0;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: box-shadow 0.2s ease;
}

.container:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
}

h2 {
  font-family: "Fredoka One", cursive;
  font-size: 24px;
  color: #2d3748;
  margin: 0.5rem 0;
  letter-spacing: 0.5px;
}

h3 {
  font-family: "Fredoka One", cursive;
  font-size: 20px;
  color: #e53e3e;
  margin: 0.5rem 0;
}

#lose h2,
#win h2 {
  margin: 0.25rem;
}

#controls {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 1rem;
}

button {
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  font-size: 13px;
  background: #fed311;
  border: none;
  border-radius: 8px;
  color: #000000;
  padding: 0.7rem 1.2rem;
  margin: 0;
  min-width: 8rem;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

button:focus {
  outline: none;
}

button:hover {
  background: #fadc56;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:active {
  background: #f4b860;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

button:disabled {
  background: #e2e8f0;
  color: #a0aec0;
  cursor: not-allowed;
  box-shadow: none;
}

#log {
  flex: 1;
  min-width: 300px;
  max-width: 400px;
  max-height: 600px;
  overflow-y: auto;
}

#log ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

#log li {
  margin: 0.5rem 0;
  padding: 0.6rem;
  background: #f7fafc;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s ease;
  border-left: 3px solid transparent;
}

#log li:hover {
  background: #edf2f7;
}

.log--senang {
  color: #ff6b9d;
  font-weight: 700;
}

.log--bete {
  color: #ff4757;
  font-weight: 700;
}

.log--damage {
  color: #ff4757;
  font-weight: 800;
}

.log--heal {
  color: #2ed573;
  font-weight: 800;
}

.minus-image {
  animation: shake 0.5s;
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}

img {
  transition: opacity 0.2s ease;
}

img:hover {
  opacity: 0.9;
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  padding: 1.2rem 1rem;
  background: #fef3c7;
  color: #78350f;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  font-weight: 500;
  z-index: 100;
  border-top: 1px solid #fde68a;
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }

  .game-section,
  #log {
    min-width: 100%;
    max-width: 100%;
  }

  header {
    font-size: 36px;
  }
}
</style>
