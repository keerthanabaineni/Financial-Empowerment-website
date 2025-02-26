function calculateBudget() {
    let income = document.getElementById("income").value;
    let expenses = document.getElementById("expenses").value;

    // Validate input fields
    if (income === "" || expenses === "") {
        document.getElementById("budgetResult").innerText = "Please enter both income and expenses.";
        return;
    }

    // Convert input values to numbers
    income = parseFloat(income);
    expenses = parseFloat(expenses);

    // Check if values are valid numbers
    if (isNaN(income) || isNaN(expenses)) {
        document.getElementById("budgetResult").innerText = "Enter valid numeric values.";
        return;
    }

    let savings = income - expenses;

    // Display the savings result
    document.getElementById("budgetResult").innerText = `Your savings: ₹${savings.toFixed(2)}`;
}



function calculateSIP() {
    let amount = parseFloat(prompt("Enter monthly investment amount:"));
    let rate = parseFloat(prompt("Enter annual interest rate (in %):")) / 100 / 12;
    let months = parseInt(prompt("Enter investment duration in months:"));

    if (isNaN(amount) || isNaN(rate) || isNaN(months) || months <= 0) {
        alert("Please enter valid numbers.");
        return;
    }

    let futureValue = amount * ((Math.pow(1 + rate, months) - 1) / rate) * (1 + rate);
    alert(`Future Value of SIP: ₹${futureValue.toFixed(2)}`);
}

function calculateEMI() {
    let principal = parseFloat(prompt("Enter loan amount:"));
    let rate = parseFloat(prompt("Enter annual interest rate (in %):")) / 100 / 12;
    let months = parseInt(prompt("Enter loan tenure in months:"));

    if (isNaN(principal) || isNaN(rate) || isNaN(months) || months <= 0) {
        alert("Please enter valid numbers.");
        return;
    }

    let emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    alert(`Monthly EMI: ₹${emi.toFixed(2)}`);
}

function analyzeInvestment() {
    let canvas = document.getElementById("investmentChart");
    if (!canvas) {
        alert("Chart canvas not found!");
        return;
    }

    let ctx = canvas.getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May"],
            datasets: [{
                label: "Investment Growth (₹)",
                data: [10000, 12000, 15000, 18000, 22000],
                borderColor: "#ff69b4",
                fill: false
            }]
        }
    });
}
let investments = [];

function addInvestment() {
    let type = document.getElementById("investmentType").value;
    let amount = document.getElementById("investmentAmount").value;
    let risk = document.getElementById("riskLevel").value;

    if (type && amount) {
        investments.push({ type, amount: parseFloat(amount), risk });
        displayInvestments();
    }
}

function displayInvestments() {
    let list = document.getElementById("investmentList");
    list.innerHTML = "";
    investments.forEach((inv, index) => {
        list.innerHTML += `<li>${inv.type} - $${inv.amount} (${inv.risk} risk) 
            <button onclick="removeInvestment(${index})">Remove</button></li>`;
    });
}

function removeInvestment(index) {
    investments.splice(index, 1);
    displayInvestments();
}

function analyzeInvestments() {
    if (investments.length === 0) {
        document.getElementById("investmentResult").innerText = "Please add at least one investment for analysis.";
        return;
    }

    let total = investments.reduce((sum, inv) => sum + inv.amount, 0);
    let lowRisk = investments.filter(inv => inv.risk === "low").reduce((sum, inv) => sum + inv.amount, 0);
    let mediumRisk = investments.filter(inv => inv.risk === "medium").reduce((sum, inv) => sum + inv.amount, 0);
    let highRisk = investments.filter(inv => inv.risk === "high").reduce((sum, inv) => sum + inv.amount, 0);

    let result = `Total Investment: $${total}\n
                  Low Risk: $${lowRisk} (${((lowRisk / total) * 100).toFixed(2)}%)\n
                  Medium Risk: $${mediumRisk} (${((mediumRisk / total) * 100).toFixed(2)}%)\n
                  High Risk: $${highRisk} (${((highRisk / total) * 100).toFixed(2)}%)\n`;

    document.getElementById("investmentResult").innerText = result;
}
/* financial planning */
function calculatePlan() {
    let incomeInput = document.getElementById("incomePlan").value.trim();
    let expensesInput = document.getElementById("expensesPlan").value.trim();
    let savingsGoalInput = document.getElementById("savingsGoal").value.trim();

    // Convert input values to numbers
    let income = parseFloat(incomeInput);
    let expenses = parseFloat(expensesInput);
    let savingsGoal = parseFloat(savingsGoalInput);

    // Check if inputs are valid numbers
    if (isNaN(income) || isNaN(expenses) || isNaN(savingsGoal) || income <= 0 || expenses < 0 || savingsGoal < 0) {
        document.getElementById("planResult").innerHTML = "<p style='color:red;'>⚠ Please enter valid positive numbers for all fields.</p>";
        return;
    }

    let savings = income - expenses;
    let advice = "";

    if (savings > 0) {
        let monthsRequired = (savingsGoal / savings).toFixed(1);
        advice = `<p>✅ You are saving <strong>${savings}</strong> per month.<br>  
                  🎯 It will take approximately <strong>${monthsRequired}</strong> months to reach your savings goal.</p>`;
    } else if (savings === 0) {
        advice = `<p>⚠ Your expenses are equal to your income. Try to reduce unnecessary expenses or increase your earnings.</p>`;
    } else {
        advice = `<p>❌ Your expenses are higher than your income! Consider cutting down on non-essential spending or looking for additional income sources.</p>`;
    }

    document.getElementById("planResult").innerHTML = advice;
}
/* exxpense tracker */
let totalExpenses = 0;
let budget = 0;

