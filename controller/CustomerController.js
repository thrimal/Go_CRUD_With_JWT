getAllCustomers();
$("#btnSaveCustomer").click(function () {
    let customerID = $("#id").val();
    let customerName = $("#name").val();
    let customerAddress = $("#address").val();
    let customerContact = $("#contact").val();
    let customerPassword = $("#password").val();

    $.ajax({
        method: 'POST',
        url: "http://localhost:3500/api/v1/fiber",
        contentType: "application/json",
        async: true,
        data: JSON.stringify({
            id: customerID,
            name: customerName,
            address: customerAddress,
            contact: customerContact,
            password: customerPassword
        }),
        success: function (data) {
            alert("Successfully Added...");
            getAllCustomers();
        },
        error: function (ob, txtStatus, error) {
            console.log(error);
            console.log(txtStatus);
            console.log(ob);
        }
    });
});

$("#btnUpdateCustomer").click(function () {
    let customerID = $("#id").val();
    let customerName = $("#name").val();
    let customerAddress = $("#address").val();
    let customerContact = $("#contact").val();
    let customerPassword = $("#password").val();
    $.ajax({
        method: "GET",
        async: true,
        url: "http://localhost:3500/api/v1/fiber/" + customerID,
        success: function (res) {
            console.log(res);
            if (res.id === customerID) {
                $.ajax({
                    method: 'PUT',
                    url: "http://localhost:3500/api/v1/fiber/" + customerID,
                    contentType: "application/json",
                    async: true,
                    data: JSON.stringify({
                        name: customerName,
                        address: customerAddress,
                        contact: customerContact,
                        password: customerPassword
                    }),
                    success:function (){
                        alert("Customer Updated...")
                        getAllCustomers();
                    },
                    error: function (ob, txtStatus, error) {
                        console.log(error);
                        console.log(txtStatus);
                        console.log(ob);
                    }
                });
            } else {
                alert("sorry!Customer Not found")
            }

        },
        error: function (ob, txtStatus, error) {
            console.log(error);
            console.log(txtStatus);
            console.log(ob);
        }
    });
});

function getAllCustomers() {
    $("#tblCustomer").empty();
    $.ajax({
        url: 'http://localhost:3500/api/v1/fiber',
        method: 'GET',
        async: true,

        success: function (data, textState, xhr) {
            for (var customer of data) {
                console.log(customer);
                let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td></tr>`;
                $("#tblCustomer").append(row);
            }
        },
        error: function (ob, txtStatus, error) {
            console.log(error);
            console.log(txtStatus);
            console.log(ob);
        }
    });
}

//Delete Customer
$("#btnDeleteCustomer").click(function () {
    let id = $("#id").val();

    $.ajax({
        method: "DELETE",
        url: "http://localhost:3500/api/v1/fiber/" + id,
        contentType: 'application/json',
        success: function (res) {
            alert("Customer Removed...");
            getAllCustomers();
        },
        error: function (ob, txtStatus, error) {
            console.log(error);
            console.log(txtStatus);
            console.log(ob);
        }
    });
});
/*----------Search Customer---------------------------*/
$("#btnGetCustomer").click(function () {
    let id = $("#id").val();
    $.ajax({
        method: "GET",
        async: true,
        url: "http://localhost:3500/api/v1/fiber/" + id,
        success: function (res) {
            console.log(res);
            if (res.id === id) {
                $("#name").val(res.name);
                $("#address").val(res.address);
                $("#contact").val(res.contact);
                $("#password").val(res.password);
            } else {
                alert("sorry!Customer Not found")
            }

        },
        error: function (ob, txtStatus, error) {
            console.log(error);
            console.log(txtStatus);
            console.log(ob);
        }
    });
});



// $("#btnSaveCustomer").click(function (event) {
//     let id = $("#cus_id").val();
//     let name = $("#cus_name").val();
//     let nic = $("#cus_nic").val();
//     let contact = $("#cus_contact_number").val();
//     let address = $("#cus_address").val();
//     //stop submit the form, we will post it manually.
//     event.preventDefault();
//
//     // Get form
//     var form = $('form').get(0);
//
//     // Create an FormData object
//     var data = new FormData(form);
//     //var data = new FormData(document.getElementById("btnImgUp"));
//     console.log("datas");
//
//     // // If you want to add an extra field for the FormData
//     data.append("cus_id",id);
//     data.append("cus_name",fullname);
//     data.append("cus_nic",nic);
//     data.append("cus_contact_number",contact);
//     data.append("cus_address",address);
//
//     // disabled the submit button
//
//     $.ajax({
//         type: "POST",
//         enctype: 'application/json',
//         url: "http://localhost:3000/api/v1/fiber",
//         processData: false,
//         contentType: "application/json",
//         cache: false,
//         timeout: 600000,
//         data:JSON.stringify({
//             "id":"id",
//             "name":"name"
//         }),
//         success: function (data) {
//             console.log("SUCCESS : ", data);
//             $("#btnImgUp").prop("disabled", false);
//         },
//         error: function (e) {
//             console.log("ERROR : ", e);
//             $("#btnImgUp").prop("disabled", false);
//
//         }
//     });
//
// });
