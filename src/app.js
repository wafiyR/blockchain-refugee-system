App = {
  contracts: {},

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */ })
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */ })
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = web3.eth.accounts[0]
  },

  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const regRefugee = await $.getJSON('Register.json')
    App.contracts.Register = TruffleContract(regRefugee)
    App.contracts.Register.setProvider(App.web3Provider)

    // Hydrate the smart contract with values from the blockchain
    App.regRefugee = await App.contracts.Register.deployed()
  },

  render: async () => {

    web3.eth.getBlockNumber(function (error, result) {
      if (error === null) {
        //console.log(result);
        App.blockNumber = result;
        //document.getElementById('blockNumber').innerHTML = document.getElementById('blockNumber').innerHTML + "<br>" + result;
        $("#blockNumber").html("Block Number: " + result);
      }

    });

    /*     var refugeeDetail = App.regRefugee.Refugee;
    
        refugeeDetail.watch(function(error, result) {
          if (result) {
    
              $("#card_number").html(web3.toAscii(result.args._unhcrNum));
              $("#card_fName").html(web3.toAscii(result.args._fName));
              $("#card_lName").html(web3.toAscii(result.args._lName));
              $("#card_sex").html(web3.toAscii(result.args._sex));
              $("#card_country").html(web3.toAscii(result.args._country));
          } 
      }); */

    // render latest refugee details
    await App.renderCard()

    await App.renderMap()

    //unhcr Card details - start

    /*     const refugeeCount = await App.regRefugee.refugeeCount()
        const $taskTemplate = $('.unhcrCard')
    
        //var refugeeId = refugeeCount
    
    
    
        const refugee = await App.regRefugee.refugees(refugeeCount)
    
        const _unhcrNum = refugee[1]
    
        const _fName = refugee[2]
    
        const _lName = refugee[3]
    
        const _sex = refugee[4]
    
        const _country = refugee[5]
    
    
        const $newTaskTemplate = $taskTemplate.clone()
    
    
        $newTaskTemplate.find('.card_number').html(_unhcrNum)
        $newTaskTemplate.find('.card_fName').html(_fName)
        $newTaskTemplate.find('.card_lName').html(_lName)
        $newTaskTemplate.find('.card_sex').html(_sex)
        $newTaskTemplate.find('.card_country').html(_country)
    
        $('#cardTemplate').append($newTaskTemplate)
    
        $newTaskTemplate.show() */

    //unhcr Card details - end

    //display details for Seacrh Refugee Page - start

    const $searchPageTemplate = $('.tableData')

    for (var i = 1; i <= refugeeCount; i++) {

      const disp = await App.regRefugee.refugees(i)

      const unhcrNum = disp[1]
      const country = disp[5]

      const $dispSearchPage = $searchPageTemplate.clone()
      $dispSearchPage.find('.$unhcrNumber_SP').html(unhcrNum)
      $dispSearchPage.find('.originCountry_SP').html(country)

      $('#dataTemplate').append($dispSearchPage)

      $dispSearchPage.show()

    }

    //display details for Seacrh Refugee Page - end





  },

  renderMap: async () => {

    const refugeeCount = await App.regRefugee.refugeeCount()
    const $taskTemplate = $('.mapData')

    var _country = new Array(1000);


    //var refugeeId = refugeeCount.toNumber()

    //App.regRefugee.refugees(refugeeCount)

    //var refugeeId = refugeeCount.length - 1;
    //var refugeeId = refugeeCount - 1;
    //var refugeeId = refugeeCount

    //const refugee = await App.regRefugee.refugees(refugeeId)

    for (var i = 1; i <= refugeeCount; i++) {
      const refugee = await App.regRefugee.refugees(i)

      const _unhcrNum = refugee[1]

      const _fName = refugee[2]

      const _lName = refugee[3]

      const _sex = refugee[4]

      _country[i] = refugee[5]


      // Create the html for the task

      const $newTaskTemplate = $taskTemplate.clone()
      /*     $newTaskTemplate.find('.unhcrNum').text(_unhcrNum)
          $newTaskTemplate.find('.fName').text(_fName)
          $newTaskTemplate.find('.lName').text(_lName)
          $newTaskTemplate.find('.sex').text(_sex)
          $newTaskTemplate.find('.country').text(_country) */

      //$newTaskTemplate.find('.card_number').html(_unhcrNum)
      //$newTaskTemplate.find('.card_fName').html(_fName)
      //$newTaskTemplate.find('.card_lName').html(_lName)
      //$newTaskTemplate.find('.card_sex').html(_sex)
      $newTaskTemplate.find('.mapCountry').html(_country[i])

      $('#mapTemplate').append($newTaskTemplate)

      $newTaskTemplate.show()
    }


  },

  renderCard: async () => {

    const refugeeCount = await App.regRefugee.refugeeCount()
    const $taskTemplate = $('.unhcrCard')

    //var refugeeId = refugeeCount.toNumber()

    //App.regRefugee.refugees(refugeeCount)

    //var refugeeId = refugeeCount.length - 1;
    //var refugeeId = refugeeCount - 1;
    //var refugeeId = refugeeCount

    //const refugee = await App.regRefugee.refugees(refugeeId)

    const refugee = await App.regRefugee.refugees(refugeeCount)

    const _unhcrNum = refugee[1]

    const _fName = refugee[2]

    const _lName = refugee[3]

    const _sex = refugee[4]

    const _country = refugee[5]


    // Create the html for the task

    const $newTaskTemplate = $taskTemplate.clone()
    /*     $newTaskTemplate.find('.unhcrNum').text(_unhcrNum)
        $newTaskTemplate.find('.fName').text(_fName)
        $newTaskTemplate.find('.lName').text(_lName)
        $newTaskTemplate.find('.sex').text(_sex)
        $newTaskTemplate.find('.country').text(_country) */

    $newTaskTemplate.find('.card_number').html(_unhcrNum)
    $newTaskTemplate.find('.card_fName').html(_fName)
    $newTaskTemplate.find('.card_lName').html(_lName)
    $newTaskTemplate.find('.card_sex').html(_sex)
    $newTaskTemplate.find('.card_country').html(_country)

    $('#cardTemplate').append($newTaskTemplate)

    $newTaskTemplate.show()

  },


  setRefugee: async () => {

    const _unhcrNum = $('#unhcrNum').val()
    const _fName = $('#fName').val()
    const _lName = $('#lName').val()
    const _sex = $('#sex').val()
    const _originCountry = $('#originCountry').val()

    //const refugeeCount = await App.regRefugee.refugeeCount()

/*     for (var i = 1; i <= refugeeCount; i++) {

      const refugee = await App.regRefugee.refugees(i)

      const unhcrNum = refugee[1]

      if (_unhcrNum === unhcrNum) {
        alert("Refugee Has Registered")
      } else {
        await App.regRefugee.setRefugee(_unhcrNum, _fName, _lName, _sex, _originCountry)
      }

      

    } */

    await App.regRefugee.setRefugee(_unhcrNum, _fName, _lName, _sex, _originCountry)




    //semicolon ; or no semicolom ;?

    //javascript parameters? separated by ;?
    window.location.reload()


  },

  /*   displayBlock: async () => {
  
      web3.eth.getBlockNumber().then(data => {
        document.getElementById('blockNumber').innerHTML = data;
      });
  
    }, */

  displayData: async () => {


    const _unhcrNum = $('#unhcrNum').val()

    // load the total number of refugees
    const refugeeCount = await App.regRefugee.refugeeCount()
    const $taskTemplate = $('.tableData')


    /*                 for (var i = 1; i <= refugeeCount; i++)
            {
            const refugee = await App.regRefugee.refugees(i)
        
            const unhcrNum = refugee[1]
        
            const fName = refugee[2]
        
            const lName = refugee[3]
        
            const sex = refugee[4]
        
            const country = refugee[5]
        
            const $newTaskTemplate = $taskTemplate.clone()
        
            $newTaskTemplate.find('.unhcrNumber_SP').html(unhcrNum)
             $newTaskTemplate.find('.card_fName').html(fName)
            $newTaskTemplate.find('.card_lName').html(lName)
            $newTaskTemplate.find('.card_sex').html(sex)
            $newTaskTemplate.find('.originCountry_SP').html(country) 
        
        
            $('#dataTemplate').append($newTaskTemplate)
        
            $newTaskTemplate.show()
            }  */


    var arrUnhcrNum = new Array(1000);

    /*           for (var i = 1; i <= refugeeCount; i++)
            {
            const refugee = await App.regRefugee.refugees(i)
        
            const unhcrNum = refugee[1]
            //arrUnhcrNum[i] = refugee[1]
        
            const fName = refugee[2]
        
            const lName = refugee[3]
        
            const sex = refugee[4]
        
            const country = refugee[5]
    
            //const error = "Refugee Data Not Found"        
    
            if(_unhcrNum === unhcrNum)
            {
            const $newTaskTemplate = $taskTemplate.clone()
        
            //$newTaskTemplate.find('.unhcrNumber_SP').html(arrUnhcrNum[i])
            $newTaskTemplate.find('.unhcrNumber_SP').html(unhcrNum)
            $newTaskTemplate.find('.card_fName').html(fName)
            $newTaskTemplate.find('.card_lName').html(lName)
            $newTaskTemplate.find('.card_sex').html(sex)
            $newTaskTemplate.find('.originCountry_SP').html(country)
        
            //alert(arrUnhcrNum[i])
        
            $('#dataTemplate').append($newTaskTemplate)
        
            $newTaskTemplate.show()          
            }
            else
            {
              //alert("Refugee Data Not Found")
    
              //const $newTaskTemplate = $taskTemplate.clone()
    
              //$newTaskTemplate.find('.errorDisplay').html(error)
    
              //$('#dataTemplate').append($newTaskTemplate)
        
              //$newTaskTemplate.show()    
             
            }
        
    
            }   */

    var count = 4

    for (var i = 1; i <= refugeeCount; i++) {
      const refugee = await App.regRefugee.refugees(i)

      const unhcrNum = refugee[1]
      //arrUnhcrNum[i] = refugee[1]

      const fName = refugee[2]

      const lName = refugee[3]

      const sex = refugee[4]

      const country = refugee[5]

      const error = "Refugee Data Not Found";

      count++

      if (_unhcrNum === unhcrNum) {

        const $newTaskTemplate = $taskTemplate.clone()

        //$newTaskTemplate.find('.unhcrNumber_SP').html(arrUnhcrNum[i])
        $newTaskTemplate.find('.unhcrNumber_SP').html(unhcrNum)
        $newTaskTemplate.find('.card_fName').html(fName)
        $newTaskTemplate.find('.card_lName').html(lName)
        $newTaskTemplate.find('.card_sex').html(sex)
        $newTaskTemplate.find('.originCountry_SP').html(country)

        $newTaskTemplate.find('.blockNumber').html(count)
        //alert(arrUnhcrNum[i])

        $('#dataTemplate').append($newTaskTemplate)

        $newTaskTemplate.show()
      }
      else if (_unhcrNum !== unhcrNum) {
        //alert("Refugee Data Not Found")

        /*         const $newTaskTemplate = $taskTemplate.clone()
                $newTaskTemplate.find('.errorDisplay').html(error)
        
                $('#dataTemplate').append($newTaskTemplate)
        
                $newTaskTemplate.show() */


      }


    }








    //below -- search refugee

    //var arrUnhcrNum = new Array(1000);
    // var arrUnhcrNum = new Array();
    //var arrUnhcrNum = [];

    /*     for (var j = 0; j <= refugeeCount; j++)
        {
    
    
          const refugee = await App.regRefugee.refugees(i)
    
          arrUnhcrNum[j] = refugee[1]
    
          document.querySelector('.unhcrNumber_SP').innerHTML += '<li>' + element + '</li>';
        } */

    /*     for(var j = 1 ; j<= refugeeCount; j++)
        {
          const refugee = await App.regRefugee.refugees(i)
    
          arrUnhcrNum[j] = refugee[1]  
     
          
          
        }
    
        arrUnhcrNum.forEach(element => { 
          document.querySelector('.output').innerHTML 
                  += '<li>' + element + '</li>'; 
      });  */

    /*      for (var j = 0; j <= refugeeCount; j++) {
    
          const refugee = await App.regRefugee.refugees(i)
    
          const temp = refugee[1]
          arrUnhcrNum[j] = temp
    
          //arrUnhcrNum[j] = temp.toString()
    
          //arrUnhcrNum[j] = refugee[1]  //load data in array
    
          const fName = refugee[2]
        
          const lName = refugee[3]
      
          const sex = refugee[4]
      
          const country = refugee[5]
    
          //arrUnhcrNum[j] = "fucker" // work - with line 282
    
          //const sial = "secgrsd";
          //arrUnhcrNum.push()
          var arr = arrUnhcrNum.toString();
    
          const $newTaskTemplate = $taskTemplate.clone()
    
          $newTaskTemplate.find('.unhcrNumber_SP').html(arrUnhcrNum[j])
    
          alert(temp);
          //alert(refugee[1]);
    
          $('#dataTemplate').append($newTaskTemplate)
    
          $newTaskTemplate.show()      
    
        } */


    /*     var count = 4;
   
       const _unhcrNum = $('#unhcrNum').val()
   
       for (k = 1; k <= refugeeCount; k++) {
   
         const $newTaskTemplate = $taskTemplate.clone()
   
         count++;
   
        // if (arrUnhcrNum[k] === _unhcrNum) {
   
           //arrUnhcrNum[k] === _unhcrNum
   
           $newTaskTemplate.find('.unhcrNumber_SP').html(arrUnhcrNum[k])
   
   
           $('#dataTemplate').append($newTaskTemplate)
   
           $newTaskTemplate.show()
         //} 
       //  else {
         //  alert("Refugee Data Not Found \nPlease Register the Refugee First")
        // }
       } */


    /* 
             for (i = 0; i <= refugee.length; i++) {
        
              $refugeeDisplay.find('.unhcrNumber').html(refugee[i])
              //$refugeeDisplay.find('.display').html(refugee[i])
        
            }  */

  },


  displayMap: async () => {

    const refugeeCount = await App.regRefugee.refugeeCount()
    const $taskTemplate = $('.mapData')

    var _country = new Array(1000);

    //var count = 4

    for (var i = 1; i <= refugeeCount; i++) {

      const refugee = await App.regRefugee.refugees(i)

      const unhcrNum = refugee[1]
      //arrUnhcrNum[i] = refugee[1]

      const fName = refugee[2]

      const lName = refugee[3]

      const sex = refugee[4]

      //const country = refugee[5]
      _country[i] = refugee[5]

      //count++

      const $newTaskTemplate = $taskTemplate.clone()

      //$newTaskTemplate.find('.unhcrNumber_SP').html(arrUnhcrNum[i])
      //$newTaskTemplate.find('.unhcrNumber_SP').html(unhcrNum)
      //$newTaskTemplate.find('.card_fName').html(fName)
      //$newTaskTemplate.find('.card_lName').html(lName)
      //$newTaskTemplate.find('.card_sex').html(sex)
      $newTaskTemplate.find('.mapCountry').html(_country[i])

      //$newTaskTemplate.find('.blockNumber').html(count)
      //alert(arrUnhcrNum[i])

      $('#mapTemplate').append($newTaskTemplate)

      $newTaskTemplate.show()



    }

    var countUS = 0
    var countKR = 0
    var countRS = 0
    var countSY = 0
    var countYN = 0

    for (var j = 1; j <= refugeeCount; j++) {
      if (_country[j] === "United States") {
        countUS++
      }
      else if (_country[j] === "Korea") {
        countKR++
      }
      else if (_country[j] === "Russia") {
        countRS++
      }
      else if (_country[j] === "Syria") {
        countSY++
      }
      else if (_country[j] === "Yaman") {
        countYN++
      }

    }

    alert(countUS)

    //let map = [...new Set(_country)];

    //alert("Hey");



  }

}

$(() => {
  $(window).load(() => {
    App.load()
  })
})
