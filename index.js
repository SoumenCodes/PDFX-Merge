const express = require("express");
const App = express();
const Port = 3000;

const path = require("path");
const workjs = require("./work");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

App.use("/static", express.static("saveFiles"));
// -----------------------------------------------------------------------------

App.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


App.post("/merge", upload.array("PDFX", 2), async (req, res, next) => {
  // res.sendFile(__dirname + "/download.html")

  try {
    let newName = await workjs.workpdfx(
      path.join(__dirname, req.files[0].path),
      path.join(__dirname, req.files[1].path));
    // res.redirect(`http://localhost:3000/static/Merged PDFX ${newName}.pdf`);
    res.sendFile(__dirname+`/saveFiles/Merged PDFX ${newName}.pdf`);
  } catch (error) {
   
  res.sendFile(__dirname +"/index.html");
}
    // res.send('You Have not Selected PDF files')
    // Expected output: ReferenceError: nonExistentFunction is not defined
    // (Note: the exact output may be browser-dependent)

  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
});

//   shift in download page

App.listen(Port, () => {
  console.log(`App is Listening on http://localhost:${Port}`);
  // console.log(__dirname)
});
