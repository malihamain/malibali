import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    title: 'MALI BALI',
    moodOmeter: "MOOD O'METER",
    gameOver: 'Game Over!',
    loseMessage: '>:( IHHH',
    winMessage: 'ASYIIKK LOVE YOUUU',
    playAgain: 'Play Again!',
    moodLog: 'Mood Log',
    buttons: {
      coffee: 'COFFEE',
      eat: 'EAT',
      compliment: 'COMPLIMENT',
      debate: 'DEBATE',
      ignored: 'IGNORED',
      cancelPlan: 'CANCEL PLAN',
      special: ';)',
      silentTreatment: 'SILENT TREATMENT'
    },
    log: {
      happy: 'happy',
      sad: 'sad',
      because: 'because',
      increased: 'increased',
      decreased: 'decreased',
      points: 'points',
      coffee: 'coffee',
      eat: 'eating',
      compliment: 'compliment',
      debate: 'debate',
      debateTired: 'debate when tired',
      ignored: 'ignored',
      cancelPlans: 'cancel plans',
      special: 'HEHE'
    },
    actions: {
      eat: 'eat',
      coffee: 'coffee',
      compliment: 'compliment',
      debate: 'debate',
      debateTired: 'debateTired',
      ignored: 'ignored',
      cancelPlans: 'cancelPlans',
      special: 'special'
    }
  },
  id: {
    title: 'MALI BALI',
    moodOmeter: "MOOD O'METER",
    gameOver: 'Game Over!',
    loseMessage: '>:( IHHH',
    winMessage: 'ASYIIKK LOVE YOUUU',
    playAgain: 'Ulang Ulang!',
    moodLog: 'Mood Log',
    buttons: {
      coffee: 'NGOPI',
      eat: 'MAKAN',
      compliment: 'COMPLIMENT',
      debate: 'DEBAT',
      ignored: 'DIKACANGIN',
      cancelPlan: 'CANCEL PLAN',
      special: ';)',
      silentTreatment: 'SILENT TREATMENT'
    },
    log: {
      happy: 'senang',
      sad: 'bete',
      because: 'karena',
      increased: 'nambah',
      decreased: 'kurang',
      points: 'point',
      coffee: 'dikasih kopi',
      eat: 'makan',
      compliment: 'dikasih compliment',
      debate: 'didebatin',
      debateTired: 'didebatin padahal masih cape',
      ignored: 'dikacangin',
      cancelPlans: 'cancel plans',
      special: 'HEHE'
    },
    actions: {
      eat: 'eat',
      coffee: 'coffee',
      compliment: 'compliment',
      debate: 'debate',
      debateTired: 'debateTired',
      ignored: 'ignored',
      cancelPlans: 'cancelPlans',
      special: 'special'
    }
  },
  sv: {
    title: 'MALI BALI',
    moodOmeter: "HUMÖRMÄTARE",
    gameOver: 'Spelet är slut!',
    loseMessage: '>:( IHHH',
    winMessage: 'ASYIIKK ÄLSKAR DIG',
    playAgain: 'Spela igen!',
    moodLog: 'Humörlogg',
    buttons: {
      coffee: 'KAFFE',
      eat: 'ÄTA',
      compliment: 'KOMPLIMENT',
      debate: 'DEBATT',
      ignored: 'IGNORERAD',
      cancelPlan: 'AVBRYT PLAN',
      special: ';)',
      silentTreatment: 'TIGANDE BEHANDLING'
    },
    log: {
      happy: 'glad',
      sad: 'ledsen',
      because: 'eftersom',
      increased: 'ökade',
      decreased: 'minskade',
      points: 'poäng',
      coffee: 'kaffe',
      eat: 'ätande',
      compliment: 'kompliment',
      debate: 'debatt',
      debateTired: 'debatt när trött',
      ignored: 'ignorerad',
      cancelPlans: 'avbröt planer',
      special: 'HEHE'
    },
    actions: {
      eat: 'eat',
      coffee: 'coffee',
      compliment: 'compliment',
      debate: 'debate',
      debateTired: 'debateTired',
      ignored: 'ignored',
      cancelPlans: 'cancelPlans',
      special: 'special'
    }
  }
}

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

export default i18n

