//-----------------Creating Angular Service--------------
//When you’re using Service, it’s instantiated with the ‘new’ keyword. 
//Because of that, you’ll add properties to ‘this’ and the service will return ‘this’. 
//When you pass the service into your controller, 
//those properties on ‘this’ will now be available on that controller through your service.
app.service("ServiceHitCounter", function () {
    // Creating  Global instance of Hit counter
    var hitCounter = 0;
     this.HitMe = function () {
        hitCounter++;
        return hitCounter;
    };
});

