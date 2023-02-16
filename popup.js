var iTextPos = 0; // initialise text position 
var destination = document.getElementById('joke'); //joke text display location     
var iSpeed = 69; // time delay of print out 
var active,cJoke;
 ( async ()=>{       
    await handleComedian();// initial
    let comic=document.getElementById('choiceC');
    comic.addEventListener('change', async () => {        
        await handleComedian (comic.value);
    });    
})(); 
  
async function handleComedian (name="BobHope"){
    try{ 
        let currentImp= await import(`./vault/${name}.json`, { assert: { type: "json" } }) ; 
        currentImp=currentImp.default.jokes;
        let totalAmount=currentImp.length-1;
        document.getElementById('totalAmount').innerHTML=totalAmount;
        document.getElementById('curnum').setAttribute('max',totalAmount); 
        let randIndex=Math.floor(Math.random()*totalAmount );
        document.getElementById('curnum').value=randIndex;
        if (totalAmount>100){
            document.getElementById('curnum').style.width ='38px'
        } else {
            document.getElementById('curnum').style.width ='35px'
        } 
       

        document.getElementById('curnum').addEventListener('input', function () { 
            clearTimeout(active) ;
            destination.innerHTML=''
            iTextPos=0
            if (parseInt(this.value) > parseInt(this.max)) {
                this.value = parseInt(this.max); 
            }
            if (parseInt(this.value) < 0 || !parseInt(this.value)) {
                this.value = 0; 
            }
            cJoke=currentImp[parseInt(this.value)].Joke;
            type(cJoke, cJoke.length)
        }) 

        clearTimeout(active);
        destination.innerHTML=''
        iTextPos=0
        cJoke=currentImp[randIndex].Joke;
        type(cJoke, cJoke.length) 

        document.getElementById("rand_b").addEventListener('click', () => {
            clearTimeout(active) ; 
            destination.innerHTML=''
            iTextPos=0;
            let randIndex=Math.floor(Math.random()*totalAmount );
            document.getElementById('curnum').value=randIndex;
            cJoke=currentImp[randIndex].Joke;
            type(cJoke,cJoke.length)
        })
        document.getElementById('fast_f').addEventListener('click',()=>{
            clearTimeout(active) ; 
            destination.innerHTML = cJoke ;
        })
        return currentImp;
    }catch(e){
        console.log(e)
        document.getElementById('main-content').innerHTML='Something went wrong. Send message with description of your situation to solobutoalexey@gmail.com  ';
    }
}
 

function type(aText,iArrLength)
    { //add text on joke change  
        destination.innerHTML =aText.substring(0, iTextPos) + "_"; 
        iTextPos++;
        if ( iTextPos == iArrLength ) {
            destination.innerHTML = aText ;
            return;
        } else {
           active = setTimeout(()=>type(aText,iArrLength), iSpeed);
        }
    } 
    