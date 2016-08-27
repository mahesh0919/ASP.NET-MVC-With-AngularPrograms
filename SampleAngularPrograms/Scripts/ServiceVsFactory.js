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

//-----------Creating Angular Factory----------
//When you’re using a Factory you create an object, add properties to it, then return that same object. 
//When you pass this service into your controller, 
//those properties on the object will now be available in that controller through your factory.
app.factory('FactoryHitCounter', function () {
    var fac = {};
    fac.hitCounter = 0;
    fac.HitMe = function () {
        fac.hitCounter++;
        return fac.hitCounter;
    };
    return fac;
});
