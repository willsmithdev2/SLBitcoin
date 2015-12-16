var buffer=require('buffer')
var crypto=require('crypto')

var checkHash=function(block) {
 var version=reverseEndian(padBits(block.version));
 var merkleroot=reverseEndian(block.merkleroot);

 var previousBlockHash=((typeof block.previousblockhash==="undefined") ?
 "0000000000000000000000000000000000000000000000000000000000000000" : SwapOrder(block.previousblockhash) )

 var time= reverseEndian(block.time);
 var bits=reverseEndian(block.bits);
 var nonce = reverseEndian(block.nonce);

 var header= version+previousBlockHash+merkleroot+time+bits+nonce;
 var headerInBinary=Hex2Bin(header);
 var hash=crypto.createHash('sha256');
 var hash2=crypto.createHash('sha256');

 var hashedHeader=Hex2Bin(hash.update(headerInBinary).digest('hex'));
 var rehashed=hash2.update(hashedHeader).digest('hex');
 var finalHash=reverseEndian(rehashed);

 return block.hash==finalHash;
}

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
}

var padBits=function(value) {
  var valueAsHex=value.toString(16);
  var paddedValue=valueAsHex;
  for(var i=0;i<8-valueAsHex.length; i++){
     paddedValue="0"+paddedValue;
  }

  return paddedValue;
}


function Hex2Bin(n){
  var hex = n, // ASCII HEX: 37="7", 57="W", 71="q"
      bytes = [],
      str;

  for(var i=0; i< hex.length-1; i+=2){
      bytes.push(parseInt(hex.substr(i, 2), 16));
  }

  str = String.fromCharCode.apply(String, bytes);

  return str;

}

var calculateHashNodeInTree=function(v1,v2){
  var tx1=reverseEndian(v1)
  var tx2=reverseEndian(v2)

  var merkleroot=reverseEndian(hash(hash(tx1+tx2)))

  return merkleroot;
}

function hash(value){
  var hash=crypto.createHash('sha256');
  var hashedOnce=hash.update(Hex2Bin(value)).digest('hex');
  return hashedOnce;
}


function dhash(value){
  var hash=crypto.createHash('sha256');
  var hash2=crypto.createHash('sha256');
  var hashedOnce=hash.update(value).digest('hex');
  var hashedTwice=hash2.update(hashedOnce).digest('hex');
  return hashedTwice;
}

exports.calculateHashNodeInTree=calculateHashNodeInTree;
exports.checkHash = checkHash;
exports.reverseEndian=reverseEndian;
exports.padBits=padBits;
