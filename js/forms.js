$(document).ready(function () {
    let currentStep = 1;

    function showStep(stepNumber) {
        $(".step").removeClass("active");
        $("#step-" + stepNumber).addClass("active");
        currentStep = stepNumber;
    }

    $(".next-step").on("click", function () {
        const nextStep = $(this).data("next");

        if (currentStep === 1) {
            if (!validateInviteCode()) {
                $('#alert-wrapper').html(alert_markup('danger', '<strong>Sorry!</strong> Your invite code is incorrect.'));
                return; // Stop if invite code is wrong
            }
            $('#alert-wrapper').html('');
        }

        showStep(nextStep.split('-')[1]);

    });

    $(".prev-step").on("click", function () {
       const prevStep = $(this).data("prev");
        showStep(prevStep.split('-')[1]);

    });

    $('#rsvp-form').on('submit', function (e) {
        e.preventDefault();
         $('#alert-wrapper').html(alert_markup('info', '<strong>Just a sec!</strong> We are saving your details.'));
       const formData = $(this).serializeArray();
        const data = {};
        formData.forEach(item => {
            data[item.name] = item.value;
        });
          // Guardar los datos en la hoja de cálculo de Google
            $.ajax({
                url: 'https://script.google.com/macros/s/AKfycbxbX86q5cK9sWb6_M-6tE102b6gW-kH4w77tP7x6nN0K0W-n36j7H7/exec',
               method: "POST",
                data: data,
                success: function(response){
                     if (response.result === "error") {
                          $('#alert-wrapper').html(alert_markup('danger', response.message));
                     } else {
                        $('#rsvp-form').hide();
                        $('#rsvp-message').show();
                        $('#alert-wrapper').html('');
                    }
                },
                 error: function(){
                         $('#alert-wrapper').html(alert_markup('danger', '<strong>Sorry!</strong> There is some issue with the server. '));
                     }
            });
    });

      function validateInviteCode() {
        const inviteCode = $("#invite_code").val();
        const validCodes = ['1234', '5678']; // Replace with your actual codes
        return validCodes.includes(inviteCode);
    }
});