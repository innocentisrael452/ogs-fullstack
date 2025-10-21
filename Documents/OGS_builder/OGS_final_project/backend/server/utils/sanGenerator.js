module.exports = function generateSAN(){
  const prefix = '31';
  const ts = Date.now().toString().slice(-7);
  const rand = Math.floor(Math.random()*10);
  return prefix + ts + rand;
};
