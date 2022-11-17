const validators = {
  test: {
    validator() {
      return true
    },
    message(a) {
      return `${a} is great`
    },
  },
  time: {
    validator: (v) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v),
    message: (props) => `${props.value} is not a valid time!`,
  },
  color: {
    validator: (v) => /^#([0-9a-f]{3}){1,2}$/i.test(v),
    message: () => 'Invalid color',
  },
  link: {
    validator: (v) => /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim.text(
      v,
    ),
    message: () => 'Invalid link',
  },
  phoneIsrael: {
    validator: (v) => /^([0|1]\d{1,3}[-])?\d{7,10}$/.test(v),
    message: (props) => `${props.value} is not a valid israeli phone`,
  },
  email: {
    validator: (v) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      v,
    ),
    message: () => 'Invalid email',
  },
  hourTime: {
    validator: (v) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v),
    message: (v) => `${v} is not a valid hourTime`,
  },
  password: {
    validator: (v) => v.length > 5,
    message: (v) => `${v} password is not valid`,
  },
}

export default validators
