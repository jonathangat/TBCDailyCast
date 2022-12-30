// document ready
$(document).ready(function() {


    // fetch data
    let api_url = "https://script.googleusercontent.com/macros/echo?user_content_key=djvxQtI9mBHhMJ34eR3PupTB1EGoWE_hUP5j531kwv3jHh9VDHTtDGVO6OcFgnnN6-mEuecB6x2yiXWSI-8qVFvKCsy3L1tum5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNgJe5Cej5QpXntKME1HzzPF18DwR1g1OE_EavyzaRdGx5kjyLPlWT9ddoCBsxisbJctikAUYCIq0IKwhi5RD54AUOt1uM2vmtz9Jw9Md8uu&lib=M1DiwXD5nvlkjLar3N7xjR_Iw12cnwnuP";
   $.getJSON(api_url, function(data) {

        // populate date header
        $('#show_date').text(data['data']['show_date']);

        // populate cast
        $.each(data['data']['cast'], function(key, value){

            let alternative_portrait_url = "https://www.punchdrunk.com/content/uploads/2021/09/ThBurntCity_MainTitle_Transparent-Background-copy-768x775.png";

            let portrait_url = value.portrait ? value.portrait : alternative_portrait_url;
            
            let performer = `
                    <td><img src='${portrait_url}' /><h3>${value.name}</h3><h4>${value.role}</h4></td>


            `;

            $('#cast:last-child').append(performer);

        });




})});