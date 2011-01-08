function main() {
	var args = WScript.Arguments;
	if (args.Length < 1) {
		return;
	}
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var filePath = args(0);
	var ForReading = 1;
	var f = fso.OpenTextFile(filePath, ForReading);
	var stopCounter = 0;
	while (true) {
		if (f.AtEndOfStream) {
			stopCounter++;
			var sleepTime = 1000;
			if (stopCounter >= 120) {
				stopCounter = 120;
				sleepTime = 10000;
			}
			WScript.Sleep(sleepTime);
		} else {
			var line = f.ReadLine();
			WScript.StdOut.WriteLine(line);
		}
	}
	f.Close();
}
main();
