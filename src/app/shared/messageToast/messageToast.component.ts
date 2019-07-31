
declare var $:any;

export class MessageToast{
    showMessage(message){
        var type = ['','info','success','warning','danger'];

        var color = Math.floor((Math.random() * 4) + 1);

    	$.notify({
        	icon: "ti-face-smile",
        	message: message
        },{
            type: type[color],
            timer: 4000,
            placement: {
                from: 'top',
                align: 'right'
            }
        });
    }

    showMessageSuccess(message){
        var type = ['','info','success','warning','danger'];

        var color = Math.floor((Math.random() * 4) + 1);

    	$.notify({
        	icon: "ti-face-smile",
        	message: message
        },{
            type: type[2],
            timer: 4000,
            placement: {
                from: 'top',
                align: 'right'
            }
        });
    }


    showErrorMessage(message){
        var type = ['','info','success','warning','danger'];

        var color = Math.floor((Math.random() * 4) + 1);

    	$.notify({
        	icon: "ti-face-sad",
        	message: message
        },{
            type: type[4],
            timer: 4000,
            placement: {
                from: 'top',
                align: 'right'
            }
        });
    }
}
