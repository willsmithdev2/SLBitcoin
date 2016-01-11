var buffer=require('buffer');
var crypto=require('crypto');



var checkHash=function(block) {
 var version=reverseEndian(padBits(block.version));
 var merkleroot=reverseEndian(calculateMerkleRoot(block.tx));

 var previousBlockHash=((!block.previousblockhash) ?
 "0000000000000000000000000000000000000000000000000000000000000000" : reverseEndian(block.previousblockhash) );

 var time= reverseEndian(block.time);
 var bits=reverseEndian(block.bits);
 var nonce = reverseEndian(block.nonce);

 var header= version+previousBlockHash+merkleroot+time+bits+nonce;

 var hashedHeader=hash(header);
 var rehashed=hash(hashedHeader);
 var finalHash=reverseEndian(rehashed);

 return block.hash===finalHash;
};

function hash(value){
  var hash=crypto.createHash('sha256');
  var hashedOnce=hash.update(hex2Bin(value)).digest('hex');
  return hashedOnce;
};

var reverseEndian= function(input) {
  var valueAsHex=input.toString(16);
  var reversedInput=valueAsHex.split('').reverse();
  var temp;

  for(var i=0; i<reversedInput.length;i+=2){
    temp=reversedInput[i+1];
    reversedInput[i+1]=reversedInput[i];
    reversedInput[i] = temp;
  }

  return reversedInput.join('');
};

var padBits=function(value) {
  var valueAsHex=value.toString(16);
  var paddedValue=valueAsHex;
  for(var i=0;i<8-valueAsHex.length; i++){
     paddedValue="0"+paddedValue;
  }

  return paddedValue;
};


var calculateMerkleRoot=function(block){
  var transactions=block;

  if(transactions.length==1){
    return transactions[0];
  };
  //If odd number of elements add another node
  if(transactions.length % 2 !=0){
    var leafNode=transactions[transactions.length-1];
    transactions.push(leafNode);
  }

  var hashedRowAbove=[];

  for(var i=0;i<transactions.length;i+=2){
    var currentTx=transactions[i];
    var neighbouringTx= transactions[i+1];
    var parentNode= calculateHashNodeInTree(currentTx,neighbouringTx);
    hashedRowAbove.push(parentNode);
  }

  return calculateMerkleRoot(hashedRowAbove);

};

var calculateHashNodeInTree=function(v1,v2){
  var tx1=reverseEndian(v1);
  var tx2=reverseEndian(v2);

  var merkleroot=reverseEndian(hash(hash(tx1+tx2)));

  return merkleroot;
};

function hex2Bin(n){
  var hex = n, // ASCII HEX: 37="7", 57="W", 71="q"
      bytes = [],
      str;

  for(var i=0; i< hex.length-1; i+=2){
      bytes.push(parseInt(hex.substr(i, 2), 16));
  }

  str = String.fromCharCode.apply(String, bytes);

  return str;
};

exports.calculateMerkleRoot = calculateMerkleRoot;
exports.calculateHashNodeInTree=calculateHashNodeInTree;
exports.checkHash = checkHash;
exports.reverseEndian=reverseEndian;
exports.padBits=padBits;
