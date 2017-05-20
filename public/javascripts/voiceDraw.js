    var voiceDraw_init=function(){
      //elements
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      var drawing= false;
      var preX;
      var preY;
      $('#canvas')
      .mousedown(mouseDown)
      .mousemove(mouseMove)
      .mouseup(mouseUp);
      $('#clear').click(clear);

    function mouseDown(e){
      var x = e.pageX;
      var y = e.pageY;
      preX = x;
      preY = y;
      ctx.beginPath();
      ctx.moveTo(x,y);
      drawing = true;
    }

    function mouseMove(e){
      if(drawing){
      var x= e.pageX;
      var y= e.pageY;
      x -= canvas.offsetLeft;
      y -= canvas.offsetTop;
      var newX= preX*0.75+x*0.25;
      var newY= preY*0.75+y*0.25;
      ctx.lineTo(newX,newY);
      ctx.stroke();
      ctx.moveTo(newX,newY);
      preX=newX;
      preY=newY;
    }
    }

    function mouseUp(e){
      ctx.closePath();
      drawing = false;
    }

    function clear(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
    }

//speech recognition
if('webkitSpeechRecognition' in window){
   var recognition= new webkitSpeechRecognition();
   recognition.continuous = true;
   recognition.interimResults= true;
   var recognizing = false;
   var ignore_onend
   var final_transcript = '';
   console.log('speech init');

   recognition.onstart = function(){
    recognizing = true;
    $('#speech').css('background', 'green');
    console.log('onstart');
   };
   recognition.onerror = function(event){
    ignore_onend=true;
    console.log('onerror');
   };
   recognition.onend = function(){
    recognizing = false;
    $('#speech').css('background', 'white');
    console.log('onend');
    if(ignore_onend){
      return;
    }
   };
   recognition.onresult = function(event){
    var interim_transcript = '';
    if(typeof(event.results) == 'undefined'){
      recognition.onend = null;
      recognition.stop();
      return;
    }
    for(var i = event.resultIndex; i< event.results.length; ++i){
      if(event.results[i].isFinal){
        final_transcript += event.results[i][0].transcript;
      }else{
        interim_transcript += event.results[i][0].transcript;
      }
    }
    //call tokenization
    analyzeSyntaxOfText(final_transcript);
    final_transcript = capitalize(final_transcript);
    $('#final_span').html(linebreak(final_transcript));
    $('#interim_span').html(linebreak(interim_transcript));
   };

   var two_line = /\n\n/g;
   var one_line = /\n/g;
   function linebreak(s){
    return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
   }
   var first_char = /\S/;
   function capitalize(s){
    return s.replace(first_char, function(m){return m.toUpperCase();});
   }

   $('#speech').click(speechStart);
   function speechStart(){
    console.log('speech button click');
    if(recognizing){
      $('#speech').css('background', 'white');
      recognition.stop();
      return;
   }

   final_transcript = '';
   recognition.lang = 'ja-JP';
   recognition.start();
   ignore_onend = false;
   $('#final_span').innerHTML = '';
   $('#interim_span').innerHTML = '';
    }
  }

}


$(voiceDraw_init);
