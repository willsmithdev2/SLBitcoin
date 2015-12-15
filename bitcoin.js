var buffer=require('buffer')

var checkHash=function(block) {
 var merkleroot=SwapOrder(block.merkleroot)


  return true;
}

var SwapOrder= function(input) {
  var reversedInput=input.split('').reverse();
  var temp;

  for(var i=0; i<reversedInput.length;i+=2){
    temp=reversedInput[i+1];
    reversedInput[i+1]=reversedInput[i];
    reversedInput[i] = temp;
  }

  return reversedInput.join('');
}

var littleEndian=function(value) {
  var valueAsHex=value.toString(16);
  var hexAsBin=Hex2Bin(valueAsHex);
  var byteBuffer=new Buffer(valueAsHex,"hex");
  var tmp;
  var counter=byteBuffer.length - 1;
  for(var i=0; i<(byteBuffer.length/2);i++){
    tmp=byteBuffer[i];
    byteBuffer[i]=byteBuffer[counter];
    byteBuffer[counter]=tmp;
    counter--;
  }

  return byteBuffer.toString("hex");
}


exports.checkHash = checkHash;
exports.SwapOrder=SwapOrder;
exports.littleEndian=littleEndian;

function Hex2Bin(n){if(!checkHex(n))return 0;return parseInt(n,16).toString(2)}
function checkHex(n){return/^[0-9A-Fa-f]{1,64}$/.test(n)}
