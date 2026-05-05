/**
 * TAVARDT Elite ROI Intelligence Utility
 * Description: Mathematical modeling for paid traffic scale and ROI projection.
 */

'use strict';

const ROI_Calculator = {
    /**
     * Basic ROI and ROAS Calculation
     * @param {number} spend 
     * @param {number} revenue 
     */
    calculateBaseMetrics: function(spend, revenue) {
        const roas = (revenue / spend).toFixed(2);
        const roi = (((revenue - spend) / spend) * 100).toFixed(2);
        return {
            roas: parseFloat(roas),
            roi: parseFloat(roi)
        };
    },

    /**
     * Scale Projection (Diminishing Returns Model)
     * Predicts performance when increasing budget.
     * @param {number} currentSpend 
     * @param {number} targetSpend 
     * @param {number} currentROAS 
     */
    projectScale: function(currentSpend, targetSpend, currentROAS) {
        // Diminishing returns factor (standard TAVARDT coefficient)
        const decayFactor = 0.85; 
        const spendRatio = targetSpend / currentSpend;
        const projectedROAS = (currentROAS * Math.pow(spendRatio, decayFactor - 1)).toFixed(2);
        const projectedRevenue = (targetSpend * projectedROAS).toFixed(2);

        return {
            projectedROAS: parseFloat(projectedROAS),
            projectedRevenue: parseFloat(projectedRevenue),
            efficiencyLoss: ((1 - (projectedROAS / currentROAS)) * 100).toFixed(2)
        };
    }
};

// Example usage
const metrics = ROI_Calculator.calculateBaseMetrics(1000, 5000);
console.log('📊 Current Metrics:', metrics);

const projection = ROI_Calculator.projectScale(1000, 5000, metrics.roas);
console.log('📈 Scale Projection (5x Budget):', projection);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ROI_Calculator;
}
