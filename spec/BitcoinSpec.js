
var goodBlock = {
"hash":"000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
"confirmations":388338,
"size":285,
"height":0,
"version":1,
"merkleroot":"4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
"tx":["4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b"],
"time":1231006505,
"nonce":2083236893,
"bits":"1d00ffff",
"difficulty":1,
"chainwork":"0000000000000000000000000000000000000000000000000000000100010001",
"nextblockhash":"00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048",
"isMainChain":true
}

var badBlock = {
"hash":"000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1249a8ce26f",
"confirmations":388338,
"size":285,
"height":0,
"version":1,
"merkleroot":"4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
"tx":["4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b"],
"time":1231006505,
"nonce":2083236893,
"bits":"1d00ffff",
"difficulty":1,
"chainwork":"0000000000000000000000000000000000000000000000000000000100010001",
"nextblockhash":"00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048",
"isMainChain":true
}


describe("checkHash", function () {
  var bit = require("../bitcoin.js");

  it("should return true for a block with a legit hash", function () {
    var check = bit.checkHash(goodBlock)
    expect(check).toBe(true);
  });

  it("should return false for a block with an incorrect hash", function () {
    var check = bit.checkHash(badBlock)
    expect(check).toBe(false);
  });
});


describe("SwapOrder", function () {
  var bit = require("../bitcoin.js");

  it("should return loelh when hello is put into the function", function () {
    var check = bit.SwapOrder("hello")
    expect(check).toBe("loelh");
  });

  it("should return 81cd02ab7e569e8bcd9317e2fe99f2de44d49ab2b8851ba4a308000000000000 ", function () {
    var check = bit.SwapOrder("00000000000008a3a41b85b8b29ad444def299fee21793cd8b9e567eab02cd81")
    expect(check).toBe("81cd02ab7e569e8bcd9317e2fe99f2de44d49ab2b8851ba4a308000000000000");
  });

  it("should return the correct value based on the block header in example 2a ", function () {
    var check = bit.SwapOrder("4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b")
    expect(check).toBe("3ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a");
  });
});


describe("littleEndian", function () {
  var bit = require("../bitcoin.js");
  //version
  it("should return 01000000 when input 1 into littleEndian ", function () {
    var check = bit.littleEndian(1)
    expect(check).toBe("01000000");
  });

 //nonce
  it("should return 1dac2b7c when 2083236893 is input into littleEndian function ", function () {
    var check = bit.littleEndian(2083236893)
    expect(check).toBe("1dac2b7c");
  });
 //bits
  it("should return ffff001d when 1d00ffff is input into littleEndian function ", function () {
    var check = bit.littleEndian("1d00ffff")
    expect(check).toBe("ffff001d");
  });

//time
  it("should return 29ab5f49 when 1231006505 is input into littleEndian function ", function () {
    var check = bit.littleEndian(1231006505)
    expect(check).toBe("29ab5f49");
  });

});
