tinymce.init({
  selector: "textarea",
  plugins: "lists link image table code help wordcount",
  ai_request: (request, respondWith) =>
    respondWith.string(() =>
      Promise.reject("See docs to implement AI Assistant")
    ),
  uploadcare_public_key: "krd3bcyiymharx51gu2arhxuminn3ykwkbfltuo49c7o6hzv",
});
