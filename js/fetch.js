// document ready
$(document).ready(function() {

    // adjust body dimensions
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);





    // fetch data
    let api_url = "https://script.google.com/macros/s/AKfycbzGUnqdtZm5bZOvMlygWUSH0dD3YANaH4hq8Ol37K97xuI9M3CCsvtsG99Rp2JLGI4k/exec";
   $.getJSON(api_url, function(data) {

        let numOfDailyShows = data.data.length;
        let alternative_portrait_url = "https://www.punchdrunk.com/content/uploads/2021/09/ThBurntCity_MainTitle_Transparent-Background-copy-768x775.png";

        if (numOfDailyShows == 0) {
            // add selection menu
            $('<div id="error_msg"></div>').insertBefore('.disclaimer');
            // add title
            $('#error_msg').append('<h2>Error: The Service is Unavailable at this Moment.</h2>')

        }

        else if (numOfDailyShows > 1) {

            // add selection menu
            $('<div id="selection_menu"></div>').insertBefore('.disclaimer');
            // add title
            $('#selection_menu').append('<h2 id="select_performance">Select Performance</h2>')

            // iterate over the performances
            for (let i = 0; i < numOfDailyShows; i++){

                // get performance
                let performance = data.data[i];

                // add button
                $('#selection_menu').append(`<span class="btn_span"><a href ="#" id="btn_show_${i}" class="button1">${performance.performance_date}</a></span>`);

                // add headshots container
                $(`<div id="container_show_${i}" class="table_scroll"><table id="table_show_${i}"></table></div>`).insertBefore('.disclaimer');

                // populate headshots
                let row = "<tr>";

                for (let j = 0; j < performance.cast.length; j++) {

                    let performer_obj = performance.cast[j];
                    let headshot_url = performer_obj.headshot ? performer_obj.headshot : alternative_portrait_url;
                    row += `<td><img src='${headshot_url}' alt='${performer_obj.name}' /><h3>${performer_obj.name}</h3><h4>${performer_obj.character}</h4></td>`

    
                }
                row += '</tr>'

                $(`#table_show_${i}`).append(row);

            }

            $('#selection_menu').append(`<span class="btn_span"><a href ="#" id="btn_back" class="button1">Back</a><br /></span>`);

            // add event listener to back button
            $('#btn_back').click(function () {
                $('.table_scroll').css("display","none");
                $(this).css("display","none");
                $('#select_performance').text('Select Performance');
                let current_btn_id = $(this).attr('id');
                let ids = [];
                $('.button1').each(function () {

                    let candidate_id = $(this).attr('id');
                    if (candidate_id != current_btn_id) {
                        ids.push('#' + candidate_id)
                    }

                    
                });
                $(ids.join(',')).css("display","inline-block");
            });


            // add event listener to performance button
            $('.button1').click(function () {
                let btn_attr = $(this).attr('id');
                if (btn_attr != 'btn_back') {
                    
                    $('#select_performance').text($(this).text());
                    $('#btn_back').css("display","inline-block");
                    $(`#container_show_${btn_attr.substr(btn_attr.length - 1)}`).css("display","block");
                    let ids = [];
                    $('.button1').each(function () {
    
                        let candidate_id = $(this).attr('id');
                        if (candidate_id != 'btn_back') {
                            ids.push('#' + candidate_id)
                        }
    
                        
                    });
                    $(ids.join(',')).css("display","none");



                }
            });

        }

        else {

            // get performance data
            let performance = data.data[0];

            // add selection menu
            $('<div id="show_date"></div>').insertBefore('.disclaimer');
            // add title
            $('#show_date').append(`<h2 id="select_performance">${performance.performance_date}</h2>`)

            // add headshots container
            $(`<div id="container_show" class="table_scroll"><table id="table_show"></table></div>`).insertBefore('.disclaimer');

            // populate headshots
            let row = "<tr>";

            for (let j = 0; j < performance.cast.length; j++) {

                let performer_obj = performance.cast[j];
                let headshot_url = performer_obj.headshot ? performer_obj.headshot : alternative_portrait_url;
                row += `<td><img src='${headshot_url}' alt='${performer_obj.name}' /><h3>${performer_obj.name}</h3><h4>${performer_obj.character}</h4></td>`


            }
            row += '</tr>'


            $(`#table_show`).append(row);

            // display
            $('#container_show').css('display', 'block');



        };

        // hide spinner
        $('#spinner').css("display","none");







})});