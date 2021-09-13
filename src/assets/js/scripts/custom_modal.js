var custom_modal_open = false;


/*
    Modals
    ajouter la class .open_modal sur btn 
    ajouter la class .close_modal sur btn close
    ajouter data-control avec #mamodal sur la modal
    ajouter data-action avec #monbouton_to_save sur la modal si necessaire 
*/
$(".open_modal").on("click",function(){

    var modalid = $(this).data("control");
    var modalid_action = $(this).data("action");/* if action (save for exemple)*/
    var btn_focus = $(this);
    var status= $(this).attr("aria-expanded");
    if(status=="false"){
        $(modalid).addClass("active");
        $("#body").addClass("view_modal");
        $(modalid).children(".close_modal").focus();
        $(this).attr("aria-expanded","true");
        /* close modal*/
        $(".close_modal").on("click",function(){
            $(modalid).removeClass("active");
            btn_focus.attr("aria-expanded","false");
            btn_focus.focus();
            $("#body").removeClass("view_modal");
        });
        /* key actions */
        $(document).keyup(function(e) {
            console.log(e.keyCode);
            if (e.keyCode === 13){ // enter
                $(modalid_action).focus();
                $(modalid_action).trigger( "click" ); 
                console.log("save1" + modalid_action);    
            } 
            if (e.keyCode === 27){ // esc
                btn_focus.focus();   
                $(modalid).children(".close_modal").trigger( "click" );
                btn_focus.attr("aria-expanded","false");
                $(modalid).removeClass("active");
            } 
        });

    }else{
        $(this).attr("aria-expanded","false");
        $("#body").removeClass("view_modal");
        $(modalid).removeClass("active");
        btn_focus.focus();
    }

    
});




