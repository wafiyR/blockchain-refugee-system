<?php include(functions.php) ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Refugee System</title>
    <!-- <link href="style2.css" rel="stylesheet"> -->

    <style>
        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        td,th {
        
            border: 2px solid #dddddd;
            text-align: left;
            padding: 8px;
        }
    </style>
</head>

<body>
    <h3 style="text-align: center">Latest Registered Refugee</h3>


    <div class="tableData" style="display: none">

        <label>
            <span class="unhcrNum"></span>
        </label>

<!--         <table class="tableData">
            <tr>
                <th>UNHCR Number</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Sex</th>
                <th>Country of Origin</th>
            </tr>

            <tr>
                <td class="unhcrNum"></td>
                <td class="fName"></td>
                <td class="lName"></td>
                <td class="sex"></td>
                <td class="country"></td>
            </tr>
        </table> -->

    </div>

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>

    <script src="./js/web3.min.js"></script>

    <!-- <script src="vendor/truffle-contract/dist/truffle-contract.js"></script> -->

    <script src="./js/truffle-contract.js"></script>

    <script src="tabledata.js"></script>

</body>

</html>