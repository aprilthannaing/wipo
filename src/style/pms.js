type = ['','info','success','warning','danger'];


demo = {
	showNotification: function(from, align){
    	color = Math.floor((Math.random() * 4) + 1);

    	$.notify({
        	icon: "pe-7s-gift",
        	message: "Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer."

        },{
            type: type[color],
            timer: 1000,
            placement: {
                from: from,
                align: align
            }
        });
	}
}

pms = {
	showNotification: function(from, align, message,color){

    	$.notify({
        	icon: 'fa fa-bell',
        	message: message

        },{
            type: color,
            timer: 1000,
            placement: {
                from: from,
                align: align,
            },
            offset:{
                y:120,
                x:15
            },
            allow_dismiss: false,
            
        });
	}
}