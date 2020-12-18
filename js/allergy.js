var result = "";

  function search() {
    var input = document.querySelector(".controls input[type=file]");
    if (input.files && input.files.length) {
      decode(URL.createObjectURL(input.files[0]));
    }
  }

  function decode(src) {
    var config = {
      inputStream: {
        size: 800,
        singleChannel: false,
      },
      locator: {
        patchSize: "large",
        halfSample: true,
      },
      decoder: {
        readers: ["upc_reader"],
      },
      locate: true,
      src: src,
    };

    Quagga.decodeSingle(config, function (result) {
      if (!result) {
        alert("There's no such barcode");
        return false;
      }
      if (result.codeResult) {
        $(".controls").append(result.codeResult.code);
        result = result.codeResult.code;
      } else {
        alert("There's no such barcode");
      }
    });
  }

  