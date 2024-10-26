$(function () {
    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // Handle errors here
            StylePropertyMap(errors);
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();
            // Get the button element
            const submitBtn = document.getElementById('sendMessageButton');
            
            // Add spinner classes and disable button
            const spinnerIcon = document.createElement('i');
            spinnerIcon.classList.add('fa', 'fa-spinner', 'fa-spin');    
            
            submitBtn.textContent = ''; // Clear existing text inside the button
            submitBtn.appendChild(spinnerIcon); // Add spinner icon to the button

            var name = $("input#name").val();
            var email = $("input#email").val();
            var message = $("textarea#message").val();

            $this = $("#sendMessageButton");
            $input = $("input");
            $text = $("textarea");
            $this.prop("disabled", true);
            $input.prop("disabled", true);
            $text.prop("disabled", true);

            $.ajax({
                // url: "mail/contact.php",
                url: "https://formsubmit.co/ajax/mails@subeesh.me",
                type: "POST",
                dataType: "json",
                data: {
                    name: name,
                    email: email,
                    message: message
                },
                cache: false,
                success: function () {
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
                    $('#success > .alert-success').append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success').append('</div>');
                    $('#contactForm').trigger("reset");
                },
                error: function () {
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
                    $('#success > .alert-danger').append($("<strong>").text("Sorry " + name + ", it seems that our mail server is not responding. Please try again later!"));
                    $('#success > .alert-danger').append('</div>');
                    $('#contactForm').trigger("reset");
                },
                complete: function () {
                    setTimeout(function () {
                        submitBtn.removeChild(spinnerIcon);
                        submitBtn.textContent = 'Send Message';
                        $this.prop("disabled", false);
                        $input.prop("disabled", false);
                        $text.prop("disabled", false);
                    }, 1000);
                }
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#name').focus(function () {
    $('#success').html('');
});
