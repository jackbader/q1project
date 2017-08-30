$( document ).ready(function() {


  if (localStorage.getItem("searches") !== null) {
    let string = localStorage.getItem("searches")
    let obj = JSON.parse(string)
    let searches = Object.keys(obj).length
    $(".spanSearches").text(searches)
  }


  function getResults(searchTerm) {
    let url = "https://g-ritekit.herokuapp.com/v1/stats/hashtag-suggestions/" + searchTerm
    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'JSON',
      headers: {},
      data: `client_id=407d99c5b4e5a2294318ab2b18d89ab0fdc30c486f71`,

    }).done((response) => {
      console.log("data from ritekit is...", response)

      let data = response['data']
      console.log(data)
      console.log(data.length)

      //setup table
      let thead = $("thead")
      let tablecontainer = $(".tablecontainer")

      let h2 = $("<h2>")
      h2.addClass("remove")
      h2.text("Suggestions:")

      let tabletr = $("<tr>")
      let hashtag = $("<th>")
      hashtag.text("Hashtag")
      let tweets = $("<th>")
      tweets.text("Tweets per hour")
      let retweets = $("<th>")
      retweets.text("Retweets per hour")
      let images = $("<th>")
      images.text("Tweets with ")
      let links = $("<th>")
      links.text("Tweets with ")

      console.log(tablecontainer)
      tablecontainer.prepend(h2)

      tabletr.append(hashtag)
      tabletr.append(tweets)
      tabletr.append(retweets)
      tabletr.append(images)
      tabletr.append(links)
      thead.append(tabletr)

      // <tr>
      //   <th>Hashtag</th>
      //   <th>Tweets per hour</th>
      //   <th>Retweets per hour</th>
      //   <th>Tweets with <i class="fa fa-image"></i></th>
      //   <th>Tweets with <i class="fa fa-link"></i></th>
      // </tr>


      for (let i = 0; i<data.length; i++) {

        // Get table values
        let obj = data[i]
        let hashtag = obj.hashtag
        let tweets = obj.tweets
        let retweets = obj.retweets
        let images = obj.images.toFixed(1) + "%"
        let links = obj.links.toFixed(1) + "%"

        // Set hashtag name in table
        let tr = $("<tr>")

        let hashtagth = $("<th>")
        hashtagth.text("#" + hashtag)

        let tweetsth = $("<th>")
        tweetsth.text(tweets)

        let retweetsth = $("<th>")
        retweetsth.text(retweets)

        let imagesth = $("<th>")
        imagesth.text(images)

        let linksth = $("<th>")
        linksth.text(links)

        tr.append(hashtagth)
        tr.append(tweetsth)
        tr.append(retweetsth)
        tr.append(imagesth)
        tr.append(linksth)

        $("tbody").append(tr)

      }


    }).fail((err) => { console.log("a bad thing happened with getting stats", err) })
  }

  $(".formValidate").submit(function(e) {
      e.preventDefault();
  });


  $('.buttonsearch').click(function () {

    if ($('.form-control').val() === "") {
      return;
    }

    $('.remove').remove()
    $('thead').children().remove()
    $('tbody').children().remove()

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

    getResults(input)
  })
  //getResults("filming")



  // https://api.ritekit.com/v1/stats/hashtag-suggestions/filming?client_id=407d99c5b4e5a2294318ab2b18d89ab0fdc30c486f71
})
