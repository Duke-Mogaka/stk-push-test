exports.getTimestamp = () => {
  const now = new Date();
  now.setHours(now.getHours() + 3); // Convert to EAT timezone
  return (
    now.getFullYear() +
    String(now.getMonth() + 1).padStart(2, '0') +
    String(now.getDate()).padStart(2, '0') +
    String(now.getHours()).padStart(2, '0') +
    String(now.getMinutes()).padStart(2, '0') +
    String(now.getSeconds()).padStart(2, '0')
  );
};

exports.generatePassword = (timestamp) => {
  const passkey = process.env.PASS_KEY;
  const shortCode = process.env.SHORT_CODE;
  const str = shortCode + passkey + timestamp;
  return Buffer.from(str).toString('base64');
};