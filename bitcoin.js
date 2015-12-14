var checkHash=function(block) {
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

  return reversedInput.join('')
}

var littleEndian=function(block) {
  return true;
}

exports.checkHash = checkHash;
exports.SwapOrder=SwapOrder;
exports.littleEndian=littleEndian;
