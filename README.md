# blockchain-refugee-system
Secure Cross Country Refugee Validation System with Blockchain

Secure Cross Country Refugees Validation System using Blockchain is a Website Application developed for country border's officers to register the refugees's information while avoiding any fraud data. This system will also allow any users to check whether the refugees have been registered in the system or not. The system focuses on Blockchain with the idea of developing an anti-fraud registration.

The following are the objective of the project:

1) To deal with inefficient transactions in countries that are hosting asylum seekers in transit and the economic flow back to home countries.
2) To reduce costs and the risks of sharing refugees’ data.
3) To provide legal identity to all, including birth registration.
4) To help to digitize identity and other essential documents.

Project significance:

1) To store the refugees documents such as birth certificates, marriage licenses, passports and identity cards in Blockchain.
2) Capable of recording transactions securely, blockchain offers enhanced transparency and collaboration between governments, businesses and citizens.
3) To make Blockchain in restoring the identity of the refugees.

Software Requirements:

1) Ganache
2) Truffle
3) Metamask

Modules:

1) Administration Login:

![image](https://user-images.githubusercontent.com/62368837/133061089-8118c5ce-8b66-4c8d-99a3-138756caeb0b.png)

The administration login page will need the admin to insert their credentials, such as username/userid and the password, in order to log in to the system.

2) Searching Refugee's Data:

![image](https://user-images.githubusercontent.com/62368837/133061340-b80cea60-a701-430d-b11a-491c7dc19052.png)

The administrator need to insert the UNHCR number, in order to search the data of the refugees in the Blockchain, and validate their registration. Once submitted, it will display the block number and the UNHCR number, which indicates that the refugee has been registered.

![image](https://user-images.githubusercontent.com/62368837/133061564-e56e6895-8930-4ed1-bc8e-28e8160f06a0.png)
Refugee's Information in Ganache

If the refugees had already been registered in the system, the block number and UNHCR number of the refugee will be displayed on the web page. With the block number, the
admin need to insert it in Ganache, in order to view the details of the refugees as shown in above figure.

3) Refugee's Information Registration:

![image](https://user-images.githubusercontent.com/62368837/133061785-b5e65478-e02e-4854-80bf-10790bbf639f.png)

The page will need the admin to enter the required details of the refugees, in order to register them into the system. Once submitted, Metamask will popped up on the web page, and ask for the confirmation of the transaction.

The core development for this project is the smart contract. Smart contracts are written in Solidity language.

A smart contract is a computer program or a transaction protocol which is intended to automatically execute, control or document legally relevant events and actions according to the terms of a contract or an agreement. (Wikipedia)

Once the smart contract had been deployed, then it will pass the refugee’s details of user inputs, into Ganache.

4) Generate Refugee's UNHCR cards:

![image](https://user-images.githubusercontent.com/62368837/133062333-c5336e5c-e7b4-44e0-a4e0-ee9edcaca91e.png)

A template of the UNHCR card will be generated on the web page. Once the refugees had been registered, the details of the newly registered refugee will be retrieved from the Ganache, then they are displayed on the UNHCR card template, as show on figure above.

5) Displaying Map of Country's Name and Refugee's Population Density:

![image](https://user-images.githubusercontent.com/62368837/133062630-7a854a89-3ccc-451f-b867-ff2173195afc.png)

The map is displayed by using JavaScript and GeoChart. The module will display the origin country of the registered refugees, together with the population density of the registered refugees.

6) Generating Refugees' Data in QR Codes:

![image](https://user-images.githubusercontent.com/62368837/133062766-6adce492-2587-4d3c-a7be-cec7030e351d.png)

The figure above shows the QR code, that stores the UNHCR card details of specific refugees. Each QR codes will be uniquely generated, which each of them will store the UNHCR card details for specific refugees.

![image](https://user-images.githubusercontent.com/62368837/133062916-a93da317-932e-4b3a-a27d-0721ad09d4f9.png)
Displaying UNHCR cards on smartphone.

Once the QR code had been scanned, it will bring the users to the website, that will show the UNHCR card details in PDF format.
