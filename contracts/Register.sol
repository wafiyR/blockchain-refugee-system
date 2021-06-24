pragma solidity >=0.4.21 <0.6.0;

contract Register {

    uint public refugeeCount = 0;  //change to 4, as in block number, first data is stored in block 5, refugeeCount++

/*     string _unhcrNum;
    string _fName;
    string _lName;
    string _sex;
    string _country; */

    struct Refugee {

        //address ethAddress;
        uint id;
        string unhcrNum;
        string fName;
        string lName;
        string sex;
        string country;

    }
    
    // mapping (address => Refugee) public refugees;
    mapping (uint => Refugee) public refugees;
    //address[] public refugeeAccts;
    
    event refugeeInfo(

       //address ethAddress, 
       uint id,
       string unhcrNum,
       string fName,
       string lName,
       string sex,
       string country
    );
    
    // function setRefugee(address _ethAddress, string _unhcrNum, string _fName, string _lName, string _sex, string _country) public {
    function setRefugee(string _unhcrNum, string _fName, string _lName, string _sex, string _country) public {
        
        //address refugee = refugees[_address];
        
        //refugee.fName = _fName;
        //refugee.lName = _lName;

        //refugees[msg.sender].ethAddress = _address;

        //refugees[_ethAddress].ethAddress = _ethAddress;

        refugeeCount ++;

        refugees[refugeeCount] = Refugee(refugeeCount, _unhcrNum, _fName, _lName, _sex, _country);

/*         refugees[refugeeCount].unhcrNum = _unhcrNum;

        refugees[refugeeCount].fName = _fName;
        
        refugees[refugeeCount].lName = _lName;

        refugees[refugeeCount].sex = _sex;

        refugees[refugeeCount].country = _country; */


       // refugeeAccts.push(msg.sender) - 1;
       // emit refugeeInfo(_address, _fName, _lName);
        // emit refugeeInfo(_ethAddress,_unhcrNum,_fName,_lName,_sex,_country);  
        emit refugeeInfo(refugeeCount,_unhcrNum,_fName,_lName,_sex,_country);  
   
    }
    
/*     function getRefugees() view public returns(address[]) {
        return refugeeAccts;
    }  */   
    
/*     function getDetails() public constant returns (string, string, string, string, string){
        return(_unhcrNum, _fName, _lName, _sex, _country);
    } */
    
}

