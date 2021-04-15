/* requires:
polyfill.js
*/

// custom script for bootstrap video modal, only needed for page with video modals
let videoUrl;
$('[data-toggle="modal"]').click(function() {
  videoUrl = $(this).data("src");
});
$(".video-modal").on('hide.bs.modal', function(){
  $(this).find("iframe").attr('src', '');
});
$(".video-modal").on('show.bs.modal', function(){
  $(this).find("iframe").attr('src', videoUrl);
});
