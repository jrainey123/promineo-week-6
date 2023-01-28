var expect = chai.expect;

describe('#numberOfRounds', function(){
    it('should calculate number of rounds equal to 26', function(){
        expect(numberOfRounds()).to.equal(26);
    })
})