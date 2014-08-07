#!/usr/bin/env node

var LineReader = require('line-by-line'),
    minimist   = require('minimist'),
    exec       = require('exec'),
    path       = require('path'),
    fs         = require('fs');

var filenames = minimist(process.argv.slice(2))._;

filenames.forEach(function (filename) {
  if (!fs.existsSync(filename)) {
    console.log(filename + ' does not exist or cannot be read, skipping.');
    return;
  }

  var reader = new LineReader(filename),
      lines = [];

  reader.on('error', function (err) {
    throw err;
  });

  reader.on('line', function (line) {
    var outputLine = line;

    // Not EXIF data
    if (line.indexOf('#') !== 0) {
      var filename = path.basename(line);

      // @todo Properly escape spaces
      exec('cp "' + line + '" "./' + filename + '"', function (err, out, code) {
        if (err) throw err;
      });

      // Update line with new path [same directory]
      outputLine = filename;
    }

    lines.push(outputLine);
  });

  reader.on('end', function () {
    fs.writeFileSync(filename, lines.join('\r'));
    console.log('Exported ' + filename);
  });
});
