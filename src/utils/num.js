export default (num)=>{
    for (var val in key ){
   if(val/100000000>1){
    num.key=(val/100000000).toFixed(2)+"";
    continue
   }else if(val/10000>1){
    num.key=(val/10000).toFixed(2)+"万";
    continue
   }
}
}


