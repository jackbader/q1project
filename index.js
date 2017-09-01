$( document ).ready(function() {

  if (localStorage.getItem("searches") !== null) {
    let string = localStorage.getItem("searches")
    let obj = JSON.parse(string)
    let searches = Object.keys(obj).length
    $(".spanSearches").text(searches)
  }


  function getResults(input) {
    let url = "https://g-ritekit.herokuapp.com/v1/stats/hashtag-suggestions/" + input
    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'JSON',
      headers: {},
      data: `client_id=407d99c5b4e5a2294318ab2b18d89ab0fdc30c486f71`,
    }).done((response) => {
      console.log("data from ritekit is...", response)

      $('.ulcontainer').children().remove()

      let ulcontainer = $('.ulcontainer')
      let newul = $('<ul>')
      newul.addClass('list-group')
      newul.addClass('list-title')
      newul.addClass('list-group-stats')

      let title = $('<li>')
      title.addClass('list-group-item')
      title.addClass('active')
      title.text('#' + input + ' Hashtag Statistics (Per Hour)')
      newul.append(title)

      ulcontainer.append(newul)

      let keys = Object.keys(response)
      console.log("keys: " + keys)
      console.log(response['data'])
      console.log(response['data'][0])
      let grab = response['data'][0]
      //
      let statsli = $(".list-title")
      console.log(statsli)

      let ul = $(".list-group-stats")
      let li = $("<li>")
      li.addClass("list-group-item")
      li.text("Tweets: " + grab.tweets)
      ul.append(li)

      let retweets = $('<li>')
      retweets.addClass("list-group-item")
      retweets.text("Retweets: " + grab.retweets)
      ul.append(retweets);

      let images = $('<li>')
      images.addClass("list-group-item")
      images.text("Tweets with images: " + grab.images.toFixed(2) + '%')
      ul.append(images)

      let links = $('<li>')
      links.addClass("list-group-item")
      links.text("Tweets with links: " + grab.links.toFixed(2) + '%')
      ul.append(links)

    }).fail((err) => { console.log("a bad thing happened with getting stats", err) })
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

    $('.ulcontainer').children().remove()

    getResults(input)
  })
  //getResults("filming")



  // https://api.ritekit.com/v1/stats/hashtag-suggestions/filming?client_id=407d99c5b4e5a2294318ab2b18d89ab0fdc30c486f71
})
