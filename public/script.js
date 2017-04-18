$(function(){
  var peerReviewCanvas = $('#peer-review')[0];
  var peerReviewCtx = peerReviewCanvas.getContext('2d');
  var colors = [
    'yellow',
    'purple',
    'silver',
    'green',
    'red',
    'blue',
    'orange',
    'fuscia',
    'cyan'
  ]




  peerReviewCtx.fillText("Peer Review", 80, 10);
  for(i = 0; i < 11; i++){
    peerReviewCtx.fillText(10 - i, 10, 30+ i *20);
    peerReviewCtx.moveTo(25, 30 + i * 20);
    peerReviewCtx.lineTo(90, 30 + i * 20);

  }

  peerReviewCtx.stroke();

  //Drae peer review bars

  $.ajax({
    url: '/peerReview.json',
    dataType: 'json',
    success: function(data){


      var categories = Object.keys(data);
// Draw bars

      categories.forEach(function(category, index){
        var value = data[category];
        var x = 30 + index * 10
        var y = 30 + (10 - value) * 20;
        var height = value * 20;
        //peerReviewCtx
        peerReviewCtx.fillRect(x, y, 5, height);
        peerReviewCtx.fillRect(100, 80 + 20 * index, 10, 10);
        peerReviewCtx.strokeText(category, 120, 90 + 20 * index)
      });

      //Draw Labels

/*      categories.forEach(function(category,index){
        peerReviewCtx.drawText(category, 100, 30 + 20 * index);
        peerReviewCtx.strokeText(category, 120, 90 + 20 * index)

      });*/





      //peerReviewCtx.fillRect(30, 30, 5, 200);
    }
  });

  var pointDistributionCanvas = $('#point-distribution')[0];


  $.ajax({
    url: 'pointDistibution.json',
    success: function(data){
      var people = Object.keys(data);
      var total = Object.values(data).reduce(function(acc, value){
        return acc+ value;
      }, 0);

      var start = 0;
      people.forEach(function(person){
        var percent = data[person] / total;
        var end = angle + percent 
        pointDistributionCanvas.arc(100,100,80, start, start + percent * 2 * Math.PI);






      });


    }
  })




});
