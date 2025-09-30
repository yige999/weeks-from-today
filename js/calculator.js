class WeeksCalculator {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
        this.setTodayAsDefault();
        this.generateQuickLinks();
        this.loadHolidayData();
    }

    initializeElements() {
        this.startDateInput = document.getElementById('startDate');
        this.weeksInput = document.getElementById('weeksInput');
        this.weeksBatchInput = document.getElementById('weeksBatchInput');
        this.excludeWeekendsCheckbox = document.getElementById('excludeWeekends');
        this.excludeHolidaysCheckbox = document.getElementById('excludeHolidays');
        this.dateFormatSelect = document.getElementById('dateFormat');
        this.calculateBtn = document.getElementById('calculateBtn');
        this.todayBtn = document.getElementById('todayBtn');
        this.resultSection = document.getElementById('result');
        this.resultDate = document.getElementById('resultDate');
        this.resultCountdown = document.getElementById('resultCountdown');
        this.copyBtn = document.getElementById('copyBtn');
        this.shareBtn = document.getElementById('shareBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.exportBatchBtn = document.getElementById('exportBatchBtn');
        this.quickLinksContainer = document.getElementById('quickLinks');

        // Batch mode elements
        this.singleModeBtn = document.getElementById('singleModeBtn');
        this.batchModeBtn = document.getElementById('batchModeBtn');
        this.singleResult = document.getElementById('singleResult');
        this.batchResult = document.getElementById('batchResult');
        this.batchResultsContainer = document.getElementById('batchResultsContainer');

        this.currentMode = 'single';
    }

    setupEventListeners() {
        this.calculateBtn.addEventListener('click', () => this.calculate());
        this.todayBtn.addEventListener('click', () => this.setTodayAsDefault());
        this.copyBtn.addEventListener('click', () => this.copyResult());
        this.shareBtn.addEventListener('click', () => this.shareResult());
        this.exportBtn.addEventListener('click', () => this.exportResult());
        this.exportBatchBtn.addEventListener('click', () => this.exportBatchResults());

        // Mode switching
        this.singleModeBtn.addEventListener('click', () => this.switchMode('single'));
        this.batchModeBtn.addEventListener('click', () => this.switchMode('batch'));

        // Calculate on Enter key
        this.weeksInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.calculate();
        });
    }

    setTodayAsDefault() {
        const today = new Date();
        const todayString = today.toISOString().split('T')[0];
        this.startDateInput.value = todayString;
    }

    async loadHolidayData() {
        // Try to load from cache first
        try {
            const cachedHolidays = localStorage.getItem('holidaysData');
            if (cachedHolidays) {
                this.holidays = JSON.parse(cachedHolidays);
                return;
            }
        } catch (e) {
            console.log('Could not load cached holidays data');
        }

        // US Federal Holidays 2024-2026
        this.holidays = [
            // 2024 Holidays
            '2024-01-01', // New Year's Day
            '2024-01-15', // Martin Luther King Jr. Day
            '2024-02-19', // Presidents' Day
            '2024-05-27', // Memorial Day
            '2024-07-04', // Independence Day
            '2024-09-02', // Labor Day
            '2024-10-14', // Columbus Day
            '2024-11-11', // Veterans Day
            '2024-11-28', // Thanksgiving Day
            '2024-12-25', // Christmas Day

            // 2025 Holidays
            '2025-01-01', // New Year's Day
            '2025-01-20', // Martin Luther King Jr. Day
            '2025-02-17', // Presidents' Day
            '2025-05-26', // Memorial Day
            '2025-07-04', // Independence Day
            '2025-09-01', // Labor Day
            '2025-10-13', // Columbus Day
            '2025-11-11', // Veterans Day
            '2025-11-27', // Thanksgiving Day
            '2025-12-25', // Christmas Day

            // 2026 Holidays
            '2026-01-01', // New Year's Day
            '2026-01-19', // Martin Luther King Jr. Day
            '2026-02-16', // Presidents' Day
            '2026-05-25', // Memorial Day
            '2026-07-04', // Independence Day
            '2026-09-07', // Labor Day
            '2026-10-12', // Columbus Day
            '2026-11-11', // Veterans Day
            '2026-11-26', // Thanksgiving Day
            '2026-12-25', // Christmas Day

            // Additional Common Holidays (Observance days may vary)
            '2024-02-14', // Valentine's Day
            '2024-03-17', // St. Patrick's Day
            '2024-04-01', // April Fool's Day
            '2024-05-12', // Mother's Day
            '2024-06-16', // Father's Day
            '2024-07-04', // Independence Day (Observed)
            '2024-10-31', // Halloween
            '2024-11-01', // All Saints' Day
            '2024-12-24', // Christmas Eve
            '2024-12-31', // New Year's Eve

            '2025-02-14', // Valentine's Day
            '2025-03-17', // St. Patrick's Day
            '2025-04-01', // April Fool's Day
            '2025-05-11', // Mother's Day
            '2025-06-15', // Father's Day
            '2025-10-31', // Halloween
            '2025-12-24', // Christmas Eve
            '2025-12-31', // New Year's Eve

            '2026-02-14', // Valentine's Day
            '2026-03-17', // St. Patrick's Day
            '2026-04-01', // April Fool's Day
            '2026-05-10', // Mother's Day
            '2026-06-15', // Father's Day
            '2026-10-31', // Halloween
            '2026-12-24', // Christmas Eve
            '2026-12-31', // New Year's Eve
        ];

        // Cache holidays in localStorage for performance
        try {
            localStorage.setItem('holidaysData', JSON.stringify(this.holidays));
        } catch (e) {
            console.log('Could not cache holidays data');
        }
    }

    calculate() {
        const startDate = new Date(this.startDateInput.value);

        if (!this.startDateInput.value) {
            this.showError('Please enter a start date');
            return;
        }

        if (this.currentMode === 'single') {
            const weeks = parseInt(this.weeksInput.value);

            if (isNaN(weeks)) {
                this.showError('Please enter number of weeks');
                return;
            }

            let targetDate = new Date(startDate);
            const excludeWeekends = this.excludeWeekendsCheckbox.checked;
            const excludeHolidays = this.excludeHolidaysCheckbox.checked;

            if (excludeWeekends || excludeHolidays) {
                this.calculateBusinessDays(targetDate, weeks, excludeWeekends, excludeHolidays);
            } else {
                targetDate.setDate(targetDate.getDate() + (weeks * 7));
            }

            this.displaySingleResult(targetDate, startDate);
        } else {
            this.calculateBatch(startDate);
        }
    }

    calculateBusinessDays(startDate, weeks, excludeWeekends, excludeHolidays) {
        const totalDays = weeks * 7;
        let currentDate = new Date(startDate);
        let daysAdded = 0;

        while (daysAdded < totalDays) {
            currentDate.setDate(currentDate.getDate() + 1);

            let isBusinessDay = true;

            if (excludeWeekends) {
                const dayOfWeek = currentDate.getDay();
                isBusinessDay = dayOfWeek !== 0 && dayOfWeek !== 6; // Not Saturday or Sunday
            }

            if (isBusinessDay && excludeHolidays) {
                const dateString = currentDate.toISOString().split('T')[0];
                isBusinessDay = !this.holidays.includes(dateString);
            }

            if (isBusinessDay) {
                daysAdded++;
            }
        }
    }

    displayResult(targetDate, startDate) {
        const formattedDate = this.formatDate(targetDate);
        const countdown = this.calculateCountdown(startDate, targetDate);

        this.resultDate.textContent = formattedDate;
        this.resultCountdown.textContent = countdown;
        this.resultSection.style.display = 'block';

        // Smooth scroll to result
        this.resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    formatDate(date) {
        const format = this.dateFormatSelect.value;
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        switch (format) {
            case 'MM/DD/YYYY':
                return `${month}/${day}/${year}`;
            case 'DD/MM/YYYY':
                return `${day}/${month}/${year}`;
            case 'YYYY-MM-DD':
                return `${year}-${month}-${day}`;
            default:
                return `${month}/${day}/${year}`;
        }
    }

    calculateCountdown(startDate, targetDate) {
        const diffTime = Math.abs(targetDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(diffDays / 7);
        const remainingDays = diffDays % 7;

        if (targetDate > startDate) {
            return `${weeks} weeks and ${remainingDays} days from start date`;
        } else {
            return `${weeks} weeks and ${remainingDays} days before start date`;
        }
    }

    copyResult() {
        const textToCopy = this.resultDate.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            this.showNotification('Date copied to clipboard!');
        });
    }

    shareResult() {
        const text = `${this.resultDate.textContent} - calculated using Weeks From Today Calculator`;
        const url = window.location.href;

        if (navigator.share) {
            navigator.share({
                title: 'Weeks From Today Calculation',
                text: text,
                url: url
            });
        } else {
            // Fallback - copy to clipboard
            navigator.clipboard.writeText(`${text}\n${url}`).then(() => {
                this.showNotification('Result copied to clipboard!');
            });
        }
    }

    exportResult() {
        const result = {
            startDate: this.startDateInput.value,
            weeks: this.weeksInput.value,
            targetDate: this.resultDate.textContent,
            countdown: this.resultCountdown.textContent,
            excludeWeekends: this.excludeWeekendsCheckbox.checked,
            excludeHolidays: this.excludeHolidaysCheckbox.checked,
            calculatedAt: new Date().toISOString()
        };

        const dataStr = JSON.stringify(result, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `weeks-calculation-${Date.now()}.json`;
        link.click();

        this.showNotification('Result exported successfully!');
    }

    switchMode(mode) {
        this.currentMode = mode;

        if (mode === 'single') {
            this.singleModeBtn.classList.add('active');
            this.batchModeBtn.classList.remove('active');
            this.weeksInput.style.display = 'block';
            this.weeksBatchInput.style.display = 'none';
            this.copyBtn.style.display = 'inline-block';
            this.shareBtn.style.display = 'inline-block';
            this.exportBtn.style.display = 'inline-block';
            this.exportBatchBtn.style.display = 'none';
        } else {
            this.singleModeBtn.classList.remove('active');
            this.batchModeBtn.classList.add('active');
            this.weeksInput.style.display = 'none';
            this.weeksBatchInput.style.display = 'block';
            this.copyBtn.style.display = 'none';
            this.shareBtn.style.display = 'none';
            this.exportBtn.style.display = 'none';
            this.exportBatchBtn.style.display = 'inline-block';
        }

        // Hide results when switching modes
        this.resultSection.style.display = 'none';
    }

    calculateBatch(startDate) {
        const weeksText = this.weeksBatchInput.value.trim();
        if (!weeksText) {
            this.showError('Please enter weeks for batch calculation');
            return;
        }

        const weeksArray = weeksText.split('\n')
            .map(line => line.trim())
            .filter(line => line)
            .map(line => parseInt(line))
            .filter(weeks => !isNaN(weeks));

        if (weeksArray.length === 0) {
            this.showError('Please enter valid numbers for weeks');
            return;
        }

        const excludeWeekends = this.excludeWeekendsCheckbox.checked;
        const excludeHolidays = this.excludeHolidaysCheckbox.checked;
        const results = [];

        weeksArray.forEach(weeks => {
            let targetDate = new Date(startDate);

            if (excludeWeekends || excludeHolidays) {
                this.calculateBusinessDays(targetDate, weeks, excludeWeekends, excludeHolidays);
            } else {
                targetDate.setDate(targetDate.getDate() + (weeks * 7));
            }

            results.push({
                weeks: weeks,
                targetDate: new Date(targetDate),
                countdown: this.calculateCountdown(startDate, targetDate)
            });
        });

        this.displayBatchResults(results, startDate);
    }

    displayBatchResults(results, startDate) {
        this.batchResultsContainer.innerHTML = '';

        results.forEach(result => {
            const batchItem = document.createElement('div');
            batchItem.className = 'batch-item';

            const formattedDate = this.formatDate(result.targetDate);

            batchItem.innerHTML = `
                <h5>${result.weeks} Weeks From Today</h5>
                <div class="batch-date">${formattedDate}</div>
                <div class="batch-countdown">${result.countdown}</div>
                <div class="batch-copy">
                    <button class="batch-copy-btn" onclick="navigator.clipboard.writeText('${formattedDate}')">
                        Copy Date
                    </button>
                </div>
            `;

            this.batchResultsContainer.appendChild(batchItem);
        });

        this.singleResult.style.display = 'none';
        this.batchResult.style.display = 'block';
        this.resultSection.style.display = 'block';

        // Smooth scroll to result
        this.resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    displaySingleResult(targetDate, startDate) {
        const formattedDate = this.formatDate(targetDate);
        const countdown = this.calculateCountdown(startDate, targetDate);

        this.resultDate.textContent = formattedDate;
        this.resultCountdown.textContent = countdown;

        this.batchResult.style.display = 'none';
        this.singleResult.style.display = 'block';
        this.resultSection.style.display = 'block';

        // Smooth scroll to result
        this.resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    exportBatchResults() {
        const startDate = this.startDateInput.value;
        const weeksText = this.weeksBatchInput.value.trim();
        const weeksArray = weeksText.split('\n')
            .map(line => line.trim())
            .filter(line => line)
            .map(line => parseInt(line))
            .filter(weeks => !isNaN(weeks));

        const results = weeksArray.map(weeks => {
            let targetDate = new Date(startDate);
            const excludeWeekends = this.excludeWeekendsCheckbox.checked;
            const excludeHolidays = this.excludeHolidaysCheckbox.checked;

            if (excludeWeekends || excludeHolidays) {
                this.calculateBusinessDays(targetDate, weeks, excludeWeekends, excludeHolidays);
            } else {
                targetDate.setDate(targetDate.getDate() + (weeks * 7));
            }

            return {
                weeks: weeks,
                targetDate: this.formatDate(targetDate),
                countdown: this.calculateCountdown(new Date(startDate), targetDate)
            };
        });

        const exportData = {
            startDate: startDate,
            excludeWeekends: this.excludeWeekendsCheckbox.checked,
            excludeHolidays: this.excludeHolidaysCheckbox.checked,
            dateFormat: this.dateFormatSelect.value,
            results: results,
            calculatedAt: new Date().toISOString()
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `batch-weeks-calculation-${Date.now()}.json`;
        link.click();

        this.showNotification('Batch results exported successfully!');
    }

    generateQuickLinks() {
        const weeks = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 30, 40, 52];

        weeks.forEach(week => {
            const link = document.createElement('a');
            link.href = `pages/${week}-weeks-from-today.html`;
            link.textContent = `${week} Weeks From Today`;
            this.quickLinksContainer.appendChild(link);
        });
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            background: ${type === 'error' ? '#e74c3c' : '#27ae60'};
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WeeksCalculator();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);