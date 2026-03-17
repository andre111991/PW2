const userName = process.env.USER_NAME;

if (!userName) {
  console.log('ERROR: USER_NAME environment variable is not set');
  process.exit(1);
}

console.log(`Welcome, ${userName}!`);