// DOM elements
const monthlyVolume = document.getElementById('monthlyVolume');
const processingTime = document.getElementById('processingTime');
const processingTimeValue = document.getElementById('processingTimeValue');
const staffCost = document.getElementById('staffCost');
const staffCostValue = document.getElementById('staffCostValue');
const errorRate = document.getElementById('errorRate');
const errorRateValue = document.getElementById('errorRateValue');
const avgInvoiceValue = document.getElementById('avgInvoiceValue');

// Results elements
const currentLaborCosts = document.getElementById('currentLaborCosts');
const currentLatePenalties = document.getElementById('currentLatePenalties');
const currentLostDiscounts = document.getElementById('currentLostDiscounts');
const currentDuplicatePayments = document.getElementById('currentDuplicatePayments');
const currentAuditCosts = document.getElementById('currentAuditCosts');
const currentTotalCost = document.getElementById('currentTotalCost');

const aiLaborCosts = document.getElementById('aiLaborCosts');
const aiLatePenalties = document.getElementById('aiLatePenalties');
const aiLostDiscounts = document.getElementById('aiLostDiscounts');
const aiDuplicatePayments = document.getElementById('aiDuplicatePayments');
const aiAuditCosts = document.getElementById('aiAuditCosts');
const aiTotalCost = document.getElementById('aiTotalCost');

const annualSavings = document.getElementById('annualSavings');
const savingsPercentage = document.getElementById('savingsPercentage');

// Event listeners
monthlyVolume.addEventListener('input', calculateROI);
processingTime.addEventListener('input', updateProcessingTimeDisplay);
staffCost.addEventListener('input', updateStaffCostDisplay);
errorRate.addEventListener('input', updateErrorRateDisplay);
avgInvoiceValue.addEventListener('input', calculateROI);

// Update display functions
function updateProcessingTimeDisplay() {
    processingTimeValue.textContent = `${processingTime.value} min`;
    calculateROI();
}

function updateStaffCostDisplay() {
    staffCostValue.textContent = `${staffCost.value} €`;
    calculateROI();
}

function updateErrorRateDisplay() {
    errorRateValue.textContent = `${errorRate.value}%`;
    calculateROI();
}

// Main calculation function
function calculateROI() {
    const volume = parseInt(monthlyVolume.value) || 0;
    const timePerInvoice = parseFloat(processingTime.value) || 0;
    const costPerHour = parseFloat(staffCost.value) || 0;
    const errorRatePercent = parseFloat(errorRate.value) || 0;
    const avgValue = parseFloat(avgInvoiceValue.value) || 0;

    // Annual calculations
    const annualVolume = volume * 12;
    const annualHours = (timePerInvoice * annualVolume) / 60;
    
    // Current costs calculations
    const currentLabor = annualHours * costPerHour;
    const currentLatePenalties = (avgValue * annualVolume * 0.05) / 3; // Divided by 3 as per feedback
    const currentLostDiscounts = (avgValue * annualVolume * 0.02) / 10; // Divided by 10 as per feedback
    const currentDuplicatePayments = avgValue * annualVolume * (errorRatePercent / 100) * 0.1;
    const currentAudit = currentLabor * 0.15; // 15% of labor costs for audit
    
    const currentTotal = currentLabor + currentLatePenalties + currentLostDiscounts + currentDuplicatePayments + currentAudit;

    // AI costs calculations (with reductions)
    const aiLabor = currentLabor * 0.2; // 80% reduction
    const aiLatePenalties = currentLatePenalties * 0.4; // 60% reduction
    const aiLostDiscounts = currentLostDiscounts * 0.4; // 60% reduction
    const aiDuplicatePayments = currentDuplicatePayments * 0.1; // 90% reduction
    const aiAudit = currentAudit * 0.3; // 70% reduction
    
    const aiTotal = aiLabor + aiLatePenalties + aiLostDiscounts + aiDuplicatePayments + aiAudit;

    // Savings calculations
    const savings = currentTotal - aiTotal;
    const savingsPercent = currentTotal > 0 ? (savings / currentTotal) * 100 : 0;

    // Update display
    updateDisplay(currentLaborCosts, currentLabor);
    updateDisplay(currentLatePenalties, currentLatePenalties);
    updateDisplay(currentLostDiscounts, currentLostDiscounts);
    updateDisplay(currentDuplicatePayments, currentDuplicatePayments);
    updateDisplay(currentAuditCosts, currentAudit);
    updateDisplay(currentTotalCost, currentTotal);

    updateDisplay(aiLaborCosts, aiLabor);
    updateDisplay(aiLatePenalties, aiLatePenalties);
    updateDisplay(aiLostDiscounts, aiLostDiscounts);
    updateDisplay(aiDuplicatePayments, aiDuplicatePayments);
    updateDisplay(aiAuditCosts, aiAudit);
    updateDisplay(aiTotalCost, aiTotal);

    updateDisplay(annualSavings, savings);
    savingsPercentage.textContent = `${savingsPercent.toFixed(1)}%`;

    // Add animation to savings when they change
    if (savings > 0) {
        annualSavings.style.transform = 'scale(1.05)';
        setTimeout(() => {
            annualSavings.style.transform = 'scale(1)';
        }, 200);
    }
}

// Helper function to format currency display
function updateDisplay(element, value) {
    if (value >= 1000000) {
        element.textContent = `€${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
        element.textContent = `€${(value / 1000).toFixed(0)}K`;
    } else {
        element.textContent = `€${value.toFixed(0)}`;
    }
}

// Initialize calculations on page load
document.addEventListener('DOMContentLoaded', function() {
    calculateROI();
    
    // Add smooth animations
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('change', function() {
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Add hover effects to range sliders
    const rangeSliders = document.querySelectorAll('.range-slider');
    rangeSliders.forEach(slider => {
        slider.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        slider.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement.tagName === 'INPUT') {
            activeElement.blur();
        }
    }
});

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}); 