function addExpense() {
    let budgetInput = document.getElementById("budget").value;
    let expenseName = document.getElementById("expense-name").value;
    let expenseAmount = parseFloat(document.getElementById("expense-amount").value);

    if (!budgetInput || budgetInput <= 0) {
        alert("Please set a valid budget first.");
        return;
    }

    if (!expenseName || isNaN(expenseAmount) || expenseAmount <= 0) {
        alert("Enter valid expense details.");
        return;
    }

    budget = parseFloat(budgetInput);
    totalExpenses += expenseAmount;

    // Update total expenses
    document.getElementById("total-expenses").textContent = totalExpenses.toFixed(2);

    // Update expense list
    let expenseList = document.getElementById("expense-list");
    let listItem = document.createElement("li");
    listItem.textContent = `${expenseName}: ₹${expenseAmount.toFixed(2)}`;
    expenseList.appendChild(listItem);

    // Update progress bar
    updateProgress();
}

function updateProgress() {
    let progressBar = document.getElementById("expense-progress");
    let percentage = (totalExpenses / budget) * 100;

    if (percentage > 100) {
        progressBar.style.width = "100%";
        progressBar.style.background = "red"; // Over-budget warning
    } else {
        progressBar.style.width = percentage + "%";
        progressBar.style.background = "green";
    }
}



function showModule(module) {
    let content = {
        smartSavings: `<h3>Smart Savings Strategies</h3>
            <p>Saving money is essential for financial stability and future investments. Strategies include:</p>
            <ul>
                <li><strong>50/30/20 Rule:</strong> Allocate 50% of income to necessities, 30% to discretionary spending, and 20% to savings.</li>
                <li><strong>Automated Savings:</strong> Set up automatic transfers to savings accounts to ensure consistent saving.</li>
                <li><strong>Emergency Funds:</strong> Maintain 3-6 months' worth of expenses in an accessible savings account.</li>
            </ul>`,
        importanceSavings: `<h3>Importance of Savings</h3>
            <p>Savings provide financial security and help in achieving long-term goals. Key benefits include:</p>
            <ul>
                <li><strong>Financial Security:</strong> Acts as a safety net for unexpected expenses.</li>
                <li><strong>Wealth Building:</strong> Allows investment in profitable opportunities.</li>
                <li><strong>Retirement Planning:</strong> Ensures a comfortable life post-retirement.</li>
            </ul>`,
        savingsPlans: `<h3>Smart Savings Plans</h3>
            <p>Various savings plans cater to different financial goals:</p>
            <ul>
                <li><strong>Recurring Deposits:</strong> A fixed amount is deposited monthly, accumulating with interest.</li>
                <li><strong>Fixed Deposits:</strong> A lump sum is deposited for a fixed tenure at a higher interest rate.</li>
                <li><strong>Investment-linked Savings Plans:</strong> Combine savings with investments in mutual funds or insurance.</li>
            </ul>`,
        highYield: `<h3>High-Yield Savings Accounts</h3>
            <p>These accounts offer better interest rates than regular savings accounts, making them ideal for short-term savings.</p>
            <ul>
                <li><strong>Higher Interest Rates:</strong> Helps money grow faster.</li>
                <li><strong>Liquidity:</strong> Easy access to funds compared to fixed deposits.</li>
                <li><strong>Safety:</strong> Low-risk option with assured returns.</li>
            </ul>`,
        investmentBasics: `<h3>Investment Basics</h3>
            <p>Investing helps grow wealth over time. Key concepts include:</p>
            <ul>
                <li><strong>Stocks:</strong> Buying shares in a company provides ownership and potential dividends.</li>
                <li><strong>Mutual Funds:</strong> A pool of money from multiple investors managed by professionals.</li>
                <li><strong>Diversification:</strong> Spreading investments across different asset classes to reduce risk.</li>
            </ul>`,
        loanManagement: `<h3>Loan & EMI Management</h3>
            <p>Managing loans wisely is crucial to avoid financial burden. Key aspects:</p>
            <ul>
                <li><strong>Understanding Loans:</strong> Types include home loans, personal loans, and student loans.</li>
                <li><strong>Managing EMIs:</strong> Paying EMIs on time helps maintain a good credit score.</li>
                <li><strong>Prepayment Strategies:</strong> Paying off loans early can reduce interest costs.</li>
            </ul>`,
        taxPlanning: `<h3>Tax Planning</h3>
            <p>Effective tax planning minimizes tax liabilities while maximizing savings.</p>
            <ul>
                <li><strong>Understanding Tax Slabs:</strong> Different income groups fall into different tax brackets.</li>
                <li><strong>Tax-saving Investments:</strong> PPF, ELSS, NPS, and fixed deposits offer tax benefits.</li>
                <li><strong>Deductions:</strong> Health insurance, home loan interest, and education expenses can reduce taxable income.</li>
            </ul>`
    };

    if (!content[module]) {
        console.error(`Invalid module key: ${module}`);
        document.getElementById("learningContent").innerHTML = `<p style="color: red;">⚠ Error: Module not found.</p>`;
        return;
    }

    document.getElementById("learningContent").innerHTML = content[module];
}
