function main() {
	var args = WScript.Arguments;
	if (args.Length < 1) {
		return;
	}
    var filePath = args(0);
    var isUTF16 = false;
    var isUTF8 = false;

    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var fileSize = fso.GetFile(filePath).Size;

    // UTF-8 or UTF-16 or ANSI
    var stream = new ActiveXObject("ADODB.Stream");
    var adTypeText = 2;
    stream.Type = adTypeText;
    stream.Charset = 'iso-8859-1';
    stream.Open();
    stream.LoadFromFile(filePath);
    stream.Position = 0;
    if (fileSize >= 2) {
        var head = stream.ReadText(2);
        if (head === "\xFF\xFE") {
            isUTF16 = true;
        } else if (head === "\xEF\xBB") {
            if (fileSize >= 3) {
                var head2 = stream.ReadText(1);
                if (head2 === "\xBF") {
                    isUTF8 = true;
                }
            }
        }
    }
    stream.Close();

    var ForReading = 1;
    var TristateUseDefault = -2;
    var TristateUseTrue = -1;
    var TristateUseFalse = 0;
    var format = isUTF16 ? TristateUseTrue : TristateUseFalse;
    var f = fso.OpenTextFile(filePath, ForReading, false, format);
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
