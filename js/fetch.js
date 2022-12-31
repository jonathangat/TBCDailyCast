// document ready
$(document).ready(function() {


    // fetch data
    let api_url = "https://script.google.com/macros/s/AKfycbyu4pDfnc9Vn4sVe7k9D1i8cJOQFgtF5L7deE7LuqU7lDbzQvK3yGF-1FJ3p1JXkXhjpA/exec";
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

        // hide and show elements
        $('#spinner').css("display","none");
        $('#show_date').css("display","block");
        $('#table_scroll').css("display","block");







})});