let raa=[1,2,3]

function hola(array){
    if(array.length!=0){
        let sig=array[array.length-1].id+1
        return sig
    }else{
        return 0
    }
       
}
console.log(hola(raa))