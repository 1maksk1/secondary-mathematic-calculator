  // Your JavaScript functions here...

  function clearSteps(stepsId) {
    const stepsDiv = document.getElementById(stepsId);
    stepsDiv.innerHTML = ''; // Clear the content of the steps container
}
function clearSubtraction() {
   
    document.getElementById("subResult").innerHTML = "";
}

function clearDivision() {

    document.getElementById("divisionSteps").value = "";
}




        // Rest of your code for the calculator functions
        // ...
        function performSubtraction() {
            const num1 = document.getElementById('subNum1').value;
            const num2 = document.getElementById('subNum2').value;
            const result = subtractColumns(num1, num2);
            displayResult('subNum1', 'subNum2', 'subResult', result);
        }

        function subtractColumns(num1, num2) {
            const num1_digits = Array.from(String(num1), Number);
            const num2_digits = Array.from(String(num2), Number);

            while (num1_digits.length < num2_digits.length) {
                num1_digits.unshift(0);
            }

            let result = [];
            let borrow = 0;

            for (let i = num1_digits.length - 1; i >= 0; i--) {
                let columnResult = num1_digits[i] - num2_digits[i] - borrow;

                if (columnResult < 0) {
                    columnResult += 10;
                    borrow = 1;
                } else {
                    borrow = 0;
                }

                result.unshift(columnResult);
            }

            while (result[0] === 0 && result.length > 1) {
                result.shift();
            }

            return result.join('');
        }

        // Step-by-Step Multiplication Calculator
        function performMultiplication() {
            const num1 = document.getElementById('mulNum1').value;
            const num2 = document.getElementById('mulNum2').value;
            const [result, steps] = stepByStepMultiplication(num1, num2);
            displaySteps('mulSteps', steps);
        }

        function stepByStepMultiplication(x, y) {
            const steps = [];
            const xStr = x.toString();
            const yStr = y.toString();

            const maxLen = Math.max(xStr.length, yStr.length);

            let explanation = `Multiply\n` +
                `    ${xStr}\n` +
                `  x${yStr}\n` +
                `   ${'_'.repeat(maxLen)}\n`;

            let result = 0;

            for (let i = yStr.length - 1; i >= 0; i--) {
                let step = `    ${xStr}\n`;
                step += `  x${' '.repeat(yStr.length - 1 - i)}${yStr[i]}\n`;
                step += `   ${'_'.repeat(maxLen)}\n`;

                const product = parseInt(xStr) * parseInt(yStr[i]);

                if (product === 0) {
                    step += `   ${'0'.repeat(maxLen + 2)}\n`;
                } else {
                    step += `   ${product.toString().padStart(maxLen + 2, ' ')}\n`;
                }

                result += product * 10 ** (yStr.length - i - 1);
                explanation += step;
            }

            explanation += `   ${'_'.repeat(maxLen + 2)}\n`;
            explanation += `  ${result}\n`;

            steps.push(explanation);

            return [result, steps];
        }

        // Step-by-Step Addition Calculator
        function performAddition() {
            const num1 = document.getElementById('addNum1').value;
            const num2 = document.getElementById('addNum2').value;
            const result = addColumns(num1, num2);
            displayAdditionSteps('addSteps', num1, num2, result);
        }

        function addColumns(num1, num2) {
            const num1_digits = [...num1.toString()].map(Number);
            const num2_digits = [...num2.toString()].map(Number);

            const max_length = Math.max(num1_digits.length, num2_digits.length);

            num1_digits.unshift(0); // Add an extra column for the carry, which initially is 0
            num2_digits.unshift(0); // Add an extra column for the carry, which initially is 0

            const result_digits = [];
            let carry = 0;

            for (let i = max_length; i >= 0; i--) {
                const column_sum = num1_digits[i] + num2_digits[i] + carry;
                result_digits.unshift(column_sum % 10);
                carry = Math.floor(column_sum / 10);
            }

            return result_digits;
        }

        function displayAdditionSteps(stepsId, num1, num2, result) {
            const stepsDiv = document.getElementById(stepsId);
            stepsDiv.innerHTML = "";

            const num1_digits = [...num1.toString()].map(Number);
            const num2_digits = [...num2.toString()].map(Number);

            // Display the input numbers
            stepsDiv.innerHTML += `<p>${num1_digits.join(" ")}</p>`;
            stepsDiv.innerHTML += `<p>+ ${num2_digits.join(" ")}</p>`;
            stepsDiv.innerHTML += "<p>" + "-".repeat(2 * (Math.max(num1_digits.length, num2_digits.length)) + 1) + "</p>";
            stepsDiv.innerHTML += `<p>${result.join(" ")}</p>`;
        }

        // Division Calculator
        function divisionSteps(dividend, divisor) {
            let quotient = Math.floor(dividend / divisor);
            let remainder = dividend % divisor;
            let dividendStr = dividend.toString();
            let divisorStr = divisor.toString();
            let quotientStr = quotient.toString();
            let steps = [];

            steps.push(`${dividend} |${divisor}\n${'-'.repeat(divisorStr.length + 1)}\n${quotientStr}.`);

            for (let i = quotientStr.length + 1; i <= dividendStr.length; i++) {
                let partialDividend = parseInt(remainder.toString() + dividendStr[i - 1]);
                let stepQuotient = Math.floor(partialDividend / divisor);
                remainder = partialDividend % divisor;

                steps.push(`${' '.repeat(i - quotientStr.length - 1)}${partialDividend} |${divisor}\n${' '.repeat(i - quotientStr.length)}${'-'.repeat(divisorStr.length + 1)}\n${' '.repeat(i - quotientStr.length)}${stepQuotient}.`);
            }

            steps.push(`${' '.repeat(dividendStr.length - remainder.toString().length)}${remainder} (remainder)`);
            return steps.join('\n');
        }

        function calculateDivision() {
            const dividend = document.getElementById('dividend').valueAsNumber;
            const divisor = document.getElementById('divisor').valueAsNumber;
            const divisionStepsResult = divisionSteps(dividend, divisor);
            document.getElementById('divisionSteps').value = divisionStepsResult;
        }

        function displayResult(num1Id, num2Id, resultId, result) {
            const num1 = document.getElementById(num1Id).value;
            const num2 = document.getElementById(num2Id).value;
            const resultDiv = document.getElementById(resultId);

            resultDiv.innerHTML = `
                <p>${num1}</p>
                <p>- ${num2}</p>
                <p>${'-'.repeat(2 * Math.max(num1.length, num2.length) - 1)}</p>
                <p>${result}</p>
            `;
        }

        function displaySteps(stepsId, steps) {
            const stepsDiv = document.getElementById(stepsId);
            stepsDiv.innerHTML = "";

            steps.forEach(function (step) {
                stepsDiv.innerHTML += `<pre class="step">${step}</pre>`;
            });
        }