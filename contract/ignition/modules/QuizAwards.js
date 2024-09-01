const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("QuizAwards", (m) => {
  const award = m.contract("NFTAwards");

  return { award };
});
