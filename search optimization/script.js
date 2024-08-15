document.addEventListener("DOMContentLoaded", () =>{
    var count = 1;
    var onRequest = false;
    document.getElementById('search-input').addEventListener('input', function () {

        if (onRequest) {
            return;
        }

        onRequest = true;
        console.log(count +" Typing");
        
        setTimeout(() => {
            test(count++);
        }, 1500);


    });




    function test(value)
    {
        console.log("Called value " +  value);
        onRequest = false;
    }

});