$( document ).ready(function() {


  if (localStorage.getItem("searches") !== null) {
    let string = localStorage.getItem("searches")
    let obj = JSON.parse(string)
    let searches = Object.keys(obj).length
    $(".spanSearches").text(searches)
  }


  function getResults(searchTerm) {
    let url = "https://g-ritekit.herokuapp.com/v1/stats/history/" + searchTerm
    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'JSON',
      headers: {},
      data: `client_id=407d99c5b4e5a2294318ab2b18d89ab0fdc30c486f71`,

    }).done((response) => {
      console.log("data from ritekit is...", response)

      let obj = response['data']
      console.log(obj)
      loadGraph(obj)

    }).fail((err) => { console.log("a bad thing happened with getting stats", err) })
  }

  function loadGraph(obj) {
    //Better to construct options first and then pass it as a parameter
    let data = []
    for (let i = 0; i<obj.length; i++) {
      let date = obj[i].date
      let tweets = obj[i].tweets
      let newobj = {
        label: date,
        y: tweets
      }
      data.push(newobj)
    }

    console.log('data: ' + data.toString())

    var options = {
      title: {
        text: "Hashtag History (past 30 days)"
      },
      animationEnabled: true,
      data: [{
        type: "spline", //change it to line, area, column, pie, etc
        dataPoints: data
        // [{
        //     x: 10,
        //     y: 10
        //   },
        //   {
        //     x: 20,
        //     y: 12
        //   },
        //   {
        //     x: 30,
        //     y: 8
        //   },
        //   {
        //     x: 40,
        //     y: 14
        //   },
        //   {
        //     x: 50,
        //     y: 6
        //   },
        //   {
        //     x: 60,
        //     y: 24
        //   },
        //   {
        //     x: 70,
        //     y: -4
        //   },
        //   {
        //     x: 80,
        //     y: 10
        //   }
        // ]
      }]
    };

    $("#chartContainer").CanvasJSChart(options);

  }

  $(".formValidate").submit(function(e) {
      e.preventDefault();
  });

  $('.buttonsearch').click(function () {

    if ($('.form-control').val() === "") {
      return;
    }

    let input = $('.form-control').val()
    let arr = input.split(" ")
    input = arr[0]
    input = input.replace(/[^a-zA-Z0-9_-]/g,'');
    console.log(input)
    $('.form-control').val(input)
    if (localStorage.getItem("searches") === null) {
      console.log('LocalStorage Doesnt Contain Anything!')
      let obj = {
        "0" : input
      }
      obj["0"] = input
      console.log("adding new key/value pair: " + obj)
      let string = JSON.stringify(obj)
      console.log("stringified string: " + string)
      localStorage.setItem("searches", string)
    } else {
      console.log("object already found")
      let obj = JSON.parse(localStorage.getItem("searches"))
      console.log("object: " + obj)
      let length1 = Object.keys(obj).length
      obj[length1 + 1] = input
      let length = Object.keys(obj).length
      console.log('length: ' + length)
      let string = JSON.stringify(obj)
      console.log("stringified object: " + string)
      localStorage.removeItem("searches")
      localStorage.setItem("searches", string)
    }
    let string = localStorage.getItem("searches")
    let obj = JSON.parse(string)
    let searches = Object.keys(obj).length
    $(".spanSearches").text(searches)

    // $('.ulcontainer').children().remove()
    //
    // let ulcontainer = $('.ulcontainer')
    // let newul = $('<ul>')
    // newul.addClass('list-group')
    // newul.addClass('list-title')
    // newul.addClass('list-group-stats')
    //
    // let title = $('<li>')
    // title.addClass('list-group-item')
    // title.addClass('active')
    // title.text('#' + input + ' Hashtag Statistics (Per Hour)')
    // newul.append(title)
    //
    // ulcontainer.append(newul)

    getResults(input)
  })
  //getResults("filming")



  // https://api.ritekit.com/v1/stats/hashtag-suggestions/filming?client_id=407d99c5b4e5a2294318ab2b18d89ab0fdc30c486f71
})
