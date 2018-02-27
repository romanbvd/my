function IpHelper(){

}

// convert the ip address to a decimal
// assumes dotted decimal format for input
IpHelper.convertIpToDecimal = function(ip) {
    // a not-perfect regex for checking a valid ip address
    // It checks for (1) 4 numbers between 0 and 3 digits each separated by dots (IPv4)
    // or (2) 6 numbers between 0 and 3 digits each separated by dots (IPv6)
    var ipAddressRegEx = /^(\d{0,3}\.){3}.(\d{0,3})$|^(\d{0,3}\.){5}.(\d{0,3})$/;
    var valid = ipAddressRegEx.test(ip);
    if (!valid) {
        return false;
    }
    var dots = ip.split('.');
    // make sure each value is between 0 and 255
    for (var i = 0; i < dots.length; i++) {
        var dot = dots[i];
        if (dot > 255 || dot < 0) {
            return false;
        }
    }
    if (dots.length == 4) {
        // IPv4
        return ((((((+dots[0])*256)+(+dots[1]))*256)+(+dots[2]))*256)+(+dots[3]);
    } else if (dots.length == 6) {
        // IPv6
        return ((((((((+dots[0])*256)+(+dots[1]))*256)+(+dots[2]))*256)+(+dots[3])*256)+(+dots[4])*256)+(+dots[5]);
    }
    return false;
}

module.exports = IpHelper;