var buffer=require('buffer')
var crypto=require('crypto')

var checkHash=function(block) {
 var version=SwapOrder(padBits(block.version));
 var merkleroot=SwapOrder(block.merkleroot);

 var previousBlockHash=((typeof block.previousblockhash==="undefined") ?
 "0000000000000000000000000000000000000000000000000000000000000000" : SwapOrder(block.previousblockhash) )

 var time= SwapOrder(block.time);
 var bits=SwapOrder(block.bits);
 var nonce = SwapOrder(block.nonce);

 var header= version+previousBlockHash+merkleroot+time+bits+nonce;
 var headerInBinary=Hex2Bin(header);
 var hash=crypto.createHash('sha256');
 var hash2=crypto.createHash('sha256');

 var hashedHeader=Hex2Bin(hash.update(headerInBinary).digest('hex'));
 var rehashed=hash2.update(hashedHeader).digest('hex');
 var finalHash=SwapOrder(rehashed);

 return block.hash==finalHash;
}

var SwapOrder= function(input) {
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


exports.checkHash = checkHash;
exports.SwapOrder=SwapOrder;
exports.padBits=padBits;
