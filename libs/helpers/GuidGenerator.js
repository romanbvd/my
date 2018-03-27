function GuidGenerator(){

}

GuidGenerator.S4 = function(){
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
};

GuidGenerator.guid = function() {
    return (GuidGenerator.S4()+GuidGenerator.S4()+"-"+GuidGenerator.S4()+"-"+GuidGenerator.S4()+"-"+GuidGenerator.S4()+"-"+GuidGenerator.S4()+GuidGenerator.S4()+GuidGenerator.S4());
};


module.exports = GuidGenerator;