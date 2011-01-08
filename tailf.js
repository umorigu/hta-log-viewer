function main() {
	var args = WScript.Arguments;
	if (args.Length < 1) {
		return;
	}
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var filePath = args(0);
	var f = fso.OpenTextFile(filePath);
	while (! f.AtEndOfStream) {
		var line = f.ReadLine();
		WScript.StdOut.WriteLine(line);
	}
	f.Close();
}
main();
