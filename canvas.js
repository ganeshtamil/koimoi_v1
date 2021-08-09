//window.addEventListener("load",function(){

    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    //Resizing
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    let default_bg_color = "white";
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);


    let draw_color = "black";
    let draw_width = 10;
    let isDrawing = false;

    var x,y;

    var rect = canvas.getBoundingClientRect();
    let L = rect.left;
    let T = rect.top;

    let restore_array = [];
    let index = -1;
     
    function colorchange(element){
        draw_color = element.style.background;
    }

    canvas.addEventListener("touchstart",start,false);
    canvas.addEventListener("touchmove",draw,false);
    canvas.addEventListener("mousedown",start,false);
    canvas.addEventListener("mousemove",draw,false);

    canvas.addEventListener("touchend",stop,false);
    canvas.addEventListener("mouseup",stop,false);
    canvas.addEventListener("mouseout",stop,false);

    function start(event){
        event.preventDefault();
        isDrawing = true;

        if(event.type == "touchstart"){
            x = event.touches[0].clientX-L;
            y = event.touches[0].clientY-T;
        }
        else{
            x = event.clientX-canvas.offsetLeft;
            y = event.clientY-canvas.offsetTop;
        }
        
        
        ctx.beginPath();
        
        ctx.moveTo(x,y);
        
        
    }

    function draw(event){
        event.preventDefault();
        
        
        
        if(isDrawing){
            ctx.strokeStyle = draw_color;
            ctx.lineWidth = draw_width;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            if(event.type =="touchmove"){
                ctx.lineTo(event.touches[0].clientX-L,event.touches[0].clientY-T);
            }else{
                ctx.lineTo(event.clientX-canvas.offsetLeft,event.clientY-canvas.offsetTop);
            }
            
            ctx.stroke();
            
        }
    }

    function stop(event){
        if(isDrawing){
            ctx.stroke();
            isDrawing = false;
            ctx.closePath();
        }
        event.preventDefault();

        if(event.type != "mouseout"){
            restore_array.push(ctx.getImageData(0,0,canvas.width,canvas.height));
            index += 1;
        }

       
        

    }

    function clear_canvas(){
        ctx.fillStyle= "white";
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillRect(0,0,canvas.width,canvas.height);

        restore_array = [];
        index = -1;
    }
    
    function undo_last(){
        if(index<=0){
            clear_canvas();
        }
        else{
            index -= 1;
            restore_array.pop();
            ctx.putImageData(restore_array[index],0,0);
        }
    }

    const download = document.querySelector(".downbtn");

    download.addEventListener("click",function(){

        //IE/Edge support (PNG only)
        if(window.navigator.msSaveBlob){
            window.navigator.msSaveBlob(canvas.msToBlob(),"canvas-img.png");
        }else{
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.href = canvas.toDataURL();

            a.download = "canvas-image";
            a.click();
            a.body.removeChild();
        }

        
        
    });





  