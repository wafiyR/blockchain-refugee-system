Data = {

    contracts: {},

    load: async () => {
        await ApDatap.loadWeb3()
        await Data.loadAccount()
        await Data.loadContract()
        await Data.render()
    },

    // load Web3
    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
            Data.web3Provider = web3.currentProvider
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
            Data.web3Provider = web3.currentProvider
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
        Data.account = web3.eth.accounts[0]
    },

    loadContract: async () => {
        // Create a JavaScript version of the smart contract
        const regRefugee = await $.getJSON('Register.json')
        Data.contracts.Register = TruffleContract(regRefugee)
        Data.contracts.Register.setProvider(Data.web3Provider)

        // Hydrate the smart contract with values from the blockchain
        Data.regRefugee = await Data.contracts.Register.deployed()
    },

    render: async () => {

        // load the total number of refugees
        const refugeeCount = await Data.regRefugee.refugeeCount()
        const $taskTemplate = $('.tableData')

        var refugeeId = refugeeCount.toNumber()

        const refugee = await Data.regRefugee.refugees(refugeeId)

        const _unhcrNum = refugee[1]

        const _fName = refugee[2]
  
        const _lName = refugee[3]
  
        const _sex = refugee[4]
  
        const _country = refugee[5]

        const $newTaskTemplate = $taskTemplate.clone()
        $newTaskTemplate.find('.unhcrNum').text(_unhcrNum)
        $newTaskTemplate.find('.fName').text(_fName)
        $newTaskTemplate.find('.lName').text(_lName)
        $newTaskTemplate.find('.sex').text(_sex)
        $newTaskTemplate.find('.country').text(_country)
  
        $newTaskTemplate.show()


    }

}

$(() => {
    $(window).load(() => {
        Data.load()
    })
})