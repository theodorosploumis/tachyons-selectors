var listSelectors = require('list-selectors'),
    fs = require('fs');

var version = "4.9.1",
    file = "tachyons_classes.md",
    file_verbose = "tachyons_classes_verbose.md";

var styles = "https://unpkg.com/tachyons@"+version+"/css/tachyons.min.css";
var styles_verbose = "https://rawgit.com/tachyons-css/tachyons-verbose/master/css/tachyons.min.css";

// Get all css classes from a css file (source)
function writeSelectors(source, options, filename) {
  listSelectors(
    [source],
    { include: [options] },
    function(List) {
      var Selectors = [],
          New = List[options],
          stream = fs.createWriteStream(filename);

      stream.once('open', function(fd) {
        stream.write("## Tachyons Classes - version "+version+" \n\n");
        stream.write("```\n");
        for (var i = 0; i <= New.length; i++) {
          if (New[i] != "undefined" || New[i] != ".") {
            stream.write(New[i] + "\n");
          }
        }
        stream.write("```\n");
        stream.end();
      });
    }
  );
}

// Generate files
writeSelectors(styles, "classes", file);
writeSelectors(styles_verbose, "classes", file_verbose);
