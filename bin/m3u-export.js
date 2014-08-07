#!/usr/bin/env node

var LineReader = require('line-by-line'),
    escape     = require('shell-escape'),
    minimist   = require('minimist'),
    exec       = require('exec'),
    path       = require('path'),
    fs         = require('fs'),
    // Get all the arguments that don't have an option associated with them
    filenames  = minimist(process.argv.slice(2))._;

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
    // @todo Is this *really* going to do?
    if (line.indexOf('#') !== 0) {
      var musicFilename = path.basename(line),
          args;

      args = [
        'cp',
        line,
        './' + musicFilename
      ];

      exec(escape(args), function (err, out, code) {
        if (err) throw err;
      });

      // Update line with new path [same directory]
      outputLine = musicFilename;
    }

    lines.push(outputLine);
  });

  reader.on('end', function () {
    // Write a file to the local directory — this may not be the same directory as the original m3u, but it will be
    // where the music files have been copied to, so they need to be in the same place for the new m3u to work
    fs.writeFileSync(path.basename(filename), lines.join('\n') + '\n');
    console.log('Exported ' + filename);
  });
});
