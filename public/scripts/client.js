// doc ready function
$(function(){
  console.log('document loaded');

  getBooks();

  // listen for a submit event on the form
  $('#book-form').on('submit', addBook);
});

function getBooks() {
  $.ajax({
    url: '/books',
    type: 'GET',
    success: displayBooks
  });
}

function displayBooks(books) {
  console.log('Got books from the server', books);

  $('#book-list').empty();

  books.forEach(function(book){
    var $li = $('<li></li>');

    $li.append('<p><strong>' + book.title + '</strong></p>');
    $li.append('<p><em>' + book.author + '</em></p>');

    var date = new Date(book.publication_date).toDateString();
    $li.append('<p><time>' + date + '</time></p>');

    $('#book-list').append($li);
  });
}

function addBook(event) {
  // prevent browser from refreshing
  event.preventDefault();

  // get the info out of the form
  var formData = $(this).serialize();

  // send data to server
  $.ajax({
    url: '/books',
    type: 'POST',
    data: formData,
    success: getBooks
  });

}
