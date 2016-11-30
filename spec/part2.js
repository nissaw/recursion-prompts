/* jshint esversion: 6 */

(function() {
  'use strict';

  describe('More Exercises in Recursion', function() {

    describe('37. Count Tags', function() {
      var originalTagCount, actualResults, expectedResults, htmlString, tags, $rootElement;

      before(function() {
        originalTagCount = tagCount;
        tagCount = sinon.spy(tagCount);
        actualResults = [];
        expectedResults = [];
        $rootElement = $('<p><div><div><p><span>yay</span></p></div><p>poop</p></div></p>');
        $('body').append($rootElement);
      });

      after(function() {
        $rootElement.remove();
        tagCount = originalTagCount;
      });

      it('should return a number', function() {
        actualResults.push(tagCount('p'));
        expectedResults.push(document.getElementsByTagName('p').length);
        expect(actualResults[0]).to.be.a('number');
      });

      it('should return number of times of tag occurs on node', function(){
        actualResults.push(tagCount('div'));
        expectedResults.push(document.getElementsByTagName('div').length);
        expect(actualResults[1]).to.equal(expectedResults[1]);
      });

      it('should support various tag types', function() {
        actualResults.push(tagCount('span'));
        expectedResults.push(document.getElementsByTagName('span').length);
        actualResults.forEach(function(result, i) {
          expect(result).to.equal(expectedResults[i]);
        });
      });

      it('should use recursion by calling self', function () {
        expect(tagCount.callCount).to.be.above(3);
      });

    });



    describe('38. Binary Search', function() {
      var input1 = [1,2,3,4,5,6];
      var input2 = [1,2,3,4,5,6,7];
      var primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97];

      it('should return a number', function() {
        expect(binarySearch(input1, 3)).to.be.a('number');
      });

      it('should not mutate the input array', function() {
        var result = binarySearch(input1, 4);
        expect(input1).to.eql([1,2,3,4,5,6]);
      });

      it('should return null if target not found', function() {
        expect(binarySearch(input1, 7)).to.eql(null);
        expect(binarySearch(input2, 8)).to.eql(null);
        expect(binarySearch(primes, 32)).to.eql(null);
      });

      it('should return index of target', function() {
        expect(binarySearch(input1, 1)).to.eql(0);
        expect(binarySearch(input1, 2)).to.eql(1);
        expect(binarySearch(input1, 3)).to.eql(2);
        expect(binarySearch(input1, 4)).to.eql(3);
        expect(binarySearch(input1, 5)).to.eql(4);
        expect(binarySearch(input1, 6)).to.eql(5);
        expect(binarySearch(input2, 1)).to.eql(0);
        expect(binarySearch(input2, 2)).to.eql(1);
        expect(binarySearch(input2, 3)).to.eql(2);
        expect(binarySearch(input2, 4)).to.eql(3);
        expect(binarySearch(input2, 5)).to.eql(4);
        expect(binarySearch(input2, 6)).to.eql(5);
        expect(binarySearch(input2, 7)).to.eql(6);
        expect(binarySearch(primes, 2)).to.eql(0);
        expect(binarySearch(primes,19)).to.eql(7);
        expect(binarySearch(primes,41)).to.eql(12);
        expect(binarySearch(primes,59)).to.eql(16);
        expect(binarySearch(primes,97)).to.eql(24);
      });

      it('should use recursion by calling self', function () {
        var originalBinarySearch = binarySearch;
        binarySearch = sinon.spy(binarySearch);
        binarySearch(primes, 19);
        expect(binarySearch.callCount).to.be.above(1);
        binarySearch = originalBinarySearch;
      });

    });



    describe('39. Merge Sort', function() {
      var numbers;

      beforeEach(function() {
        numbers = [8,2,20,1,15];
      });

      it('should return an array', function() {
        var sortedNumbers = mergeSort(numbers);
        expect(sortedNumbers).to.be.an('array');
      });

      it('should not mutate the input array', function() {
        var sortedNumbers = mergeSort(numbers);
        expect(numbers).to.eql([8,2,20,1,15]);
      });

      it('should sort an array of numbers in order of least to greatest', function() {
        expect(mergeSort([])).to.eql([]);
        expect(mergeSort([0])).to.eql([0]);
        expect(mergeSort([1,0])).to.eql([0,1]);
        expect(mergeSort([0,1,2,3])).to.eql([0,1,2,3]);
        expect(mergeSort([5,4,3,2,1])).to.eql([1,2,3,4,5]);
        expect(mergeSort([10,1,8,5,0])).to.eql([0,1,5,8,10]);
        expect(mergeSort([8,2,20,1,15])).to.eql([1,2,8,15,20]);
      });

      it('should be able to handle negative numbers', function() {
        expect(mergeSort([-1])).to.eql([-1]);
        expect(mergeSort([0,-1])).to.eql([-1,0]);
        expect(mergeSort([0,1,-2,-3])).to.eql([-3,-2,0,1]);
        expect(mergeSort([8,-2,20,1,-15])).to.eql([-15,-2,1,8,20]);
        expect(mergeSort([0,-1,-2,-3,-4,-5,-10])).to.eql([-10,-5,-4,-3,-2,-1,0]);
      });

      it("should not use the native Array sort method", function() {
        // Spying on Array.prototype.sort in testSupport.js
        mergeSort(numbers);
        expect(Array.prototype.sort.called).to.equal(false);
      });

      it('should use recursion by calling self', function () {
        var originalMergeSort = mergeSort;
        mergeSort = sinon.spy(mergeSort);
        mergeSort(numbers);
        expect(mergeSort.callCount).to.be.above(1);
        mergeSort = originalMergeSort;
      });

    });

  });

}());
