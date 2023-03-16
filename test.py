import qrcode

urlArr = [
    "abd37534c7d9a2efb9465de931cd7055ffdb8879563ae98078d6d6d5",
    "c681e18b81edaf2b66dd22376734dba5992e362bc3f91ab225854c17",
    "1053463d383dc1e87f06fff34b3c6a2d340d91e184d46d70144ffa5a",
    "06c9f71496e24dec6acc44895648cf9ec40b5cebb7bc4858a3c69f25",
    "d5070e2f67ededca022f81f2941900606b16f3196b2268e856295f59",
    "d4bf0e3ad56b3494897f5f0a1ce7b300e7dc8d838d1a384ce121bf7a",
    "61246db30c51c3fe46779bcfc01eb6b3d2dee9d77d6837024134d8a9",
    "e0ccaeadfef916630c35576679e4cd4b438e7fc95a60b7361705f708",
    "9d4e0997db72e9c1d02a39b8fb969f508a0f65e5303118de9e037a02",
    "fcd074cdd4c6e02b5dbe28f33858f8ed6d3e9e5ca5ff873f07371f3f",
    "5006bab5782456808d60bddfa64db2d13d90b2c5550ba1ff2b2acad7",
    "2e0cc996fafd71bfabc0717628bd3296306b078910b68f081f3d3fcc",
    "4fde0463771d8c4fb82794d5d6d003725c819dd34360e7bf9c70cffe",
    "73363bb5e0e56db01ad3853166fa945628d165930473b5ee5608edeb",
    "cbb625b441474e8dd944e43632d9112c7e4213cce5410b5b3ce59f56",
    "e22bd066f428b7a77a1b936f99c1f4c117b856705d8f90379579f1e9",
    "8acd70840f1928a2a80c548d7599a07e752a6804612469d1dabac68a",
    "90ffc2300bfbe8fbdddb57bc85db44fd0217b079b14e729e9ac98227",
    "0dd8c67786f88335c6caf127b82032f47633948703d7f3dfd9d61fc0",
    "991a908ad5fc70a65e7d36714f4d2088809a8842c89d56dd421fcb45",
    "df4e71601e2a93f5d17e9599f25acd249f3fb20cf57ed8e1d56aba76",
    "5e4165a6124f2afc058d013b360ff4444fe16e69048092a4f635caea",
    "54a2f7f92a5f975d8096af77a126edda7da60c5aa872ef1b871701ae",
    "518d3dd9f8f74ecc34ed7d6ce4310b5fbab8f222b1006ffaf6ea0c43",
    "2c89060719a95c7cb741f04e36835430436840e3052273676c6c1a99",
    "5cfe2cddbb9940fb4d8505e25ea77e763a0077693dbb01b1a6aa94f2",
    "d14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f",
    "484d52691fcadbfabec5a318d1cf9692c7f293cbc8c1d5f22b2d839b",
    "7497e88b8c64062edfb2f30b9c5f845552b841d1fbae97ab3f224f74",
    "5b1cfa35e55802f5bcd92750b9f1441d63ddeabba543f9f7d87d8fb3",
]

for link in urlArr:
    # Create a QR code instance
    qr = qrcode.QRCode(version=1, box_size=10, border=5)

    # Add the text data to the QR code instance
    qr.add_data(f"https://focnightwalk.onrender.com/qr/{link}")

    # Generate the QR code
    qr.make(fit=True)

    # Create an image from the QR code instance
    img = qr.make_image(fill_color="black", back_color="white")

    # Save the image to the given path
    img_path = f"./QR/{link}.png"
    img.save(img_path)
