var progressBar = require('ascii-progress');

function ProgressBar(name, color) {
    this.bar = new progressBar({
            schema: name + ' [:bar].' + color + ' :percent',
            total: 100
        });
}

ProgressBar.prototype.update = function(ratio) {
    this.bar.update(ratio);
}

module.exports = ProgressBar
